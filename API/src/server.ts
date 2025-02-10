import "dotenv/config";
const express = require( "express");
import { AppDataSource } from "./config/data-source";
import router from "./roots";
const cors = require('cors');
var mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  multipleStatements: true
});

function generatePassword(){
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!#@%';
    let password = '';
    for(let i =0; i<12; i++){
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
.then(()=>{

    app.use(express.json());
    app.use("/api", router)

    app.post('/create-database', (req, res) => {
        const { dbname } = req.body;
        if (!dbname){
            return res.status(400).json({message: 'Database name is required!'});
        }
    
        const sql = `CREATE DATABASE \`${dbname}\``;
    
        db.query(sql, (err, results) => {
            if (err){
                return res.status(500).json({message: err});
            }
            res.status(200).json({message: 'Database created successfully!', data: results});
        });
    
    });
    
    app.post('/create-user', (req, res) => {
        const { username } = req.body;
        if (!username){
            return res.status(400).json({message: 'Username is required!'});
        }
        const password = generatePassword();
        console.log(password);
        const sql = `CREATE USER '${username}'@'localhost' IDENTIFIED BY '${password}'`;
        db.query(sql, (err, results) => {
            if (err){
                return res.status(500).json({message: err});
            }
            res.status(200).json({message: 'User created successfully!', data: results, password});
        });
    });
    
    app.post('/grant-privileges', (req, res) => {
        const {username, dbname, privileges} = req.body;
        if (!username || !dbname || !privileges){
            return res.status(400).json({message: 'Missing data!'});
        }
        const sql = `USE ${dbname}; GRANT ${privileges} ON \`${dbname}\`.* TO '${username}'@'localhost'`;
        db.query(sql, (err, results) => {
            if (err){
                return res.status(500).json({message: err});
            }
            res.status(200).json({message: `Granted ${privileges} to ${username} on ${dbname}!`, data: results});
        });
    });

    
    app.listen(process.env.PORT, ()=>{
        console.log(`Server: http://localhost:${process.env.PORT}`);
    });
})
.catch(
    (err)=>{
        console.log(`Hiba történt az adatbázis kapcsolat felépítésekor! (${err})`);
    }
);

