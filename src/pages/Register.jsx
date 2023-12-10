import React, { useState } from 'react'
import { Button, Container, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Home from './Home';
import axios from 'axios';
function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [errors, setErrors] = useState("");

    const navigate = useNavigate()


    const isFormValidated = () => {

        let isValid = true;

        // Password validation
        if (!password || password.length < 4) {
            setErrors('Password must be at least 4 characters long');
            isValid = false;
        }


        // Confirm Password validation
        if (password !== confirmPassword) {
            setErrors('Passwords do not match');
            isValid = false;
        }


        return isValid;
    }

    const onSignUp = async (e) => {
        e.preventDefault()


        try {
            if (isFormValidated()) {
                const data = {
                    email: email,
                    password: password,
                    username: username,
                    firstname: firstname,
                    lastname: lastname
                }
                toast("Successfully signed up !", {
                    style: {
                        backgroundColor: 'blue',
                        color: 'white',
                    },
                })
                await axios.post("http://localhost:4000/auth/register", data, { withCredentials: true })
                navigate("/")
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
            })
        }
    }

    return (

        <Home>
            <div className=' w-full flex justify-center h-screen mt-10'>
                <div className="flex md:w-1/3 ">
                    <Container>
                        <div className=' text-center'>
                            <h1 className=' text-blue-700 text-3xl font-medium'>accredian</h1>
                            <p className=' text-gray-400 text-xs'>credentials that matter</p>
                        </div>
                        <div >
                            <Typography variant="h4" gutterBottom className=" font-bold">
                                Sign up
                            </Typography>
                            <form onSubmit={onSignUp} >
                                <TextField
                                    required
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    name="email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className={" text-white font-normal"}
                                />
                                <TextField
                                    required
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    name="username"
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
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
                                <TextField
                                    required
                                    label="Confirm password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    name="confirm password"
                                    type="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    className={" font-normal"}
                                />
                                <div className=' flex flex-col md:flex-row gap-x-4'>
                                    <TextField
                                        label="First Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        name="firstname"
                                        type="text"
                                        onChange={(e) => setFirstname(e.target.value)}
                                        value={firstname}
                                        className={" font-normal"}
                                    />
                                    <TextField
                                        label="Last Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        name="lastname"
                                        type="text"
                                        onChange={(e) => setLastname(e.target.value)}
                                        value={lastname}
                                        className={" font-normal"}
                                    />
                                </div>

                                <Button type='submit' variant="contained" className=' bg-blue-700 rounded-none' >
                                    Submit
                                </Button>
                            </form>
                        </div>
                        <p className=' py-6 text-center'>Already have an account ? <Link to="/" className=' text-blue-700 hover:underline' > Click here to Login</Link> </p>
                    </Container>

                </div>
            </div>
        </Home>
    )
}

export default Register