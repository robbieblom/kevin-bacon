import { motion } from "framer-motion";
import React from "react";
import { barOneVariants, barThreeVariants, barTwoVariants } from "./NavAnim";
import { HamburgerStyles, LogoStyles, NavBarStyles } from "./NavBarStyles";

const NavBar = ({ menuOpen, toggleMenu }) => {
  const title = "ByteTheory Innovations";

  const NavBarContent = (
    <div className="container">
      <HamburgerStyles
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        onClick={toggleMenu}
        onKeyDown={toggleMenu}
        aria-label={menuOpen ? "Close Menu" : "Open Menu"}
        className={menuOpen ? " open" : ""}
      >
        <motion.span className="bar" variants={barOneVariants}></motion.span>
        <motion.span className="bar" variants={barTwoVariants}></motion.span>
        <motion.span className="bar" variants={barThreeVariants}></motion.span>
      </HamburgerStyles>

      <LogoStyles>
        <a to="/">
          {title}
          <span>.</span>
        </a>
      </LogoStyles>
    </div>
  );

  const NavBarWithMenuOpenStyles = (
    <NavBarStyles>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          width: "100%",
        }}
      >
        {NavBarContent}
      </div>
    </NavBarStyles>
  );

  const NavBarWithMenuClosedStyles = (
    <NavBarStyles>{NavBarContent}</NavBarStyles>
  );

  if (menuOpen) {
    return <>{NavBarWithMenuOpenStyles}</>;
  } else {
    return <>{NavBarWithMenuClosedStyles}</>;
  }
};

export default NavBar;
