import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { CartService } from "./cart.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpDescriptions } from "src/shared/enums/http-descriptions.enum";
import { CreateOrderDto } from "./dtos/create-order.dto";

@ApiTags("Carrinho")
@Controller("cart")
export class CartController {
	constructor (
        private readonly cartService: CartService
	) {}

	@Post("postCart")
	calcPrices(@Body() request: CreateOrderDto) {
		return this.cartService.postCart(request);
	}

	
	@Post("pagamento")
	pagamento(@Body() request: { clientCpf: number }) {
		return this.cartService.postPaymentConfirm(request);
	}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: HttpDescriptions.OK })
	findAllCart() {
		return this.cartService.findAll();
	}
}
