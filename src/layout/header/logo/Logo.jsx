import React from "react";
import { Typography } from "@mui/material";
import NavBarLink from "../../../routes/components/NavBarLink";
import ROUTES from "../../../routes/routesModel";

export default function Logo() {
  return (
    <>
      <NavBarLink to={ROUTES.ROOT} h>
        <Typography
          variant="h4"
          sx={{
            marginRight: 2,
            fontFamily: 'monospace',
            display: {
              xs: "none", md: "inline-flex", marginRight: '3vw', marginLeft: '1vw',
            },
          }}
        >
          Card Web
        </Typography>
      </NavBarLink>
    </>
  );
}
