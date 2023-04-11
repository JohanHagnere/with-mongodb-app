import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const dbComment = db.collection("comments");

  switch (req.method) {
    case "GET":
      const comments = await dbComment
        .find({
          movie_id: new ObjectId(req.query.idMovie.trim()),
        })
        .toArray();
      res.json({ status: 200, data: comments });
      break;
  }
}
