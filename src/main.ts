import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerConfigService } from "./config/swagger/configuration.service";
import { AppConfigService } from "./config/app/configuration.service";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const appConfig = app.get(AppConfigService);
	const swaggerConfig = app.get(SwaggerConfigService);

	app.enableCors();
	app.setGlobalPrefix("/api/v1");
	app.useGlobalPipes(new ValidationPipe());
	swaggerConfig.build(AppModule, app, "/");
	await app.listen(appConfig.port);
}
bootstrap();
