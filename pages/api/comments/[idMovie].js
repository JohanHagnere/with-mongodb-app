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
 *       - name: id
 *         in: path
 *         description: ID of the movie to get comments for.
 *         required: true
 *         schema:
 *           type: string
 *           example: 61401a265a5b5e002d5a5e17
 *     responses:
 *       200:
 *         description: OK. Returns an array of comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier for the comment document.
 *                   example: "617ce0a0e81f7c8d75247d7e"
 *                 name:
 *                   type: string
 *                   description: Name of the user who created the comment.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: Email of the user who created the comment.
 *                   example: john.doe@example.com
 *                 movie_id:
 *                   type: string
 *                   description: ID of the movie the comment is associated with.
 *                   example: "573a1390f29313caabcd4323"
 *                 text:
 *                   type: string
 *                   description: Text content of the comment.
 *                   example: This movie was great!
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time the comment was created.
 *                   example: "2022-04-18T14:02:57.000Z"
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
      res.json({ status: 200, data: comments });
      break;
  }
}
