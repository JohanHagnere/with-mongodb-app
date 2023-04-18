import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * @swagger
 * /api/movie:
 *   post:
 *     summary: Adds a movie to the "sample_mflix" database
 *     tags:
 *       - Movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Godfather"
 *               year:
 *                 type: integer
 *                 example: 1972
 *               rated:
 *                 type: string
 *                 example: "R"
 *               runtime:
 *                 type: integer
 *                 example: 175
 *               genre:
 *                 type: string
 *                 example: "Crime, Drama"
 *               director:
 *                 type: string
 *                 example: "Francis Ford Coppola"
 *               actors:
 *                 type: string
 *                 example: "Marlon Brando, Al Pacino, James Caan"
 *               plot:
 *                 type: string
 *                 example: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
 *               poster:
 *                 type: string
 *                 example: "https://www.example.com/posters/the-godfather.jpg"
 *               imdb:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "tt0068646"
 *                   rating:
 *                     type: number
 *                     example: 9.2
 *                   votes:
 *                     type: integer
 *                     example: 1567890
 *             required:
 *               - title
 *               - year
 *               - rated
 *               - runtime
 *               - genre
 *               - director
 *               - actors
 *               - plot
 *               - poster
 *               - imdb
 *     responses:
 *       200:
 *         description: The newly created movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     movie:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "620n94d3i839k38f7m83n02"
 *                         title:
 *                           type: string
 *                           example: "The Godfather"
 *                         year:
 *                           type: integer
 *                           example: 1972
 *                         rated:
 *                           type: string
 *                           example: "R"
 *                         runtime:
 *                           type: integer
 *                           example: 175
 *                         genre:
 *                           type: string
 *                           example: "Crime, Drama"
 *                         director:
 *                           type: string
 *                           example: "Francis Ford Coppola"
 *                         actors:
 *                           type: string
 *                           example: "Marlon Brando, Al Pacino, James Caan"
 *                         plot:
 *                           type: string
 *                           example: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
 *                         poster:
 *                           type: string
 *                           example: "https://www.example.com/posters/the-godfather.jpg"
 *                         imdb:
 *                           type: object
 *                           properties:
 *                              id:
 *                                type: string
 *                                example: "The godfather"
 *                              rating:
 *                                type: number
 *                                example: 9.2
 *                              votes:
 *                                type: integer
 *                                example: 1567890
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
