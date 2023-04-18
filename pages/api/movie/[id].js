import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @swagger
 * components:
 *  schemas:
 *    Movie:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        plot:
 *          type: string
 *        genres:
 *          type: array
 *        runtime:
 *          type: integer
 *        cast:
 *          type: array
 *        num_mflix_comments:
 *          type: integer
 *        poster:
 *          type: string
 *        title:
 *          type: string
 *        lastupdated:
 *          type: date
 *        languages:
 *          type: array
 *        released:
 *          type: date
 *        directors:
 *          type: array
 *        rated:
 *          type : string
 *        awards:
 *          type: object
 *        year:
 *          type: integer
 *        imdb:
 *          type: object
 *        countries:
 *          type: array
 *      required:
 *          - _id
 *          - title
 *    NotFound:
 *       type: object
 *       properties:
 *        message:
 *          type: string
 *       required:
 *        - message
 *    MovieInput:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        year:
 *          type: integer
 *        genre:
 *          type: array
 *          items:
 *            type: string
 *        rated:
 *          type: string
 *        runtime:
 *          type: integer
 *        cast:
 *          type: array
 *          items:
 *            type: string
 *      required:
 *        - title
 *        - year
 *        - genre
 *        - rated
 *        - runtime
 *        - cast
 */

/**
 * @swagger
 * /api/movie/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     description: Retrieve a movie from the database by ID.
 *     tags:
 *       - Movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the movie to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *   put:
 *     summary: Update a movie by ID
 *     description: Update a movie in the database by ID.
 *     tags:
 *       - Movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the movie to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: movie
 *         description: The movie to update.
 *         schema:
 *           $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *   delete:
 *     summary: Delete a movie by ID
 *     description: Delete a movie from the database by ID.
 *     tags:
 *       - Movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the movie to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: HTTP status code for the response
 *                   example: 200
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Movie successfully deleted"
 *       404:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 */

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
