import clientPromise from "../../lib/mongodb";

/**
* @swagger
* /api/movies:
*   get:
*       summary: Get the movies
*       description: Returns the 10 first movies from the database
*       responses:
*           200:
*               description: Movies returned
*/


export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (req.method) {
        case "GET":
            const movies = await db.collection('movies').find({}).limit(10).toArray();
            res.json({ status: 200, data: movies });
            break;
    }
};