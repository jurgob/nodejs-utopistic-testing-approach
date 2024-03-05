import express, { Express, Request, Response } from "express";
import {createDBClient} from "./db_client";
import bodyParser from 'body-parser';

export async function createApp(){
  const app: Express = express();

  const dbClient = await createDBClient();

  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(bodyParser.json())
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  app.post("/users", async (req: Request, res: Response) => {
    try{
      const newUser = await dbClient.createUser(req.body);

      res.status(200).json(newUser);
    }catch(e){
      res.status(400).json({error: e as string});
    }
    // dbClient
  });

  return app
}


