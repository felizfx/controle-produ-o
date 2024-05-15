import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./entities/cart.entity";
import { ProducerService } from "../../providers/queue/kafka/producer.service";
import { ConsumerService } from "src/providers/queue/kafka/consumer.service";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class CartService implements OnModuleInit {
	constructor (
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
		@InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
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

	async calcPrice(productId: string, count: number) {
		const product = await this.productRepository.findOne({ where: { idProd: productId } });
		if (!product) throw new NotFoundException("Produto não encontrado");
		const price = product.valor * count;
		return price;
	}

	//producers testes
	async postCart(data: CreateOrderDto) {
		this.producerService.produce({
			topic: "carrinho_fechado",
			messages: [{
				value: JSON.stringify(data)
			}]
		});
	}

	async postPaymentConfirm(data: { clientCpf: number }) {
		this.producerService.produce({
			topic: "status_pagamento",
			messages: [{
				value: JSON.stringify({ clientCpf: 52998224725, isPayed: true})
			}]	
		});
	}

	//producers oficiais
	// postar no topico de pagamento
	async postPayment(data: { clientCpf: number, price: number }) {
		this.producerService.produce({
			topic: "pagamento_cliente",
			messages: [{
				value: JSON.stringify(data)
			}]
		});
	}

	// postar no topico de producao
	async postProduction(data: { porductId: string, count: number}) {
		this.producerService.produce({
			topic: "producao_pedido",
			messages: [{
				value: JSON.stringify(data)
			}]	
		});
	}

	// consumers
	async onModuleInit() {
		// calcular preço total e enviar para pagamento
		await this.consumerService.consume({topics: ["carrinho_fechado"]}, {
			autoCommit: true,
			eachMessage: async ({ message }) => {
				const payload = JSON.parse(message.value.toString());
				const price = Number(await this.calcPrice(payload.productId, payload.count));
				this.postPayment({ clientCpf: payload.clientCpf, price });
			}
		});

		// sucesso no pagamento
		await this.consumerService.consume({topics: ["status_pagamento"]}, {
			autoCommit: true,
			eachMessage: async ({ message }) => {
				console.log({
					value: JSON.parse(message.value.toString())
				});
			}
		});
	}


}
