import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, sendEmailVerification } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDWMsQ_lIPutPYLWfsu0UBCipPyxwvVvwE",
  authDomain: "shopiverse-33fbd.firebaseapp.com",
  projectId: "shopiverse-33fbd",
  storageBucket: "shopiverse-33fbd.appspot.com",
  messagingSenderId: "1053419123694",
  appId: "1:1053419123694:web:cb64b16a235d5461b514ff",
  measurementId: "G-8G4FGM3JBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app)



export const signInWithGoogle = async () => {
    var provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        console.log(auth)

    } catch (err) {
        console.error(err);
    }
};

export const signinwithemail = async (email, pass) => {
    try {
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
        console.error(err);
    }
}

export const signupwithemail = async (email, pass) => {
    try {
        const {error,res} = await createUserWithEmailAndPassword(auth, email, pass);

        if (res) {
            await sendEmailVerification(res.user)
            alert('email signup link has been send to your email, please check your inbox to verify your profile')
        }
        return true;
        

    } catch (err) {
        console.error(err.code);
        if (err.code === 'auth/email-already-in-use'){
            alert('This Email is already in use!');
        }
        else if (err.code === 'auth/invalid-email') 
        alert('invalid email id ');
    return false;
}
    
}
export const logout = async () => {
    try {
        await signOut(auth);

    } catch (err) {
        console.error(err);
    }
};

export const resetpassward = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    }
    catch (err) {
        console.error(err);
    }
}

export { auth, app, firestore };


