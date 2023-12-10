import React, { useState } from 'react'
import { Button, Container, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {

    // states for storing email and password 
    const [usernameOrEmail, setEmailOrUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("");
    const navigate = useNavigate()

    const isFormValidated = () => {

        let isValid = true;

        // Password validation
        if (password === "" || password.length < 4) {
            setErrors('Password must be at least 4 characters long');
            isValid = false;
        }

        return isValid;
    }

    const onLogin = async (e) => {
        e.preventDefault()

        try {
            if (isFormValidated()) {
                const data = {
                    usernameOrEmail: usernameOrEmail,
                    password: password
                }
                const response = await axios.post("http://localhost:4000/auth/login", data, { withCredentials: true })
                toast("successfully logged in", {
                    style: {
                        backgroundColor: 'blue',
                        color: 'white',
                    },
                })
                window.localStorage.setItem("userId", response.data.username)
                navigate("/dashboard")
            }
            else {
                toast(errors, {
                    style: {
                        backgroundColor: 'blue',
                        color: 'white',
                    },
                })
            }
        } catch (error) {
            toast(error.response.data.message, {
                style: {
                    backgroundColor: 'blue',
                    color: 'white',
                },
            });
        }
    }



    // 

    return (
        <Home>
            <div className=' w-full flex justify-center h-screen mt-20'>
                <div className="flex md:w-1/3 ">
                    <Container>
                        <div className=' text-center'>
                            <h1 className=' text-blue-700 text-3xl font-medium'>accredian</h1>
                            <p className=' text-gray-400 text-xs'>credentials that matter</p>
                        </div>
                        <div className=' mt-10'>
                            <Typography variant="h4" gutterBottom className=" font-bold">
                                Login
                            </Typography>
                            <form onSubmit={onLogin} >
                                <TextField
                                    required
                                    label="Email or Username"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    name="email"
                                    type="text"
                                    onChange={(e) => setEmailOrUsername(e.target.value)}
                                    value={usernameOrEmail}
                                    className={" text-white font-normal"}
                                />
                                <TextField
                                    required
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    name="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className={" font-normal"}
                                />

                                <Button type='submit' variant="contained" className=' bg-blue-700 rounded-none' >
                                    Login
                                </Button>
                            </form>
                        </div>
                        <p className=' py-6 text-center'>Don't have an account ? <Link to="/register" className=' text-blue-700 hover:underline' > Click here to Signup</Link> </p>
                    </Container>

                </div>
            </div>
        </Home>
    )
}

export default Login