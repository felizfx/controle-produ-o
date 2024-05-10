import { Module } from "@nestjs/common";
import { CartModule } from "./cart/cart.module";
import { SwaggerConfigModule } from "src/config/swagger/configuration.module"; 
import { PostgresDatabaseModule } from "src/providers/database/postgres.module";
import { AppConfigModule } from "src/config/app/configuration.module";

@Module({
	imports: [
		AppConfigModule,
		PostgresDatabaseModule,
		SwaggerConfigModule,
		CartModule,
	]
})
export class AppModule {}
