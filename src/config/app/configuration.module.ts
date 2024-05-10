import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { AppConfigService } from "./configuration.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration]
		})
	],
	providers: [AppConfigService, ConfigService],
	exports: [AppConfigService, ConfigService]
})
export class AppConfigModule {}