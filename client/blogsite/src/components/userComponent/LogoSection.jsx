import React, { useState } from "react";
import Logo from "../../assets/Images/blogsiteLogo.png";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { userData } from "../../context/UserDataContext";

export default function LogoSection() {
  const navigate = useNavigate();
  const { logout } = userData();
  const [getItem, setGetitem] = useState(() => {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  });
  const name =
    getItem &&
    getItem?.name.split(" ").map((name) => name.split("").slice(0, 1));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    logout();
    setGetitem(null);
  };

  const handleSignIn = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="bg-[#262A2E] w-full py-[19px]">
      {/* Top section with support, logo, sign in */}
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-[19px] px-4">
        {/* Left button */}
        <button className="py-2 px-6 sm:py-3 sm:px-16 rounded-full bg-[#151819] text-white text-sm sm:text-base w-full sm:w-auto">
          <span className="bg-[#ff006b] w-[10px] h-[10px] inline-block mr-2 rounded-full"></span>
          SUPPORT
        </button>

        {/* Logo */}
        <div className="flex justify-center w-full sm:w-auto">
          <button onClick={() => navigate('/user')}>
            <img src={Logo} alt="logo" className="h-10 sm:h-12" />
          </button>
        </div>

        {/* Right button */}
        {getItem && getItem ? (
          <div className="flex gap-1.5 items-center justify-center">
            {name && (
              <div className="px-4 py-2 bg-amber-100 text-black rounded-2xl font-semibold uppercase">
                <p>{name}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="py-2 px-6 sm:py-3 sm:px-16 rounded-full bg-[#ff006b] text-white text-sm sm:text-base w-full sm:w-auto"
            >
              logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="py-2 px-6 sm:py-3 sm:px-16 rounded-full bg-[#ff006b] text-white text-sm sm:text-base w-full sm:w-auto"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Navbar below */}
      <Navbar />
    </div>
  );
}
