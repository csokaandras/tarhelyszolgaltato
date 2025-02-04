import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Order } from "../entities/Order";
import { Product } from "../entities/Hosting";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DBHOST,
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    synchronize: process.env.SYNCHRONIZE === "true",
    logging: process.env.LOGGING === "true",
    entities: [ User, Order, Product ],
    migrations: [],
    subscribers: [],
});

export const jwtSecret = process.env.JWT_SECRET