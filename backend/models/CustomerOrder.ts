import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { WineProduct } from "./WineProduct";

@Entity()
export class CustomerOrder {
  @PrimaryGeneratedColumn()  // TypeORM Decorators to for scheme
  id?: number;

  @Column()
  quantity?: number;

  @Column("decimal")
  total_amount?: number;

  @Column()
  status?: string;

  @ManyToOne(() => WineProduct, (wineProduct) => wineProduct.orders)
  wineProduct?: WineProduct;
}
