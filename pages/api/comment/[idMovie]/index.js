import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @swagger
 * /api/comment/{idMovie}:
 *   post:
 *     summary: Create a new comment for a movie.
 *     description: Creates a new comment document in the "comments" collection of the "sample_mflix" database.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         description: ID of the movie to create a comment for.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Request body containing the comment data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user who created the comment.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email of the user who created the comment.
 *                 example: johndoe@mongo.com
 *               movie_id:
 *                 type: integer
 *                 description: Id of the movie to create a comment for.
 *                 example: 573a1390f29313caabcd4323
 *               text:
 *                 type: string
 *                 description: Text content of the comment.
 *                 example: This movie was great!
 *               date:
 *                  type: string
 *                  format: date-time
 *                  description: Date and time the comment was created.
 *                  example: "2022-04-18T14:02:57.000Z"
 *     responses:
 *       '200':
 *         description: Comment successfully created.
 *         content: {}
 *       '400':
 *         description: Bad request.
 *         content: {}
 *       '500':
 *         description: Internal server error.
 *         content: {}
 */

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
