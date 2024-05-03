import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "./cart/cart.module";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "dpg-co7upesf7o1s738n3u5g-a.oregon-postgres.render.com",
			port: 5432,
			username: "dbecommerce_n9hn_user",
			password: "0Scqh1LQR7sKG1EYNBaBmx4VPWirvJtF",
			database: "dbecommerce_n9hn",
			autoLoadEntities: true,
			synchronize: true,
			ssl: true,
		}),
		CartModule
	]
})
export class AppModule {}
