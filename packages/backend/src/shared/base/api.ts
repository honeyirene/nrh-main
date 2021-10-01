import { Protocol } from "@nrh/protocols";

// TODO: Req 감싸서 뭔가 덕지덕지 붙여야 함.
type HandlerFunction<T> = T extends Protocol<infer Req, infer Resp, any>
	? (body: Req) => Promise<Resp>
	: never;

export type Api<T> = {
	[P in keyof T]: HandlerFunction<T[P]>;
}
