import { Button, Link } from "@bytetheoryinnovations/bytetheory-ui-library";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import React from "react";

function DocsButton({ themeMode, ...props }) {
  //   const theme = useTheme();
  return (
    <Link
      href={"https://projects.bytetheoryinnovations.com/top-movies.html"}
      target={"_blank"}
      rel="nofollow noopener noreferrer"
    >
      <Button
        variant="outlined"
        size="small"
        sx={
          {
            //   borderColor: theme.palette.text.primary,
            //   color: theme.palette.text.primary,
          }
        }
        endIcon={<OpenInNewIcon />}
      >
        Docs
      </Button>
    </Link>
  );
}

export default DocsButton;
