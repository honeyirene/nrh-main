import yup = require('yup');
import { TypedSchema } from 'yup/lib/util/types';

export type HttpMethod = 'get' | 'post' | 'delete' | 'put';

export enum DatabaseConnectionMode {
	NO_DB = 'no_db',
	ATOMIC_REQUEST = 'atomic_request',
}

export interface Protocol<Req, Resp, Schema extends TypedSchema> {
	method: HttpMethod;
	resource: string;
	page: string;
	schema: yup.InferType<Schema> extends Req ? Schema : 'error: wrong schema';

	tmp_req?: Req;
	tmp_resp?: Resp;

	db: DatabaseConnectionMode;
}

export type ProtocolReqType<T> = T extends Protocol<infer Req, infer Resp, any> ? Req : never;
export type ProtocolRespType<T> = T extends Protocol<infer Req, infer Resp, any> ? Resp : never;
