import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

export const NavBarStyles = styled("nav")(({ theme }) => {
  const css = `
  .container {
    padding-top: 10px;
    padding-bottom: 10px;

    @media (min-width: 1024px) {
      padding-top: 30px;
      padding-bottom: 20px;
    }

    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
`;
  return css;
});

export const HamburgerStyles = styled(motion.button)(({ theme }) => {
  const css = `
  background-color: transparent;
  border: none;
  width: 30px;
  height: 30px;
  padding: 0;
  cursor: pointer;
  outline: none;

  &:focus {
    border: none;
    outline: none;
  }

  .bar {
    display: block;
    background-color: #fff;
    height: 2px;
    border-radius: 2px;

    &:nth-of-type(2) {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
`;
  return css;
});

export const LogoStyles = styled("div")(({ theme }) => {
  const css = `
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.5px;

  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    font-size: 25px;
  }

  span {
    color: ${theme.palette.primary.main};
  }

  &:hover,
  &:focus {
    a {
      color: ${theme.palette.primary.main};
    }
  }
`;
  return css;
});
