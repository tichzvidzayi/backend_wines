import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { MasterWine } from "./MasterWine";
import { CustomerOrder } from "./CustomerOrder";

@Entity()
export class WineProduct {
  @PrimaryGeneratedColumn() // TypeORM Decorators to for scheme
  id?: number;

  @Column()
  name?: string;

  @Column("decimal")
  price?: number;

  @ManyToOne(() => MasterWine, (masterWine) => masterWine.wineProducts)  // reelationships
  masterWine?: MasterWine;

  @OneToMany(() => CustomerOrder, (order) => order.wineProduct)
  orders?: CustomerOrder[];
}
