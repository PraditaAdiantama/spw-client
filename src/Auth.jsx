import { createContext, useState } from 'react'
import { Navigate } from 'react-router-dom'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState();

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export function AuthGuard({ children }) {
    const token = JSON.parse(window.localStorage.getItem('token'))

    if (!token || token?.message) return <Navigate to='/login' />

    return <>{children}</>
}