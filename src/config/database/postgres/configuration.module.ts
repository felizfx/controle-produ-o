import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { PostgresConfigService } from "./configuration.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration]
		})
	],
	providers: [PostgresConfigService, ConfigService],
	exports: [PostgresConfigService, ConfigService]
})
export class PostgresConfigModule {}