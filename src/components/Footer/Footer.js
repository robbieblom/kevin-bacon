import * as React from "react";
import {
  FaFacebookSquare as Facebook,
  FaLinkedin as Linkedin,
  FaTwitterSquare as Twitter,
} from "react-icons/fa";
import { FooterMenu } from "./FooterMenu";
import { StyledDivForFooterMenu } from "./StyledDivForFooterMenu";
import { StyledHTMLFooter } from "./StyledHTMLFooter";

export const Footer = () => {
  const linksMenuItems = [
    {
      path: "/",
      text: "home",
    },
    {
      path: "/products",
      text: "projects",
    },
    {
      path: "/contact",
      text: "contact",
    },
  ];

  const followMenuItems = [
    {
      path: "https://www.twitter.com/bytetheoryinno",
      text: <Twitter size={25} />,
    },
    {
      path: "https://www.facebook.com/bytetheory-innovations",
      text: <Facebook size={25} />,
    },
    {
      path: "https://www.linkedin.com/in/bytetheory-innovations",
      text: <Linkedin size={25} />,
    },
  ];
  return (
    <StyledHTMLFooter style={{ marginBottom: 0 }} className="section">
      <div className="container container__tight flex-container">
        <StyledDivForFooterMenu className="footer__menu">
          <FooterMenu
            menuTitle="Links"
            menuItems={linksMenuItems}
            styleWithPeriod
          />
        </StyledDivForFooterMenu>

        <StyledDivForFooterMenu className="footer__menu social__menu">
          <FooterMenu
            menuTitle={"Follow ByteTheory Innovations"}
            menuItems={followMenuItems}
          />
        </StyledDivForFooterMenu>
      </div>
    </StyledHTMLFooter>
  );
};
