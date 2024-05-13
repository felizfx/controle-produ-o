import { Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { CartService } from "./cart.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpDescriptions } from "src/shared/enums/http-descriptions.enum";

@ApiTags("Carrinho")
@Controller("cart")
export class CartController {
	constructor (
        private readonly cartService: CartService
	) {}

	@Post("calcprices")
	calcPrices() {
		this.cartService.calcPriceDois();
		return this.cartService.calcPrice();
	}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: HttpDescriptions.OK })
	findAllCart() {
		return this.cartService.findAll();
	}
}
