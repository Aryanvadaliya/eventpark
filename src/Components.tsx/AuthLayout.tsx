import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {  Outlet, useNavigate } from 'react-router-dom'
import { ReduxState } from '../utils/types';
import { useAuth } from '../hooks/AuthContext';

function AuthLayout() {
  const {currentUser} = useAuth()
  
  const navigate = useNavigate()
  useEffect(() => {
      if(currentUser)
        navigate('/')
  }, [currentUser])

  return (
    <>
    <Outlet/>
    </>
  )
}

export default AuthLayout