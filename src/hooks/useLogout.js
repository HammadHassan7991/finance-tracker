import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import useAuthContext from "./useAuthContext";

const useLogout = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(false)

    const logout = async () => {
        setError(null)
        setIsPending(true)
        // signing the user out
        try {
            await projectAuth.signOut()
            // dispatch logout state
            dispatch({ type: 'LOGOUT' })
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
    return { logout, error, isPending }
}

export default useLogout;