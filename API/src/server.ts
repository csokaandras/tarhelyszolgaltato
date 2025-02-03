import "dotenv/config";
const express = require( "express");
import { AppDataSource } from "./config/data-source";
import router from "./roots";
const cors = require('cors');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
.then(()=>{

    app.use(express.json());
    app.use("/api", router)
/*
    app.use('/users', userRoutes);
    app.use('/products', productRoutes);
    app.use('/orders', orderRoutes);
*/
    app.listen(process.env.PORT, ()=>{
        console.log(`Server: http://localhost:${process.env.PORT}`);
    });
})
.catch(
    (err)=>{
        console.log(`Hiba történt az adatbázis kapcsolat felépítésekor! (${err})`);
    }
);

