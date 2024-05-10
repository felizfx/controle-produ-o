import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class KafkaConfigService {
	constructor (
        private readonly configService: ConfigService
	) {}

	get broker() {
		return this.configService.get<string>("kafka.broker");
	} 
}