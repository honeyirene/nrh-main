import { sampleProtocol } from "@nrh/protocols";
import {
	BaseClient,
	Client,
} from "./BaseClient";

export class SampleClient extends BaseClient
	implements Client<typeof sampleProtocol> {
	public sample = this.handle(sampleProtocol.sample);
}
