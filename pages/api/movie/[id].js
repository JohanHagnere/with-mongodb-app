import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const dbMovie = db.collection("movies");

  switch (req.method) {
    case "GET":
      const data = await dbMovie.findOne({ _id: new ObjectId(req.query.id) });
      res.json({ status: 200, data: { movie: data } });
      break;
    case "PUT":
      // const idMovie = req.query.id
      const { ...fieldsToUpdate } = req.body;
      const updated = dbMovie.findOneAndUpdate(
        { _id: new ObjectId(req.query.id) },
        { $set: fieldsToUpdate },
        { new: true }
      );
      res.json({ status: 200, data: updated });
      break;
    case "DELETE":
      await dbMovie.deleteOne({ _id: new ObjectId(req.query.id) });
      res.json({ status: 200, message: "Movie successfully deleted" });
      break;
  }
}
