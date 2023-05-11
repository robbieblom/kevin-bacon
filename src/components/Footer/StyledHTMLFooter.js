import { styled } from "@mui/material/styles";

export const StyledHTMLFooter = styled("footer")(
  ({ theme }) =>
    `
  &.section {
    padding: ${theme.custom.footerGap} 0 0 0;

    .container {
      display: flex;
      flex-direction: column;
      gap: ${theme.custom.footerGap};

      @media (min-width: 768px) {
        align-items: flex-start;
        flex-direction: row;
      }

      @media (min-width: 1200px) {
        gap: calc(${theme.custom.footerGap}*2);
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: calc(${theme.custom.footerGap}/3) 0 0 0;
      li {
        a {
          transition: color 0.3s ease;
        }
      }
    }
  }
`
);
