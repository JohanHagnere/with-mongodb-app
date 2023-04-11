import clientPromise from "../../lib/mongodb";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     description: Retrieves a list of the 10 most recent movies from the "sample_mflix" database
 *     responses:
 *       200:
 *         description: A list of movies
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               description: HTTP status code for the response
 *               example: 200
 *             data:
 *               type: array
 *               description: An array of movies
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier for the movie
 *                     example: 5e98f55d5a620932cda16b8a
 *                   title:
 *                     type: string
 *                     description: Title of the movie
 *                     example: The Shawshank Redemption
 *                   year:
 *                     type: integer
 *                     description: Release year of the movie
 *                     example: 1994
 *                   rated:
 *                     type: string
 *                     description: Movie rating
 *                     example: R
 *                   runtime:
 *                     type: integer
 *                     description: Length of the movie in minutes
 *                     example: 142
 *                   genre:
 *                     type: string
 *                     description: Genre of the movie
 *                     example: Drama
 *                   director:
 *                     type: string
 *                     description: Director of the movie
 *                     example: Frank Darabont
 *                   actors:
 *                     type: string
 *                     description: Actors in the movie
 *                     example: Tim Robbins, Morgan Freeman, Bob Gunton
 *                   plot:
 *                     type: string
 *                     description: Plot summary of the movie
 *                     example: Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.
 *                   poster:
 *                     type: string
 *                     description: URL of the movie poster
 *                     example: https://www.example.com/posters/the-shawshank-redemption.jpg
 *                   imdb:
 *                     type: object
 *                     description: Information about the movie from the IMDB API
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: IMDB ID of the movie
 *                         example: tt0111161
 *                       rating:
 *                         type: number
 *                         description: IMDB rating of the movie
 *                         example: 9.3
 *                       votes:
 *                         type: integer
 *                         description: Number of votes for the movie on IMDB
 *                         example: 2345678
 */

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("sample_mflix");

  switch (req.method) {
    case "GET":
      const movies = await db.collection("movies").find({}).limit(1).toArray();
      res.json({ status: 200, data: movies });
      break;
  }
}
