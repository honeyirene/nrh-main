import yup = require('yup');
import express from 'express';
import { BaseProtocol, DatabaseConnectionMode, HttpMethod } from '@nrh/protocols';
import { Api } from './api';

type ExpressHandler = (req: express.Request, res: express.Response) => Promise<void>;

type ApiHandler<Req extends object, Resp> = (
	body: Req,
) => Promise<Resp>;

export function registerProtocol<TDataSheet>(
	router: express.Router,
	protocol: { resource: string, dataSheet: TDataSheet },
	api: Api<TDataSheet>,
) {
	const { resource, dataSheet } = protocol;
	for (const x of Object.keys(dataSheet)) {
		const key = x as keyof typeof api;
		const fn = api[key].bind(api);
		registerController(router, dataSheet[key] as any, fn);
	}
	return { resource, router };
}

function registerController<Req extends object, Resp>(
	router: express.Router,
	spec: BaseProtocol<Req, Resp, HttpMethod, any, any>,
	fn: (req: Req) => Promise<Resp>,
) {
	router[spec.method](spec.page, handleExpress({
		...spec,
		fn,
	}));
}

const handleExpress = <Req extends object, Resp>(params: {
	fn: ApiHandler<Req, Resp>,
	schema: yup.BaseSchema<any, any, Req>,
	userlock?: boolean;
	timeout?: number;
	maintenance?: boolean;
	db?: DatabaseConnectionMode;
}): ExpressHandler => {
	return async (req: express.Request, res: express.Response) => {
		const body = await validateSchema(req, params.schema);

		const handleRequest = async () => {
			const resp: Resp = await params.fn(body);
			return resp;
		}

		const DEFAULT_TIMEOUT = 6000;
		const timeout = params.timeout ?? DEFAULT_TIMEOUT;
		const handleTimeout = async () => {
			await delay(timeout);
			throw new Error(`time out: ${timeout}`);
		};

		const data = await Promise.race([handleRequest(), handleTimeout()]);

		const text = JSON.stringify(data, null, 2);
		res.type('json').send(text);
	}
}
