import { createContext, useEffect, useState } from "react";
import app from "./firebase.cofig";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";


const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    const axiosPublic = useAxiosPublic()

    //sign up user
    const signUpUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    // signIn user
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //google sign in
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    //sign out user
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {

            setUser(currentUser)

            // console.log(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                //get token and store client
                axiosPublic.post('/jwt', userInfo)

                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
            }

            setLoading(false)



        }

        )
        return () => unSubscribe()
    }, [])

    const allValues = {
        loading,
        signUpUser,
        signInUser,
        googleSignIn,
        user,
        signOutUser
    }

    return (
        <AuthContext.Provider value={allValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;