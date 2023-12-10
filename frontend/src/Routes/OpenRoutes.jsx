import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import DisplayPage from '../Pages/NonAuthPages/DisplayPage'
import LoginPage from '../Pages/NonAuthPages/LoginPage'
import DisplayPageNavbar from '../Components/DisplayPageNavbar'
import SignUpPage from '../Pages/NonAuthPages/SignUpPage'

function OpenRoutes() {
    return (
        <>
            <DisplayPageNavbar />
            <Routes>
                <Route path="/" element={<DisplayPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path='*' element={<Navigate to={'/'} />} />
            </Routes>
        </>
    )
}

export default OpenRoutes