import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { MenuContainerStyles } from "./MenuContainerStyles";
import { MenuListStyles } from "./MenuListStyles";
import { menuList } from "./NavAnim";
import { menuItems } from "./NavConstants";

const Menu = ({ menuOpen, toggleMenu }) => {
  return (
    <>
      <MenuContainerStyles>
        <motion.div
          initial="closed"
          animate={menuOpen ? "open" : "closed"}
          variants={menuList}
          transition={{ type: "ease", stiffness: 50, velocity: 50 }}
          className="menu"
        >
          <MenuListStyles>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  onClick={toggleMenu}
                  onKeyDown={toggleMenu}
                  to={item.path}
                  className="menu__item--active"
                >
                  <Typography variant="h2">
                    {item.text}
                    <span>.</span>
                  </Typography>
                </a>
              </li>
            ))}
          </MenuListStyles>
        </motion.div>
      </MenuContainerStyles>
    </>
  );
};

export default Menu;
