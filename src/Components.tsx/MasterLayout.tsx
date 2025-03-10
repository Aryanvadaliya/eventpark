import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import { CircularProgress } from "@mui/material";

function MasterLayout() {
  const { currentUser } = useAuth();
  const userId = JSON.parse(localStorage.getItem("userId")) || null;

  if (userId && !currentUser)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default MasterLayout;
