import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { WineProduct } from "./WineProduct";

@Entity()
export class MasterWine {
  @PrimaryGeneratedColumn()  // TypeORM Decorators to for scheme
  id?: number;

  @Column()
  name?: string;

  @Column()
  vintage?: number;

  @OneToMany(() => WineProduct, (wineProduct) => wineProduct.masterWine) // relationshipe WineProduct-masterwine
  wineProducts?: WineProduct[];
}
