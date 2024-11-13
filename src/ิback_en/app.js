const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.json())

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ezlaw"
})

connection.connect((err) =>{
    if(err) {
        console.log("Error");
        return;
    }
    console.log("connect"); 
})

app.get('/data', (req,res) => {
    if(err) {
        return res.status(500).send()
    }
})