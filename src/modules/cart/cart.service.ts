import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./entities/cart.entity";
import { ProducerService } from "../../providers/queue/kafka/producer.service";

@Injectable()
export class CartService {
	constructor (
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
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
}
