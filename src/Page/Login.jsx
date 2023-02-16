import Button from "../components/form/Button";
import Input from "../components/form/Input";
import { useState } from "react";
import { useAxios } from "../hooks";
import { useNavigate } from "react-router-dom";

export default function Login() {
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
            window.localStorage.setItem('token', JSON.stringify(res.data))
            navigate('/')
        })
    }

    const token = JSON.parse(localStorage.getItem('token'))
    return (
        <div>
            <form action="" className="mx-auto" >
                <label>Username</label>
                <Input type="text" name="username" onChange={handleChange} />
                <label >Password</label>
                <Input type="password" name="password" onChange={handleChange} />
                {token?.message ? <div className="alert alert-danger">{token?.message}</div> : ''}
                <Button text="Login" color="btn btn-primary" onClick={handleClick} />
            </form>
        </div>
    )
}