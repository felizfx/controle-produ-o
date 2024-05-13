import { Injectable, Logger, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka, logLevel } from "kafkajs";
import { KafkaConfigService } from "src/config/kafka/configuration.service";

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
	constructor (
		private readonly kafkaConfigService: KafkaConfigService
	) {
		this.kafka = new Kafka({
			clientId: "controle-producao",
			brokers: [this.kafkaConfigService.broker],
			logLevel: logLevel.NOTHING
		});
		this.consumers = [];
		this.logger = new Logger("KafkaConsumer");
	}

	private readonly kafka: Kafka;
	private readonly consumers: Consumer[];
	private readonly logger: Logger;
	private consumer: Consumer;
 
	async consume(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
		this.logger.warn(`Subscribing on topic ${topics.topics}`);
		this.consumer = this.kafka.consumer({ 
			groupId: topics.topics[0].toString() + "_consumer",
			allowAutoTopicCreation: true,
		});
		await this.consumer.subscribe(topics);
		await this.consumer.run(config);
		await this.consumer.connect();
		this.consumers.push(this.consumer);
		this.logger.log(`Subscribed on topic ${topics.topics}`);
	}

	async onApplicationShutdown() {
		for (const consumer of this.consumers) {
			await consumer.disconnect();
		}
	}
}