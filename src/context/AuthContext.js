import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";


export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })
    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged(user => {
            dispatch({ type: 'AUTH_IS_READY', payload: user })
            unsub()
        })
    }, [])
    // console user everytime user state update
    console.log('AuthContext State:', state);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
    )


}


// const themeReducer = (state, action) => {
//     switch (action.type) {
//         case 'CHANGE_COLOR':
//             return { ...state, color: action.payload }
//         default:
//             return state
//     }

// }

// export function ThemeProvider({ children }) {
//     //can use custom logic to increase flexibility
//     const [state, dispatch] = useReducer(themeReducer, {
//         color: 'blue'
//     })
//     const changeColor = (color) => {
//         dispatch({ type: 'CHANGE_COLOR', payload: color })
//     }
//     return (
//         // <ThemeContext.Provider value={{ color: 'blue' }}>{children}</ThemeContext.Provider>
//         <ThemeContext.Provider value={{ ...state, changeColor }}>{children}</ThemeContext.Provider>
//     )
// }