import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MasterLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default MasterLayout;
