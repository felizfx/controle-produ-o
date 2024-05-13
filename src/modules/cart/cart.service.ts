import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./entities/cart.entity";
import { ProducerService } from "../../providers/queue/kafka/producer.service";
import { ConsumerService } from "src/providers/queue/kafka/consumer.service";

@Injectable()
export class CartService implements OnModuleInit {
	constructor (
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
		private readonly consumerService: ConsumerService,
		private readonly producerService: ProducerService
	) {}

	async findAll() {
		try {
			const carts = await this.cartRepository.find();
			return carts;
		} catch (e) {
			console.log(e.message);
		}
	}

	//producers
	async calcPrice() {
		this.producerService.produce({
			topic: "carrinho_fechado",
			messages: [{
				value: JSON.stringify({
					id: 1234567890,
					count: 8
				}),
				key: "second message"
			}]
		});
	}

	async calcPriceDois() {
		this.producerService.produce({
			topic: "carrinho_teste",
			messages: [{
				value: JSON.stringify({
					id: 1234567890,
					count: 8
				}),
				key: "teste message"
			}]
		});
	}

	// consumers
	async onModuleInit() {
		await this.consumerService.consume({topics: ["carrinho_fechado"]}, {
			autoCommit: true,
			eachMessage: async ({ message, topic }) => {
				console.log({
					topic: topic.toString(),
					message: JSON.parse(message.value.toString())
				});
			}
		});

		await this.consumerService.consume({topics: ["carrinho_teste"]}, {
			eachMessage: async ({ message, topic }) => {
				console.log({
					topic: topic.toString(),
					message: JSON.parse(message.value.toString())
				});
			}
		});
	}
}
