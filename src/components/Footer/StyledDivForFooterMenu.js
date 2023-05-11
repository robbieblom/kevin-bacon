import { styled } from "@mui/material/styles";

export const StyledDivForFooterMenu = styled("div")(({ theme }) => {
  const css = `
    @media (min-width: 768px) {
      flex-grow: 1;
      width: 33.333%;
    }

    a {
      color: ${theme.palette.primary.contrastText};
      text-decoration: none;
    }

    ul {
      margin-bottom: ${theme.custom.footerGap};

      @media (min-width: 768px) {
        display: flex;
        flex-direction: column;
      }
    }

    li {
      margin-top: 5px;
      margin-bottom: 5px;

      a {
        color: ${theme.palette.text.secondary};
        text-decoration: none;
        text-transform: capitalize;
        font-weight: 700;

        span {
          color: ${theme.palette.primary.main};
        }
      }

      &:hover,
      &:focus {
        a {
          color: ${theme.palette.primary.main};
        }
      }
    }

    &.social__menu {

      ul {
        display: flex;

        @media (min-width: 768px) {
          flex-direction: row;
        }

        li {
          margin-right: 8px;

          @media (min-width: 768px) {
            margin-left: 5px;
            margin-right: 5px;
          }

          a {
            color: ${theme.palette.primary.main};
          }

          &:hover,
          &:focus {
            a {
              color: ${theme.palette.primary.contrastText};
            }
          }
        }
      }
    }
  `;
  return css;
});
