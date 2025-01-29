const express = require( "express");
import { AppDataSource } from "./config/data-source";

const app = express();

AppDataSource.initialize()
.then(()=>{

    app.use(express.json());
/*
    app.use('/users', userRoutes);
    app.use('/products', productRoutes);
    app.use('/orders', orderRoutes);
*/
    app.listen(3000, ()=>{
        console.log(`Server: http://localhost:3000`);
    });
})
.catch(
    (err)=>{
        console.log(`Hiba történt az adatbázis kapcsolat felépítésekor! (${err})`);
    }
);

