import Button from "../components/form/Button";
import Input from "../components/form/Input";
import { useState } from "react";
import { useAuth, useAxios } from "../hooks";
import { useNavigate } from "react-router-dom";
import { AuthGuest } from "../Auth";

export default function Login() {
    const axios = useAxios()
    const auth = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [alert, setAlert] = useState("")

    function handleChange(e) {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleClick(e) {
        e.preventDefault()
        axios.post('/auth/login', user).then(res => {
            localStorage.setItem('token', res.data.token)
            auth.load()
            setTimeout(() => {
                navigate('/')
            },1000)
        })
    }

    return (
        <AuthGuest>
            <form action="" className="content-center container" >
                <label>Username</label>
                <Input type="text" name="username" onChange={handleChange} />
                <label >Password</label>
                <Input type="password" name="password" onChange={handleChange} />
                {auth.alert &&
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <div>
                            An example danger alert with an icon
                        </div>
                    </div>
                }
                <Button text="Login" color="btn btn-primary" onClick={handleClick} />
            </form>
        </AuthGuest>
    )
}