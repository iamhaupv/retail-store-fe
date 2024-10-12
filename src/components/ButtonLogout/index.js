import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ButtonLogout() {
    const navigate = useNavigate()
    const handleLogout = async()=> {
        try {
            localStorage.clear()
            navigate("/signin")
        } catch (error) {
            throw new Error(error)
        }
    }
  return (
    <>
        <button onClick={handleLogout} className='btn'>Đăng xuất</button>
    </>
  )
}
