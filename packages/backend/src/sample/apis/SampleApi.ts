import { sampleProtocol } from '@nrh/protocols';
import { Api } from "../../shared/";

type TargetApi = Api<sampleProtocol.DataSheet>;

export class SampleApi implements TargetApi {
	public sample: TargetApi['sample'] = async (body) => {
		const { a, b } = body;
		return { result: `Hello, World! ${a}, ${b}` };
	}
}
