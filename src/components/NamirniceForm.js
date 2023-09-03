import { useState } from 'react'
import { useHranaContext } from '../hooks/useHranaContext'
import { useAuthContext } from '../hooks/useAuthContext'

const NamirniceForm = () => {
    const {dispatch} = useHranaContext()
    const {user} = useAuthContext()
    
    const [naziv, setNaziv] = useState('')
    const [kolicina, setKolicina] = useState('')
    const [kalorije, setKalorije] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('Morate biti ulogirani')
            return
        }

        const namirnice = {naziv, kolicina, kalorije}

        const response = await fetch('/api/hrana', {
            method: 'POST', 
            body: JSON.stringify(namirnice),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setNaziv('')
            setKolicina('')
            setKalorije('')
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_NAMIRNICE', payload: json})
        }
    }

     return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Dodaj novu namirnicu</h3>

            <label>Naziv Namirnice:</label>
            <input
             type="text"
             onChange={(e) => setNaziv(e.target.value)}
             value={naziv}
             className={emptyFields.includes('naziv') ? 'error' : ''}
             />

            <label>Kolicina Namirnice (gram):</label>
            <input
             type="number"
             onChange={(e) => setKolicina(e.target.value)}
             value={kolicina}
             className={emptyFields.includes('kolicina') ? 'error' : ''}
             />

            <label>Broj Kalorija (kcal):</label>
            <input
             type="number"
             onChange={(e) => setKalorije(e.target.value)}
             value={kalorije}
             className={emptyFields.includes('kalorije') ? 'error' : ''}
             />

             <button>Dodaj Namirnicu</button>
             {error && <div className="error">{error}</div>}
        </form>
     )
} 

export default NamirniceForm
