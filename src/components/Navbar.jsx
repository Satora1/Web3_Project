import React, { useState, useEffect } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../images/logo.png";
import Login from "./For_Account/Login";
import 'bootstrap/dist/css/bootstrap.min.css'

const NavBarItem = ({ title, classprops, onClickHandler }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`} onClick={onClickHandler}>
    {title}
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPopup && !event.target.closest(".popup")) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const scrollToMarket = () => {
    console.log("Scrolling to Market");
    const element = document.getElementById("Market");
    element.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const scrollToWallet = () => {
    const element = document.getElementById("Wallet");
    element.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const scrollToTutorials = () => {
    const element = document.getElementById("Tutorials");
    element.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <div>
      <nav className="w-full flex md:justify-center justify-between items-center p-4">
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </div>
        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          <NavBarItem title="Market" onClickHandler={scrollToMarket} classprops="my-2 text-lg" />
          <NavBarItem title="Exchange" />
          <NavBarItem title="Tutorials" onClickHandler={scrollToTutorials} classprops="my-2 text-lg" />
          <NavBarItem title="Wallets" onClickHandler={scrollToWallet} classprops="my-2 text-lg" />
          <NavBarItem title="Login" onClickHandler={handleOpenPopup} classprops="my-2 text-lg" />
        </ul>
        <div className="flex relative">
          {toggleMenu ? (
            <AiOutlineClose
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <HiMenuAlt4
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list:none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in
          ">
              <li className="text-xl w-full my-2">
                <AiOutlineClose onClick={() => setToggleMenu(false)} />
              </li>
              <NavBarItem title="Market" onClickHandler={scrollToMarket} classprops="my-2 text-lg" />
              <NavBarItem title="Exchange" />
              <NavBarItem title="Tutorials" onClickHandler={scrollToTutorials} classprops="my-2 text-lg" />
              <NavBarItem title="Wallets" onClickHandler={scrollToWallet} classprops="my-2 text-lg" />
              <NavBarItem title="Login" onClickHandler={handleOpenPopup} classprops="my-2 text-lg" />

            </ul>
          )}
        </div>
      </nav>
      {showPopup && (
  <Login/>
      )}

    </div>
  );
};

export default Navbar;
