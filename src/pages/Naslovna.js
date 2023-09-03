import { useEffect } from 'react'
import { useHranaContext } from "../hooks/useHranaContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import NamirniceDetalji from '../components/NamirniceDetalji'
import NamirniceForm from '../components/NamirniceForm'

const Naslovna = () => {
    const {hrana, dispatch} = useHranaContext()
    const {user} = useAuthContext()

    useEffect(()  => {
        const fetchHrana = async () => {
            const response = await fetch('/api/hrana', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_HRANA', payload: json})
            }
        }

        if (user) {
            fetchHrana()
        }

    }, [dispatch, user])

    return (
        <div className="naslovna">
            <div className="hrana">
                {hrana && hrana.map((namirnice) => (
                    <NamirniceDetalji key={namirnice._id} namirnice={namirnice}  />
                ))}
            </div>
            <NamirniceForm />
        </div>

    )
}
export default Naslovna