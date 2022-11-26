import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (context === undefined)
    // if component is outside context provider scope
    {
        throw new Error('useAuthContext() must b under AuthContextProvider')
    }
    return context
}

export default useAuthContext;