import { useContext, createContext, useState, useEffect } from 'react'
import {Navigate} from 'react-router-dom'

export const AuthContext = createContext({})

export function AuthProvider({children}){
    const [user,setUser] = useState();

    return <AuthContext.Provider value={{ user,setUser }}>{children}</AuthContext.Provider>
}

export function AuthGuard({children}){
    const auth = useContext(AuthContext)

    if(!auth.user) return <Navigate to='/login'/>

    return <>{children}</>
}