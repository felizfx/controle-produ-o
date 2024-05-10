import { Module } from "@nestjs/common";
import { ProducerService } from "./producer.service";
import { ConsumerService } from "./consumer.service";
import { KafkaConfigModule } from "src/config/kafka/configuration.module";

@Module({
	imports: [KafkaConfigModule],
	providers: [ProducerService, ConsumerService],
	exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}