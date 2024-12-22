import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../config/firebase.init";
import axios from "axios";


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
        const unsubscribe = onAuthStateChanged(auth, async currentUser =>  {
            if(currentUser?.email){
                // Generate token 
                const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/jwt`, {email: currentUser?.email})
                console.log(data)
                setUser(currentUser)
                console.log(data)
            }else{
                setUser(null)
            }
            setLoading(false)
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