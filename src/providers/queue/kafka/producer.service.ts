import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Partitioners, Producer, ProducerRecord } from "kafkajs";

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
	private readonly kafka = new Kafka({
		brokers: ["localhost:9092"],
	});
	private readonly producer: Producer = this.kafka.producer({
		createPartitioner: Partitioners.LegacyPartitioner
	});
	private readonly logger: Logger = new Logger("KafkaProducer");

	async onModuleInit() {
		await this.producer.connect();
	}

	async onApplicationShutdown() {
		await this.producer.disconnect();
	}

	async produce(record: ProducerRecord) {
		this.logger.log(`Producing to topic ${record.topic}`);
		await this.producer.send(record);
	}
}