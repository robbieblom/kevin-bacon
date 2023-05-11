import React, { useState } from "react";
import Menu from "./Menu";
import NavBar from "./NavBar";

const NavModule = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((menuOpen) => !menuOpen);
  };

  return (
    <>
      <NavBar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default NavModule;
