import axios from 'axios';
import { createContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './hooks';


export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoad] = useState(true)
    const [alert, setAlert] = useState("")

    function load() {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:8000/api/auth', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setUser(res.data.employe)
        }).catch((err) => {
            setUser(undefined)
            setAlert("Login Failed")
        }).finally(() => setLoad(false))
    }

    useEffect(() => {
        load()
    }, [])

    if (loading) return <h1 className='content-center align-items-center'>Loading</h1>

    return <AuthContext.Provider value={{ user, setUser, load, alert }}>{children}</AuthContext.Provider>
}

export function AuthGuard({ children }) {
    const auth = useAuth()
    if (!auth.user) return <Navigate to='/login' />

    return <>{children}</>
}

export function AuthGuest({children}){
    const auth = useAuth()
    if(auth.user) return <Navigate to='/' />

    return <>{children}</>
}