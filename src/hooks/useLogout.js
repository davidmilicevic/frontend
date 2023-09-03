import { useAuthContext  } from "./useAuthContext"
import { useHranaContext } from "./useHranaContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: HranaDispatch } = useHranaContext()


        // brisanje usera iz localstoragea          
    const logout = () => {
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        HranaDispatch({type: 'SET_HRANA', payload: null})
    }

    return {logout}

}