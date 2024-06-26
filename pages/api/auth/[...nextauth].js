import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import {MongoClient} from "mongodb";
import {comparePassword} from "../../../utils/passwordCheck";

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {

      async session({session, token, user}) {
            if (session?.user) {
                session.user.id = token.sub;
            }

            return session;
      }
    },
    session: {
        strategy: 'jwt'
    },

    providers: [CredentialsProvider({name: 'credentials', credentials: {
                                                                    email: {label:'email', type:'email'},
                                                                    password: {label:'password', type:'password'},
                                                                    name: {label: 'name', type:'text'},
                                                                    surname: {label: 'surname', type: 'text'}},
        async authorize(credentials, req) {

            const client = await MongoClient.connect(process.env.MONGODB_URL);
            const collections = client.db('Forum').collection('USERS');

            const user = await collections.findOne({email: credentials.email});

            if (!user) {
                client.close();
                throw new Error('No user registered in this email.');
            }

            const validity = comparePassword(credentials.password, user.password);

            if (!validity){
                client.close();
                throw new Error('Wrong password. Please try again.');
            }

            return {name: user.name, surname: user.surname, email: user.email};
        }
    })]
})