import "dotenv/config";
import { DataSource } from "typeorm";
 
export const config = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        synchronize: process.env.SYNCHRONIZE === "true",
        logging: process.env.LOGGING === "true",
    },
    jwtSecret: process.env.JWT_SECRET,
};

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.db.host,
    username: config.db.user,
    password: config.db.password,
    database: config.db.database,
    synchronize: config.db.synchronize,
    logging: config.db.logging,
    entities: [ "src/entities/**/*.ts" ],
    migrations: [],
    subscribers: [],
});