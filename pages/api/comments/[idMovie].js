import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @swagger
 * /api/comments/{idMovie}:
 *   get:
 *     summary: Get comments for a movie by ID.
 *     description: Returns a list of comments for a movie by ID.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie to get comments for.
 *         schema:
 *           type: string
 *           example: 61401a265a5b5e002d5a5e17
 *     responses:
 *       200:
 *         description: OK. Returns an array of comments.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */

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
      console.log(req.query);
      res.json({ status: 200, data: comments });
      break;
  }
}
