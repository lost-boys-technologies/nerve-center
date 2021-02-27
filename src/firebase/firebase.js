import app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config';
import 'firebase/firestore';

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    async register(name, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(
            email,
            password
        );

        await this.db.collection('users').doc(newUser.user.uid).set({ uid: newUser.user.uid, name: name },{ merge: true });
        // TODO Rewrite logic for email verification and have user logout after registering
        // await this.auth.currentUser.sendEmailVerification();
        return await newUser.user.updateProfile({
            displayName: name,
        })
    }

    // TODO add google option
    // async loginByGoogle() {
    //     const googleAuthProvider = this.auth.GoogleAuthProvider;
    //     const provider = new googleAuthProvider();
    //     provider.addScope('profile');
    //     provider.addScope('email');
    //     googleAuthProvider.this.auth().signInWithPopup(provider).then(function(result) {
    //         return result.user;
    //     })
    // }

    async login(email, password) {
        return await this.auth.signInWithEmailAndPassword(email, password)
    }
    
    async logout() {
        await this.auth.signOut();
    }

    async resetPassword(email) {
        await this.auth.sendPasswordResetEmail(email);
    }

}

const firebase = new Firebase()
export default firebase;
