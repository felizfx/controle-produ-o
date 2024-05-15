import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
	readonly clientCpf: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly count: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly productId: string;
}