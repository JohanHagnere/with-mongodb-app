import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const dbComment = db.collection("comments");

    switch (req.method) {
        case "GET":
            const comments = await db.collection('comments').find({
                movie_id: new ObjectId(req.query.idMovie.trim())
            }).limit(10).toArray();
            console.log(req.query);
            res.json({ status: 200, data: comments });
            break;
        case "POST":
            const comment = await dbComment.insertOne(req.body);
            res.json({ status: 200, data: { comment: comment } })
            // https://www.mongodb.com/docs/v6.0/reference/method/db.collection.insertOne/#db.collection.insertone--
            break;
        case "PUT":
            const { ...fieldsToUpdate } = req.body;
            const updated = dbComment.findOneAndUpdate(
                { _id: new ObjectId(req.query.id) },
                { $set: fieldsToUpdate },
                { new: true }
                // NE RETOURNE RIEN ET DOIT RETOURNER LE DOC MODIFIE MAIS FONCTIONNE
            );
            res.json({ status: 200, data: updated })
            // https://www.mongodb.com/docs/v6.0/reference/method/db.collection.findOneAndUpdate/#db.collection.findoneandupdate--
            break;
        case "DELETE":
            await dbComment.deleteOne({ _id: new ObjectId(req.query.id) });
            res.json({ status: 200, message: "comment successfully deleted" });
            break;
    }
}
