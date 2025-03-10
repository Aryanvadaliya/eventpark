import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeAuth } from "../store/authSlice";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);

  return <Navigate to="/" />;
}

export default Logout;
