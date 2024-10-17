import { DataSource } from "typeorm";
import { MasterWine } from './models/MasterWine';
import { WineProduct } from './models/WineProduct';
import { CustomerOrder } from './models/CustomerOrder';

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db/winedrops.db",      // database file path
  entities: [MasterWine, WineProduct, CustomerOrder], // tables
  synchronize: false, 
});
