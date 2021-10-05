import yup = require('yup');

export type HttpMethod = 'get' | 'post' | 'delete' | 'put';

export enum DatabaseConnectionMode {
	NO_DB = 'no_db',
	ATOMIC_REQUEST = 'atomic_request',
}

export interface BaseProtocol<
	Req,
	Resp,
	Method extends HttpMethod,
	Resource extends `/${string}`,
	Page extends `/${string}`> {

	method: Method;
	// url = resource + page
	resource: Resource;
	page: Page;
	schema: yup.BaseSchema<any, any, Req>;
	db: DatabaseConnectionMode;

	// 타입을 명시하지 않으면 상속 받을때 잃어버리고 unknown 으로 추론됨.
	readonly __inputType: Req;
	readonly __outputType: Resp;
}
export namespace Protocol {
	export function api<
		Req,
		Resp,
		Method extends HttpMethod,
		Resource extends `/${string}`,
		Page extends `/${string}`
	>(
		skel: BaseProtocol<Req, Resp, Method, Resource, Page>,
	): BaseProtocol<Req, Resp, Method, Resource, Page> {
		return {
			...skel,
			__inputType: {} as any,
			__outputType: {} as any,
		};
	}
}

export type ProtocolReqType<T> = T extends BaseProtocol<infer Req, any, any, any, any> ? Req : never;
export type ProtocolRespType<T> = T extends BaseProtocol<any, infer Resp, any, any, any> ? Resp : never;
