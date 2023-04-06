
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const dbMovie = db.collection("movies");

    const fakeMovie = {
        "plot": "An immigrant leaves his sweetheart in Italy to find a better life across the sea in the grimy slums of New York. They are eventually reunited and marry. But life in New York is hard and ...",
        "genres": [
            "Drama"
        ],
        "runtime": 78,
        "rated": "PASSED",
        "cast": [
            "George Beban",
            "Clara Williams",
            "J. Frank Burke",
            "Leo Willis"
        ],
        "title": "The Italian",
        "fullplot": "An immigrant leaves his sweetheart in Italy to find a better life across the sea in the grimy slums of New York. They are eventually reunited and marry. But life in New York is hard and tragedy tarnishes their dream of a better life in the new world.",
        "languages": [
            "English"
        ],
        "released": "1915-01-01T00:00:00.000Z",
        "directors": [
            "Reginald Barker"
        ],
        "writers": [
            "Thomas H. Ince (story)",
            "C. Gardner Sullivan (story)"
        ],
        "awards": {
            "wins": 1,
            "nominations": 0,
            "text": "1 win."
        },
        "lastupdated": "2015-07-27 00:07:43.230000000",
        "year": 1915,
        "imdb": {
            "rating": 6.4,
            "votes": 175,
            "id": 5557
        },
        "countries": [
            "USA"
        ],
        "type": "movie",
        "tomatoes": {
            "viewer": {
                "rating": 4,
                "numReviews": 204,
                "meter": 60
            },
            "dvd": "2008-08-26T00:00:00.000Z",
            "lastUpdated": "2015-07-24T19:30:02.000Z"
        },
        "num_mflix_comments": 0
    }

    switch (req.method) {
        case "POST":
            const movie = await dbMovie.insertOne(req.body);
            res.json({ status: 200, data: { movie: movie } })
            // https://www.mongodb.com/docs/v6.0/reference/method/db.collection.insertOne/#db.collection.insertone--
            break;
    }
}