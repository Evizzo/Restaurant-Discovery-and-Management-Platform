import { useState } from "react";
import Button from "../layouts/Button";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../api/AuthContex";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const authContext = useAuth();

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const handleLogout = () => {
    authContext.logout();
    closeMenu();
  };

  return (
    <div className="fixed w-full z-20">
      <div>
        <div className="flex flex-row justify-between p-5 lg:px-32 px-5 bg-gradient-to-r from-[#D1A373] to-[#8B5A2B] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-row items-center cursor-pointer gap-2">
            <Link to="/">
              <img
                src="/assets/logo-removebg-preview.png"
                alt="Logo"
                className="h-8 w-auto sm:h-10"
              />
            </Link>
          </div>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8 justify-center">
            <Link
              to="/"
              className="hover:text-[#E2B97F] transition-all cursor-pointer"
            >
              Početna
            </Link>
            <Link
              to="/search"
              className="hover:text-[#E2B97F] transition-all cursor-pointer"
            >
              Pretraži
            </Link>
            {/* <Link
              to="/events"
              className="hover:text-[#E2B97F] transition-all cursor-pointer"
            >
              Događaji
            </Link> */}
            {authContext.isAuthenticated &&
            <Link
              to="/current-user"
              className="hover:text-[#E2B97F] transition-all cursor-pointer"
            >
              Profil
          </Link>}
          <Link
            to="/about"
            className="hover:text-[#E2B97F] transition-all cursor-pointer"
          >
            O sajtu
          </Link>
          </nav>

          {!authContext.isAuthenticated && (
            <div className="hidden lg:flex justify-center">
              <Link to="/login">
                <Button title="Prijavi se" />
              </Link>
            </div>
          )}
          
          {authContext.isAuthenticated && (
            <div className="hidden lg:flex justify-end items-center gap-4 mr-4" onClick={authContext.logout}>
              <Link to="/">
                <Button title="Odjavi se" />
              </Link>
            </div>
          )}


          <div className="md:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={` ${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-black text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link
            to="/"
            className="hover:text-[#E2B97F] transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Početna
          </Link>
          <Link
            to="/search"
            className="hover:text-[#E2B97F] transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Pretraži
          </Link>
          {/* <Link
            to="/events"
            className="hover:text-[#E2B97F] transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Događaji
          </Link> */}
          {authContext.isAuthenticated &&
          <Link
            to="/current-user"
            className="hover:text-[#E2B97F] transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Profil
          </Link>}
          <Link
            to="/about"
            className="hover:text-[#E2B97F] transition-all cursor-pointer"
            onClick={closeMenu}
          >
            O nama
          </Link>

          {!authContext.isAuthenticated && (
            <Link to="/login" onClick={closeMenu}>
              <Button title="Prijavi se" />
            </Link>
          )}

          {authContext.isAuthenticated && (
            <Link to="/" onClick={handleLogout}>
              <Button title="Odjavi se" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
