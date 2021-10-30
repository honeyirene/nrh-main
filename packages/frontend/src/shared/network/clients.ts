import { sampleProtocol } from "@nrh/protocols";
import {
	BaseClient,
	Client,
} from "./BaseClient";

export class SampleClient extends BaseClient
	implements Client<sampleProtocol.DataSheet> {
	public empty = this.handle(sampleProtocol.dataSheet.empty);
	public sample = this.handle(sampleProtocol.dataSheet.sample);
}
