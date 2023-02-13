import Button from "../form/Button";
import Input from "../form/Input";
import { useState,useEffect } from "react";
import { useAuth, useAxios } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const auth = useAuth()
    const axios = useAxios()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    function handleChange(e) {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleClick(e) {
        e.preventDefault()
        axios.post('/auth/login', user).then(res => {
            auth.setUser(res.data)
            navigate('/')
        })
    }


    return (
        <div>
            <form action="" className="mx-auto" >
                <label>Username</label>
                <Input type="text" name="username" onChange={handleChange} />
                <label >Password</label>
                <Input type="password" name="password" onChange={handleChange} />
                <Button text="Login" color="btn btn-primary" onClick={handleClick} />
            </form>
        </div>
    )
}