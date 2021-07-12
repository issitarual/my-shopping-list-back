import express, { text } from "express";
import cors from "cors";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/items", async (req,res) => {
    const { text } = req.body;
    if(text.trim().length === 0 || typeof text !== 'string' || parseInt(text)){
        return res.sendStatus(404);
    }
    try{
        const repeatItems = await connection.query(`SELECT * FROM items WHERE text = $1`, [text]);
        if(repeatItems.rows.length !== 0){
            return res.sendStatus(400);
        }
        await connection.query(`INSERT INTO items (text) VALUES ($1)`, [text]);
        res.sendStatus(200);
    }
    catch{
        res.sendStatus(500);
    }
});

app.get("/items", async (req, res) => {
    try{
        const items = await connection.query(`SELECT * FROM items`);
        res.send(items.rows)
    }
    catch{
        res.sendStatus(500);
    }
})

export default app;
