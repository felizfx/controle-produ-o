import { registerAs } from "@nestjs/config";

export default registerAs("kafka", () => ({
	broker: process.env.BROKER
}));
