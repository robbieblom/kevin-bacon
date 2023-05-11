import { styled } from "@mui/material/styles";

export const MenuListStyles = styled("ul")(({ theme }) => {
  const css = `
    list-style: none;
    padding: 0;
    margin: 0;

    > li,
    > li > button {
      text-transform: capitalize;
      font-size: ${theme.typography.h2.fontSize};
      font-weight: 700;
      cursor: pointer;
      transition: color 0.3s ease;

      a {
        text-decoration: none;
        color: #fff;
      }

      span {
        color: ${theme.palette.primary.main};
      }

      &:hover {
        color: ${theme.palette.primary.main};
        > a {
          color: ${theme.palette.primary.main};
        }
      }
    }

    > li {
      &.open {
        > button > svg {
          transform: rotate(180deg);
        }
      }
    }

    > li > button {
      background-color: transparent;
      padding: 0;
      color: #fff;
      border: none;
      font-family: "Heebo", sans-serif;
      display: flex;
      align-items: center;
    }

    > li > button > svg {
      font-size: 22px;
      margin-left: 6px;
      color: ${theme.palette.primary.main};
      transition: transform 0.3s ease;

      @media (min-width: 768px) {
        font-size: 26px;
      }

      @media (min-width: 1024px) {
        font-size: 30px;
      }
    }
  `;
  return css;
});
