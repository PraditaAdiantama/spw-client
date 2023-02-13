import axios from 'axios'
import { AuthContext } from './Auth'
import { useContext } from 'react'

export function useAuth(){
    return useContext(AuthContext)
}

export function useAxios(){
    return axios.create({baseURL: 'http://127.0.0.1:8000/api'})
}