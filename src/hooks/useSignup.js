import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(false)


    const signup = async (email, pass, displayName) => {

        setError(null)
        setIsPending(true)
        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, pass)
            // console.log(res.user);

            // dispatch
            dispatch({ type: 'LOGIN', payload: res.user })


            if (!res) {
                throw new Error('Couldnt complete signup')
            }
            await res.user.updateProfile({ displayName })
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
    return { signup, error, isPending };
}

export default useSignup;
