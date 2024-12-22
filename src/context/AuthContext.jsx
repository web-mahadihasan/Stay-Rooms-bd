import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../config/firebase.init";


export const AuthContextProvider = createContext(null)
const AuthContext = ({children}) => {
    const auth = getAuth(app);
    const google = new GoogleAuthProvider()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Create user 
    const registerNewUser = (email, password) =>  {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // Login user
    const loginWithEmail = (email, password) =>  {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    } 
    // Google Login / Register 
    const loginWithGoogle = () =>  {
        setLoading(true)
        return signInWithPopup(auth, google)
    }
    // Updata user 
    const updataUser = (updataData) =>  {
        return updateProfile(auth.currentUser, updataData)
    }
    // Log out user
     // Log out user 
     const logOutUser = () => {
        return signOut(auth);
    }

    // on Auth state change 
    useEffect(() =>  {
        const unsubscribe = onAuthStateChanged(auth, currentUser =>  {
            setLoading(false)
            setUser(currentUser)
        })

        return () =>  {
            unsubscribe()
        }
    }, [])

    const authInfo = {
        registerNewUser,
        loginWithEmail,
        loginWithGoogle,
        updataUser,
        logOutUser,
        user, 
        setUser,
        loading, 
        setLoading
    }
    return (
        <AuthContextProvider.Provider value={authInfo}>
            {children}
        </AuthContextProvider.Provider>
    );
};

export default AuthContext;