import app from "firebase/compat/app";
import firebaseConfig from "./config";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


class Firebase {
    
    constructor() {
        if( !app.apps.length ) {
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    async register( nombre, email, password ) {
        const newUser = await this.auth.createUserWithEmailAndPassword( email, password );
        return await newUser.user.updateProfile({ displayName: nombre });
    }

    async login( email, password ) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    async logout() {
        await this.auth.signOut();
    }
}

const firebase = new Firebase();
export default firebase;
