import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();

main.use("/api/v1", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));
const db = admin.firestore();

const userCollection = "users";
export const webApi = functions.https.onRequest(main);

export interface User {
    email: string;
}

app.post("/Users", async (req, res) => {
  try {
    const user: User = {
      email: "emma.priester@gmail.com",
    };
    const newDoc = await db.collection(userCollection).add(user);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send("error");
  }
});
