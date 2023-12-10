import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="flex items-center justify-between px-6   " >

            <Link to="/" className=' text-center' >
                <h1 className=' text-blue-700 text-3xl font-medium'>accredian</h1>
                <p className=' text-gray-400 text-xs'>credentials that matter</p>
            </Link>
            <div>
                <Button>
                    <Link to="/">Login</Link>
                </Button>
                <Button variant='contained' >
                    <Link to="/register">Sign up</Link>
                </Button>
            </div>


        </header>
    )
}

export default Header