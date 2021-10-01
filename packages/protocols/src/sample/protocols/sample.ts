import { DatabaseConnectionMode, Protocol } from "../../common";
import yup = require('yup');

const resource = '/api/sample';
export const resource_sample = resource;

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

const sample: Protocol<SampleReq, SampleResp, typeof sampleSchema> = {
	method: 'post',
	resource,
	page: '/',
	schema: sampleSchema,
	db: DatabaseConnectionMode.NO_DB,
};

export const sampleProtocol = {
	sample,
};
