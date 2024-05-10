import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { KafkaConfigService } from "./configuration.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration]
		})
	],
	providers: [KafkaConfigService, ConfigService],
	exports: [KafkaConfigService, ConfigService]
})
export class KafkaConfigModule {}