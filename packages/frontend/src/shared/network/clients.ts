import { sampleProtocol } from "@nrh/protocols";
import {
	BaseClient,
	Client,
} from "./BaseClient";

export class SampleClient extends BaseClient
	implements Client<sampleProtocol.DataSheet> {
	public sample = this.handle(sampleProtocol.dataSheet.sample);
}
