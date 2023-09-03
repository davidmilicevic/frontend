import { HranaContext } from "../context/HranaContext"
import { useContext } from "react"

export const useHranaContext = () => {
    const context = useContext(HranaContext)

    if (!context) {
        throw Error('useHranaContext mora biti koristen unutar HranaContextProvider')
    }

    return context
}