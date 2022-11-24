import { createUserWithEmailAndPassword, getAuth, signInWithPopup } from "firebase/auth";
import React, { createContext, useState } from 'react';
import app from '../firebase/firebase.config';

export const AuthContext = createContext()
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setuser] = useState(null)


    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    const googleSignIn = (provider) => {
        return signInWithPopup(auth, provider)
    }

    const authInfo = {createNewUser, googleSignIn}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;