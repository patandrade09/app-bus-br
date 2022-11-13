import React from 'react'
import { useState } from 'react'
import api from '../api';
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("")
    const navigate = useNavigate()
    const handleEmail = (e) => {
        setEmail(
            e.target.value
        )
    }

    const handlePassword = (e) => {
        setPassword(
            e.target.value
        )
    }

    const loginUser = async () => {
        try {        
            const response = await api.post("//localhost:5000/login", {
                email,
                password
            })
          console.log(response.data.message);
          navigate("/")
        
        } catch (error) {
            alert("Invalid Credentials")
        }
    }

    return (
      <>
        <div>
          <h1>Log into your account</h1>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '25rem',
            }}>
            <label>E-mail</label>
            <input type="text" value={email} onChange={handleEmail} />
            <label>Password</label>
            <input type="password" value={password} onChange={handlePassword} />
            <button style={{cursor:"pointer"}}type="button" onClick={() => loginUser()}>
              Login
            </button>
          </form>
        </div>
      </>
    );
}

export default LoginPage