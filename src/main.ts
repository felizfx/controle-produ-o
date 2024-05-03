import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerConfig } from "./config/swagger.config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	app.setGlobalPrefix("/api/v1");
	app.useGlobalPipes(new ValidationPipe());
	SwaggerConfig.build(AppModule, app, "/");
	await app.listen(8080);
}
bootstrap();
