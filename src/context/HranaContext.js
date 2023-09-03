import { createContext, useReducer } from 'react'

export const HranaContext = createContext()

export const hranaReducer = (state, action) => {
    switch (action.type) {
        case 'SET_HRANA':
            return {
                hrana: action.payload
            }
        case 'CREATE_NAMIRNICE':
            return {
                hrana: [action.payload, ...state.hrana]
            }
        case 'DELETE_NAMIRNICE':
            return {
                hrana: state.hrana.filter((h) => h._id !== action.payload._id)
            }
            default:
                return state
    }
}

export const HranaContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(hranaReducer, {
        hrana: null
    })

   

    return(
        <HranaContext.Provider value={{...state, dispatch}}>
            { children }
        </HranaContext.Provider>
    )
}