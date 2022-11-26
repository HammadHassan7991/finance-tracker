import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(false)

    const login = async (email, pass) => {
        setError(null)
        setIsPending(true)
        // signing the user out
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, pass)
            // dispatch logout state
            dispatch({ type: 'LOGIN', payload: res.user })
            // clean up 
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    return { login, error, isPending }
}

export default useLogin;