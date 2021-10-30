import { DatabaseConnectionMode, Protocol } from "../../common";
import yup = require('yup');
import { EmptyModel } from "src/shared/models";

interface SampleReq {
	a: string;
	b: number;
}

const sampleSchema = yup.object().shape({
	a: yup.string().required(),
	b: yup.number().required(),
});
const assignable_sample: SampleReq = {} as yup.InferType<typeof sampleSchema>;

interface SampleResp {
	result: string;
}

export namespace sampleProtocol {
	export const resource = '/api/sample';

	const empty = Protocol.api({
		__inputType: {} as EmptyModel,
		__outputType: {} as SampleResp,
		method: 'post',
		resource,
		page: '/empty',
		schema: EmptyModel.schema,
		db: DatabaseConnectionMode.NO_DB,
	})

	const sample = Protocol.api({
		__inputType: {} as SampleReq,
		__outputType: {} as SampleResp,
		method: 'post',
		resource,
		page: '/sample',
		schema: sampleSchema,
		db: DatabaseConnectionMode.NO_DB,
	});

	export type DataSheet = typeof dataSheet;
	export const dataSheet = {
		sample,
	};
};
