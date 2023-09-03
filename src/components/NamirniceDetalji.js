import { useHranaContext } from '../hooks/useHranaContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const NamirniceDetalji = ({ namirnice }) => {
    const { dispatch } = useHranaContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if(!user){
            return
        }
        const response = await fetch('/api/hrana/' + namirnice._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_NAMIRNICE', payload: json})
        }
    }

    return (
        <div className = "namirnice-detalji">
            <h4>{namirnice.naziv}</h4>
            <p><strong>Kolicina (gram): </strong>{namirnice.kolicina}</p>
            <p><strong>Kalorije (kcal): </strong>{namirnice.kalorije}</p>
            <p>{formatDistanceToNow(new Date(namirnice.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined"onClick={handleClick}>delete</span>
        </div>
    )
}

export default NamirniceDetalji