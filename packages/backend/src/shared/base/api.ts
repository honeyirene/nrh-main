import { BaseProtocol } from "@nrh/protocols";

// TODO: Req 감싸서 뭔가 덕지덕지 붙여야 함.
type HandlerFunction<T> = T extends BaseProtocol<infer Req, infer Resp, any, any, any>
	? (body: Req) => Promise<Resp>
	: never;

export type Api<T> = {
	[P in keyof T]: HandlerFunction<T[P]>;
}
