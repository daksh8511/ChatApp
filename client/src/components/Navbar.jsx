import React from "react";
import useAuth from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { MessageSquare, Bolt, User, LogOut, Home } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuth();


  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 ">
        <div className="flex items-center justify-between h-full ">
          <Link
            to={"/"}
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">ChatApp</h2>
          </Link>

          <div className="flex items-center gap-2">
            
            <Link
              to={"/setting"}
              className={`btn btn-sm gap-2 transition-colors`}
            >
              <Bolt className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className={`btn btn-sm gap-2 transition-colors`}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{authUser.fullName}</span>
                </Link>
                <Link
                  to={"/signup"}
                  className={`btn btn-sm gap-2 transition-colors`}
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
