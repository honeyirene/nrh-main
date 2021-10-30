import yup = require('yup');

export interface EmptyModel {
}
export namespace EmptyModel {
	export const schema = yup.object().shape({});
	const assignable: EmptyModel = {} as yup.InferType<typeof schema>;
}
