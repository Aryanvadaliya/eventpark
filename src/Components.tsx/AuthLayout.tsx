import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {  Outlet, useNavigate } from 'react-router-dom'

function AuthLayout() {
  const user = useSelector(state => state.auth.user)
  console.log(user);
  
  const navigate = useNavigate()
  useEffect(() => {
      if(user)
        navigate('/')
  }, [user])

  return (
    <>
    <Outlet/>
    </>
  )
}

export default AuthLayout