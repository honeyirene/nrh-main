import { EndPoint } from '../../settings';
import { SampleClient } from './clients';

export class ClientGroup {

	public create<T>(ctor: new (host: string, opts: any) => T) {
		return new ctor(EndPoint, {});
	}

	public get sample() { return this.create(SampleClient) };
}
