import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @swagger
 * /api/comment/{idMovie}/{idComment}:
 *   get:
 *     summary: Get a single comment for a movie.
 *     description: Retrieves a single comment document from the "comments" collection of the "sample_mflix" database, based on the provided comment ID and movie ID.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         description: ID of the movie to retrieve a comment from.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idComment
 *         description: ID of the comment to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Comment successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *       '404':
 *         description: Comment not found.
 *         content: {}
 *       '500':
 *         description: Internal server error.
 *         content: {}
 *   put:
 *     summary: Update a single comment for a movie.
 *     description: Updates a single comment document in the "comments" collection of the "sample_mflix" database, based on the provided comment ID and movie ID.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         description: ID of the movie the comment is associated with.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idComment
 *         description: ID of the comment to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Request body containing the fields to update in the comment document.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *     responses:
 *       '200':
 *         description: Comment successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *       '404':
 *         description: Comment not found.
 *         content: {}
 *       '500':
 *         description: Internal server error.
 *         content: {}
 *   delete:
 *     summary: Delete a single comment for a movie.
 *     description: Delete a single comment document in the "comments" collection of the "sample_mflix" database, based on the provided comment ID and movie ID.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         description: ID of the movie the comment is associated with.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idComment
 *         description: ID of the comment to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Comment successfully deleted.
 *       '404':
 *         description: Comment not found.
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
    case "GET":
      const comments = await dbComment.findOne({
        _id: new ObjectId(req.query.idComment),
        movie_id: new ObjectId(req.query.idMovie),
      });
      res.json({ status: 200, data: comments });
      break;
    case "PUT":
      const { ...fieldsToUpdate } = req.body;
      let updated = dbComment.findOneAndUpdate(
        {
          _id: new ObjectId(req.query.idComment),
          movie_id: new ObjectId(req.query.idMovie),
        },
        { $set: fieldsToUpdate },
        { returnNewDocument: true }
      );
      res.json({ status: 200, data: updated });
      break;
    case "DELETE":
      await dbComment.deleteOne({
        _id: new ObjectId(req.query.idComment),
        movie_id: new ObjectId(req.query.idMovie),
      });
      res.json({ status: 200, message: "comment successfully deleted" });
      break;
  }
}
