import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./cart.repository";

@Injectable()
export class CartService {
	constructor (
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>
	) {}

	async findAll() {
		try {
			const carts = await this.cartRepository.find();
			return carts;
		} catch (e) {
			console.log(e.message);
            
		}
	}
}
