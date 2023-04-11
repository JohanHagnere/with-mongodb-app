import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const dbComment = db.collection("comments");

  switch (req.method) {
    case "POST":
      const comment = await dbComment.insertOne(
        {
          ...req.body,
          movie_id: new ObjectId(req.query.idMovie),
        },
        { new: true }
      );
      console.log(req.query);
      res.json({ status: 200, data: { comment: comment } });
      break;
  }
}
