import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Order } from "../entities/Order";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DBHOST,
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    synchronize: process.env.SYNCHRONIZE === "true",
    logging: process.env.LOGGING === "true",
    entities: [ User, Product, Order ],
    migrations: [],
    subscribers: [],
});


export const jwtSecret = process.env.JWT_SECRET