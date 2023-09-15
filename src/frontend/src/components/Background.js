import { useTheme } from "@bytetheoryinnovations/bytetheory-ui-library/react";
import { Box, styled } from "@mui/material";
import React from "react";
import MovieCrop from "../../assets/movie-crop.jpg";
import { _hexToRgb } from "../utils/utils";

export const Background = () => {
  const theme = useTheme();

  const backgroundColorInRGB = _hexToRgb(theme.palette.background.default);
  const [r, g, b] = backgroundColorInRGB;

  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Image />
        <Box
          sx={{
            backgroundColor: `rgba(${r}, ${g}, ${b}, .85)`,
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </Box>
    </>
  );
};

export const Image = styled(Box)(({ theme }) => {
  const css = `
    background-image: url(${MovieCrop});
    background-repeat: no-repeat;
    background-repeat: repeat-y;
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
    `;
  return css;
});
