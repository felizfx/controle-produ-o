import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "./entities/cart.entity";
import { KafkaModule } from "../../providers/queue/kafka/kafka.module";
import { PriceConsumer } from "./consumers/price.consumer";
import { TesteConsumer } from "./consumers/teste.consumer";

@Module({
	imports: [
		TypeOrmModule.forFeature([Cart]),
		KafkaModule
	],
	controllers: [CartController],
	providers: [CartService, PriceConsumer, TesteConsumer],
})
export class CartModule {}
