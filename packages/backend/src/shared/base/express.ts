import yup = require('yup');
import express from 'express';
import { Protocol } from '@nrh/protocols';
import { TypedSchema } from 'yup/lib/util/types';
import { Api } from './api';
import { SchemaObjectDescription } from 'yup/lib/schema';

type ExpressHandler = (req: express.Request, res: express.Response) => Promise<void>;

type SyncApiHandler<Req extends object, Resp> = (
	body: Req,
) => Promise<Resp>;

export function registerProtocol<T>(
	router: express.Router,
	protocol: T,
	api: Api<T>,
) {
	for (const key of Object.keys(protocol)) {
		const fn = api[key as keyof typeof api];
		const p = protocol[key as keyof typeof api];
		registerSyncApi(router, p as any, fn);
	}
}

function registerSyncApi<Req extends object, Resp, Schema extends TypedSchema>(
	router: express.Router,
	protocol: Protocol<Req, Resp, Schema>,
	fn: SyncApiHandler<Req, Resp>,
) {
	const { method, page } = protocol;
	router[method](page, handleSyncApi<Req, Resp, Schema>({
		fn,
		schema: protocol.schema as Schema,
	}));
}

const handleSyncApi = <Req extends object, Resp, Schema extends TypedSchema>(params: {
	fn: SyncApiHandler<Req, Resp>,
	schema: Schema,
}): ExpressHandler => {
	const {
		fn,
	} = params;

	const schema = params.schema as any as yup.BaseSchema<Req>;

	return async (req: express.Request, res: express.Response) => {
		const body = await validateSchema(req, schema);
		const data = await onHandleSyncApi({ fn, body });
		writeJson(res, data);
	};
};

const onHandleSyncApi = async <Req extends object, Resp>(params: {
	fn: SyncApiHandler<Req, Resp>,
	body: Req,
}) => {
	const { fn, body } = params;
	const resp: Resp = await fn(body);
	return resp;
};

export async function validateSchema<T extends object>(
	req: express.Request,
	schema: yup.BaseSchema<T>,
): Promise<T> {
	const raw = {
		...req.params,
		...req.query,
		...req.body,
	};

	const body = await schema.validate(raw);
	return body;
}

function writeJson<T>(res: express.Response, resp: T) {
	res.type('application/json').send(JSON.stringify(resp, null, 2));
}
