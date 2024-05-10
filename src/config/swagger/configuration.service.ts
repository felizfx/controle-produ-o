/* eslint-disable @typescript-eslint/no-explicit-any */
import { INestApplication, Injectable } from "@nestjs/common";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";

@Injectable()
export class SwaggerConfigService {
	build(mainModule: any, app: INestApplication, path: string) {
		const config = new DocumentBuilder()
			.setTitle("Venda de Encomenda MS")
			.setDescription("MS for Natalia Glam")
			.setVersion("1.0")
			.build();
		const options: SwaggerDocumentOptions = {
			include: [mainModule],
			deepScanRoutes: true
		};
		const document = SwaggerModule.createDocument(app, config, options);
		SwaggerModule.setup(path, app, document);
	}
}