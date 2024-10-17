import Fastify from "fastify";
import { AppDataSource } from "../ormconfig";
import { MasterWine } from "../models/MasterWine";
import { CustomerOrder } from "../models/CustomerOrder";
import { WineProduct } from "../models/WineProduct";
import cors from '@fastify/cors';
import fs from 'fs';

const fastify = Fastify({
  logger: true,
  https: {
    key: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/fullchain.pem'),
  },
});

fastify.register(cors);

fastify.get('/wines', async (request, reply) => {
  const { sortBy } = request.query as { sortBy: string };

  const sortColumn = sortBy === 'revenue' ? 'total_revenue' : sortBy === 'quantity' ? 'total_quantity' : 'total_orders';

  const wines = await AppDataSource
    .getRepository(MasterWine)
    .createQueryBuilder('wine')
    .select('wine.name', 'name')
    .addSelect('wine.vintage', 'vintage')
    .addSelect('SUM(customer_order.quantity)', 'total_quantity')
    .addSelect('SUM(customer_order.total_amount)', 'total_revenue')
    .addSelect('COUNT(customer_order.id)', 'total_orders')
    .innerJoin(WineProduct, 'product', 'product.master_wine_id = wine.id')
    .innerJoin(CustomerOrder, 'customer_order', 'customer_order.wine_product_id = product.id AND customer_order.status IN ("paid", "dispatched")')
    .groupBy('wine.id, wine.name, wine.vintage')
    .orderBy(sortColumn, 'DESC')
    .getRawMany();

  reply.send(wines);
});

const start = async () => {
  try {
    await AppDataSource.initialize();
    await fastify.listen({ port: 443, host: '0.0.0.0' });
    console.log("Server is running on https://yourdomain.com");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
