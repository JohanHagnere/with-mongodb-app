import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

// PAGE A MODIFIER JAI JUSTE COPIER COLLER IL FAUT FAIRE GET POST PUT DELETE DES SINGLE COMMENT ICI

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const dbComment = db.collection("comments");

    const fakeComment = {
        "name": "Jean Dupont",
        "email": "jean.dupont@fakegmail.com",
        "movie_id": "573a1390f29313caabcd4323",
        "text": "Eiu quaerat fuga temporibus. Praesentium expedita sequi repellat id. Corporis minima enim ex. Provident fugit nisi dignissimos nulla nam ipsum aliquam.",
        "date": "2002-08-18T04:56:07.000Z"
    }

    switch (req.method) {
        case "GET":
            const comments = await db.collection('comments').find({
                movie_id: new ObjectId(req.query.idMovie.trim())
            }).limit(10).toArray();
            res.json({ status: 200, data: comments });
            break;
        case "POST":
            const comment = await dbComment.insertOne({ ...req.body, movie_id: new ObjectId(req.body.movie_id) });
            res.json({ status: 200, data: { comment: comment } })
            //J'ai corrigé la requete pour qu'elle fonctionne, il fallait parser le movie_id en Object_id car il est passé en string dans le req.body
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
