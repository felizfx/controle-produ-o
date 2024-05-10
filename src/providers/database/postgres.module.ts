import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { PostgresConfigModule } from "src/config/database/postgres/configuration.module";
import { PostgresConfigService } from "src/config/database/postgres/configuration.service";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [PostgresConfigModule],
			useFactory: async (postgresConfigService: PostgresConfigService) => ({
				type: "postgres",
				url: postgresConfigService.url,
				autoLoadEntities: true,
				// synchronize: true,
				ssl: true,
			}),
			inject: [PostgresConfigService]
		} as TypeOrmModuleAsyncOptions)
	]
})
export class PostgresDatabaseModule {}