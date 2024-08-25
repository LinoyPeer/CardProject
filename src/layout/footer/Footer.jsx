import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import StyleIcon from "@mui/icons-material/Style";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        position: "sticky", bottom: 0, left: 0, right: 0
      }}
    >
      <BottomNavigation showLabels
        sx={{
          backgroundColor: '#CFC9C6', // צבע כהה יותר ל-header
          boxShadow: 'none',
        }} >
        <BottomNavigationAction
          label="About"
          icon={
            <InfoIcon
              sx={{
                color: "#EBE2CA",
                boxShadow: "0px 11px 11px 4px rgba(0, 0, 0, 0.1)", // צל קרוב לאייקון
                borderRadius: "50%", // עיגול הצל סביב האייקון
              }}
            />
          }
          onClick={() => navigate(ROUTES.ABOUT)}
        />
        <BottomNavigationAction
          label="Cards"
          icon={
            <StyleIcon
              sx={{
                color: "#EBE2CA",
                boxShadow: "0px 11px 11px 4px rgba(0, 0, 0, 0.1)", // צל קרוב לאייקון
                borderRadius: "50%", // עיגול הצל סביב האייקון
              }}
            />
          }
          onClick={() => navigate(ROUTES.CARDS)}
        />
      </BottomNavigation>
    </Paper >
  );
}
