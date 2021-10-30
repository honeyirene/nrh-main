import express from 'express';
import yup = require('yup');
import { SchemaObjectDescription } from 'yup/lib/schema';

function createRawInput<T extends object>(
	req: express.Request,
	schema: yup.BaseSchema<T>,
) {
	if (Array.isArray(req.body)) {
		const raw = req.body;
		return raw;
	}

	const raw = {
		...req.params,
		...req.query,
		...req.body,
	};

	// 객체여야 함
	if (schema.type !== 'object') {
		throw new Error(`schema.type is ${schema.type}, not object`);
	}
	const description = schema.describe() as SchemaObjectDescription;
	const fields = description.fields;
	const entries = Object.entries(fields);

	// query string으로 크기 1인 배열을 넘기면
	// express.req로는 배열인지 문자열인지 구분할 수 없다
	// schema 열어서 배열이면 적당히 변환
	// items=1,2,3 꼴의 쿼리 스트링 처리
	for (const [key, desc] of entries) {
		const value = raw[key];
		if (desc.type === 'array') {
			if (typeof value === 'string') {
				raw[key] = value.split(',');
			}
		}
	}

	// query string + nullable integer 대응
	// query string은 문자열이라서 "null" 넣어봤자
	// yup에서 파싱하다 터져서 NaN으로 튀어나온다. 명시적으로 바꾸기
	for (const [key, desc] of entries) {
		const value = raw[key];
		if (desc.type === 'number') {
			if (value === 'null') {
				raw[key] = null;
			} else if (value === '') {
				raw[key] = null;
			}
		}
	}

	return raw;
}

export async function validateSchema<T extends object>(
	req: express.Request,
	schema: yup.BaseSchema<T>,
): Promise<T> {
	const raw = createRawInput(req, schema);

	try {
		const body = await schema.validate(raw);
		return body;

	} catch (err) {
		if (err instanceof yup.ValidationError) {
			const e = err as any;

			// ValidationError를 통째로 예외처리하면
			// 로직 안에서 사용한 yup도 걸릴거 같아서 따로 처리함
			e.statusCode = 400;

			// 검증 실패한 상세 내용도 클라로 보내야 디버깅이 쉬울 것이다
			e.extra = {
				path: err.path,
				errors: err.errors,
				message: err.message,
				inner: err.inner,
			};
		}
		throw err;
	}
}
