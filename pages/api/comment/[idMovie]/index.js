import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @swagger
 * /api/movies:
 *   post:
 *       summary: Creates a new movie
 *       description: Creates a new movie in the database from the request body
 *       requestBody:
 *           content:
 *               application/json:
 *                   schema: #Request body contents
 *                       type: object
 *                       properties:
 *                           plot:
 *                               type: string
 *                           genres:
 *                               type: array
 *                               items:
 *                                   type: string
 *       responses:
 *           200:
 *               description: Movie created
 */

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");
  const dbComment = db.collection("comments");

  switch (req.method) {
    case "POST":
      const comment = await dbComment.insertOne({
        ...req.body,
        movie_id: new ObjectId(req.query.idMovie),
      });
      console.log(req.query);
      res.json({ status: 200, data: { comment: comment } });
      break;
  }
}
