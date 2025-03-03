import { Drawer, Popover } from "@mui/material";
import {
  ChevronDown,
  CircleUserRound,
  LogOut,
  Menu,
  Ticket,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReduxState } from "../utils/types";

function Navbar() {
  const user = useSelector((state: ReduxState) => state.auth.user);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const handleClose = () => setIsUserMenuOpen(false);

  const handleProfileClick = (event: any) => {
    setAnchorEl(event.target);
    setIsUserMenuOpen(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => setIsSidebarOpen(false);

  return (
    <>
      <div className="flex items-center justify-between border-b p-3 border-black">
        <Link to={"/"}>
          <p className="text-3xl">
            Event<span className="text-blue-500">Park</span>
          </p>
        </Link>
        {user && (
          <div
            className="md:flex items-center content-center cursor-pointer hidden"
            onClick={handleProfileClick}
          >
            <CircleUserRound size={32} className=" me-2" />
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <ChevronDown size={20} />
          </div>
        )}
        <Popover
          open={isUserMenuOpen}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          className="mt-4"
        >
          <div className="px-4 py-2 flex flex-col gap-3">
            <Link
              to={"/my-tickets"}
              className="flex gap-4 items-cente"
              onClick={handleClose}
            >
              <Ticket />
              My tickets
            </Link>
            <hr />
            <Link
              to={"/logout"}
              className=" flex gap-4 items-center text-red-500"
              onClick={handleClose}
            >
              <LogOut color="#fb2c36" />
              Logout
            </Link>
          </div>
        </Popover>
        <Menu onClick={toggleSidebar} className="cursor-pointer md:hidden" />

        <Drawer
          open={isSidebarOpen}
          anchor="right"
          onClose={handleSidebarClose}
        >
          <Link to={"/my-tickets"}>MY tickets</Link>
        </Drawer>

        {!user && (
          <div>
            <Link
              to={"/auth/login"}
              className="bg-blue-500 p-3 text-white px-6 rounded-md"
            >
              Login
            </Link>
            <Link
              to={"/auth/signup"}
              className=" ms-4 border border-blue-500 p-3 px-6 rounded-md "
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
