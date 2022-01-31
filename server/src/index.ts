import express, { Request, Response } from "express";
import keys from "./keys";
import cors from "cors";
import bodyParser from "body-parser";
import { Pool } from "pg";
import { createClient } from "redis";

// Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
   res.status(200).send("Hey you have passed");
});

app.get("/values/all", async (req: Request, res: Response) => {
   const values = await pgClient.query("SELECT * FROM values");
   res.send(values.rows);
});

app.get("/values/current", async (req: Request, res: Response) => {
   const values = await redisClient.hGetAll("values");
   res.send(values);
});
app.post("/values", async (req: Request, res: Response) => {
   const { index } = req.body;
   if (parseInt(index) > 40) {
      return res.status(422).send("Index too high");
   }
   redisClient.hSet("value", index, 'Nothing yet');
   redisPublisher.publish("insert", index);
   pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);
   res.send({ working: true });
});

app.listen(5000, () => {
   console.log("listening on port 5000");
});

// Postgresql
const { pgUser, pgHost, pgDatabase, pgPassword, pgPort } = keys;

const pgClient = new Pool({
   user: pgUser,
   password: pgPassword,
   host: pgHost,
   database: pgDatabase,
   port: parseInt(pgPort!)
});

pgClient.on("connect", (client) => {
   client
      .query("CREATE TABLE IF NOT EXISTS values (number INT)")
      .catch((err) => console.error(err));
});

const redisClient = createClient({
   url: `redis://${keys.redisHost}:${keys.redisPort}`
});

const redisPublisher = redisClient.duplicate();