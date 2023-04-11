import clientPromise from "../../../lib/mongodb";
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
  const dbMovie = db.collection("movies");

  switch (req.method) {
    case "POST":
      const movie = await dbMovie.insertOne(req.body);
      res.json({ status: 200, data: { movie: movie } });
      break;
  }
}
