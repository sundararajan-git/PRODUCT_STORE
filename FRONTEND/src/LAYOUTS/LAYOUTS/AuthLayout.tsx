import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../COMPONETS/Header'

const AuthLayout = () => {
    return (
        <div className='flex flex-col min-h-screen max-h-full dark:bg-dark'>
            <Header />
            <Outlet />
        </div>
    )
}

export default AuthLayout