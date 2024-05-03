/* eslint-disable indent */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "carrinhos" })
export class Cart {
    @PrimaryGeneratedColumn({ name: "id_car" })
    idCart: number;

    @Column({ name: "prod_car" })
    prodCart: number; 

    @Column({ name: "qnt_prod_car" })
    qntProdCart: number; 

    @Column({ name: "desconto_car" })
    discountCart: number; 
}