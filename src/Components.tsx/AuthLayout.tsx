import { useEffect } from 'react'
import {  Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

function AuthLayout() {
  const {userId} = useAuth()
  
  const navigate = useNavigate()
  useEffect(() => {
      if(userId)
        navigate('/')
  }, [userId])

  return (
    <>
    <Outlet/>
    </>
  )
}

export default AuthLayout