import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { removeAuth } from "../store/authSlice"
import { Navigate } from "react-router-dom"

function Logout() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(removeAuth())
    localStorage.clear()
  }, [])
   
  return (
    <Navigate to="/" />
  )
}

export default Logout