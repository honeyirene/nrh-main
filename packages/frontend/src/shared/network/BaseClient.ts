import qs from 'qs';
import {
	HttpMethod,
	BaseProtocol,
} from '@nrh/protocols';

type ClientFunction<T> = T extends BaseProtocol<infer Req, infer Resp, any, any, any>
	? (body: Req) => Promise<Resp>
	: never;

export type Client<T> = {
	[P in keyof T]: ClientFunction<T[P]>;
};

interface Options {
}

export class BaseClient {
	constructor(
		private readonly host: string,
		private readonly opts: Options
	) { }

	public handle<Req extends { [key: string]: any }, Resp>(
		api: BaseProtocol<Req, Resp, any, any, any>,
	): (body: Req) => Promise<Resp> {
		const fn: ClientFunction<BaseProtocol<Req, Resp, any, any, any>> = async (req) => {
			const {
				method,
			} = api;

			const url = `${this.host}${api.resource}${api.page}`;

			const resp = method === 'get'
				? await this.requestQueryString(method, url, req)
				: await this.requestJsonBody(method, url, req);

			const status = resp.status;

			const text = await resp.text();
			let json: any;
			try {
				json = JSON.parse(text);
			} catch (e) {
				throw new Error(text);
			}

			if (status !== 200) {
				const e = new Error(json.msg ?? json.message);
				e.name = json.errorCd;
				throw e;
			}

			const data: Resp = json;
			return data;
		};
		return fn;
	}

	protected async requestJsonBody<TReq>(method: HttpMethod, url: string, req: TReq): Promise<Response> {
		const headers = this.makeHeader();
		headers['Content-Type'] = 'application/json';

		const resp = await fetch(url, {
			method: method.toUpperCase(),
			body: JSON.stringify(req),
			headers,
		});
		return resp;
	}

	private async requestQueryString<TReq>(method: HttpMethod, url: string, req: TReq): Promise<Response> {
		const querystring = qs.stringify(req);
		const headers = this.makeHeader();
		const resp = await fetch(`${url}?${querystring}`, {
			method,
			headers,
		});
		return resp;
	}

	private makeHeader() {
		const headers: { [key: string]: string } = {};
		return headers;
	}
}
