import { useReducer, useEffect, useState } from "react"
import { projectFirestore, timeStamp } from "../firebase/config"

const initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}
const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { document: null, isPending: true, error: null, success: false }
        case 'ADDED_DOC':
            return { document: action.payload, isPending: false, error: null, success: true }
        case 'ERROR':
            return { document: null, isPending: false, error: action.payload, success: false }
        default:
            return state
    }
}

const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // colection ref
    const ref = projectFirestore.collection(collection)

    // only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }
    //    add document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            const createdAt = timeStamp.fromDate(new Date())
            const addedDoc = await ref.add({ ...doc, createdAt })
            dispatchIfNotCancelled({ type: 'ADDED_DOC', payload: addedDoc })
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }
    // delete document
    const delDocument = async (id) => {

    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    return { addDocument, delDocument, response }
}

export default useFirestore;