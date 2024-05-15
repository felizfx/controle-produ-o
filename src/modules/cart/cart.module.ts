import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "./entities/cart.entity";
import { KafkaModule } from "../../providers/queue/kafka/kafka.module";
import { Product } from "./entities/product.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([Cart, Product]),
		KafkaModule
	],
	controllers: [CartController],
	providers: [CartService],
})
export class CartModule {}
