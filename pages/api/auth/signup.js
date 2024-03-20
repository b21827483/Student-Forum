import {MongoClient} from "mongodb";
import {hashPassword} from "../../../utils/passwordCheck";

export function checkInputValidity(input) {

}

export default async function handler(req, res) {

    if (req.method === 'POST') {

        const {name, surname, email, password} = req.body;

        if (!name || name.trim().length === 0 ||
            !surname || surname.trim().length === 0 ||
            !email || !email.match(/^\S+@\S+\.\S+$/) ||
            !password || password.length < 8) {

            res.status(422).json({message: 'Invalid Input'})
            return;
        }

        console.log(process.env.MONGODB_URL)

        const client = await MongoClient.connect(process.env.MONGODB_URL);
        const collections = client.db('Forum').collection('USERS');

        //Check if user already exist
        const exist = await collections.findOne({email: email});

        if (exist) {
            res.status(422).json({message: 'User already exist.'});
            return;
        }

        const hashedPassword = hashPassword(password);
        await collections.insertOne({name: name, surname: surname, email: email, password: hashedPassword});

        res.status(201).json({message: 'Successfully signed up.'})

    }
}