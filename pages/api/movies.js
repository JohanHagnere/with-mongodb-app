import clientPromise from "../../lib/mongodb";

export default async function handle(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (req.method) {
        case "GET":
            const movies = await db.collection('movies').find({}).limit(10).toArray();
            res.json({ status: 200, data: movies });
            break;
        case "POST":
            console.log(req.method);
            break;
    }

};