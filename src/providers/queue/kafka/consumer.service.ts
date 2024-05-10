import { Injectable, Logger, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka, logLevel } from "kafkajs";
import { KafkaConfigService } from "src/config/kafka/configuration.service";

@Injectable()
export class ConsumerService implements OnApplicationShutdown{
	constructor (
		private readonly kafkaConfigService: KafkaConfigService,
	) {
		this.kafka = new Kafka({
			brokers: [this.kafkaConfigService.broker]
		});
		this.consumers = [];
		this.logger = new Logger("KafkaConsumer");
		this.consumer = this.kafka.consumer({ 
			groupId: "controle-producao"
		});
	}

	private readonly kafka: Kafka;
	private readonly consumers: Consumer[];
	private readonly logger: Logger;
	private consumer: Consumer;
 
	async consume(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
		this.logger.warn(`Subscribing on topic ${topics.topics}`);
		await this.consumer.connect();
		await this.consumer.subscribe(topics);
		await this.consumer.run(config);
		this.consumers.push(this.consumer);
		this.logger.log(`Subscribed on topic ${topics.topics}`);
	}

	async onApplicationShutdown() {
		for (const consumer of this.consumers) {
			await consumer.stop();
			await consumer.disconnect();
		}
	}
}