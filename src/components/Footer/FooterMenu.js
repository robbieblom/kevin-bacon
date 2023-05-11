import { Typography } from "@mui/material";
import * as React from "react";

export const FooterMenu = ({
  menuTitle,
  menuItems,
  styleWithPeriod = false,
}) => {
  return (
    <>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        sx={{
          marginTop: "0px",
          display: "inline-block",
          borderBottom: "2px solid #333",
        }}
      >
        {menuTitle}
      </Typography>
      <ul>
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <a
                href={item.path}
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                {item.text}
                {styleWithPeriod && <span>.</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};
