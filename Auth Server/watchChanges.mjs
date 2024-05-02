//Source of this code: https://www.mongodb.com/docs/drivers/node/current/usage-examples/changeStream/#:~:text=Open%20a%20Change%20Stream,Database
import { MongoClient } from "mongodb";
import {dotenv} from 'dotenv';
dotenv.config({path: './config/config.env'});
const uri = "mongodb+srv://locmihirhs:<YOUR_PASSWORD>@cluster0.t2egptr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
let changeStream;
async function run() {
  try {
    const database = client.db("test");
    const haikus = database.collection("audits");
    changeStream = haikus.watch();
    for await (const change of changeStream) {
      console.log("Received change:\n", change);
    }
    await changeStream.close();
    
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
