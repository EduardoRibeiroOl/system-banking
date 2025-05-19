// pages/api/users.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("meubanco");
  const users = await db.collection("usuarios").find().toArray();
  res.json(users);
}
