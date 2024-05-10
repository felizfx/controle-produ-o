import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "../../../providers/queue/kafka/consumer.service";

@Injectable()
export class PriceConsumer implements OnModuleInit {
	constructor (
        private readonly consumerService: ConsumerService
	) {}

	async onModuleInit() {
		await this.consumerService.consume({ topics: ["carrinho_fechado"] }, {
			eachMessage: async ({ topic, partition, message }) => {
				console.log({
					value: JSON.parse(message.value.toString()),
					topic: topic.toString(),
					partition: partition.toString(),
				});
			},
		});
	}
}