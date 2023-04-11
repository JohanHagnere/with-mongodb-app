import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const dbComment = db.collection("comments");

  const fakeComment = {
    name: "Jean Dupont",
    email: "jean.dupont@fakegmail.com",
    movie_id: "573a1390f29313caabcd4323",
    text: "Eiu quaerat fuga temporibus. Praesentium expedita sequi repellat id. Corporis minima enim ex. Provident fugit nisi dignissimos nulla nam ipsum aliquam.",
    date: "2002-08-18T04:56:07.000Z",
  };

  switch (req.method) {
    case "GET":
      const comments = await dbComment.findOne({
        _id: new ObjectId(req.query.idComment),
        movie_id: new ObjectId(req.query.idMovie),
      });
      res.json({ status: 200, data: comments });
      break;
    case "PUT":
      const { ...fieldsToUpdate } = req.body;
      console.log(req.body);
      const updated = dbComment.findOneAndUpdate(
        {
          _id: new ObjectId(req.query.idComment),
          movie_id: new ObjectId(req.query.idMovie),
        },
        { $set: fieldsToUpdate },
        { new: true }
        // NE RETOURNE RIEN ET DOIT RETOURNER LE DOC MODIFIE MAIS FONCTIONNE
      );
      res.json({ status: 200, data: updated });
      break;
    case "DELETE":
      await dbComment.deleteOne({ _id: new ObjectId(req.query.id) });
      res.json({ status: 200, message: "comment successfully deleted" });
      break;
  }
}
