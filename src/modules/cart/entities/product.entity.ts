/* eslint-disable indent */
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "produtos" })
export class Product {
    @PrimaryColumn({ name: "id_prod" })
    idProd: string;

    @Column({ name: "nome_prod" })
    nomeProd: string; 

    @Column({ name: "tipo_prod" })
    tipoProd: string; 

    @Column({ name: "descr_prod" })
    descrProd: string; 

    @Column({ name: "valor_venda_prod" })
    valor: number; 

    @Column({ name: "estoque_prod" })
    estoque: number; 

    @Column({ name: "custo_prod" })
    custoProd: number; 
}