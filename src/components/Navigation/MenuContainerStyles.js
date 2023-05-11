import { styled } from "@mui/material/styles";

export const MenuContainerStyles = styled("div")(({ theme }) => {
  const css = `
  .menu {
    background-color: #000;
    width: ${theme.custom.navMenuWidth};
    transform: translateX(calc(${theme.custom.navMenuWidth} * -1));
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 90;
    padding: 30px ${theme.custom.navBorderSpacing};
    display: flex;
    align-items: center;
  }
`;
  return css;
});
