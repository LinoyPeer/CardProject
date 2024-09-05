import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import StyleIcon from "@mui/icons-material/Style";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useCurrentUser } from "../../users/providers/UserProvider";
import { Favorite, FindInPage, RecentActors } from "@mui/icons-material";

export default function Footer() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();


  return (
    <Paper
      elevation={0}
      sx={{
        position: "sticky", bottom: 0, left: 0, right: 0
      }}
    >
      {!user && (
        <Typography>Guest</Typography>
      )}
      {user && (!user.isAdmin && !user.isBusiness) && (
        <Typography>Logged Guest </Typography>
      )}
      {user && (!user.isAdmin && user.isBusiness) && (
        <Typography>Business</Typography>
      )}
      {user && (user.isAdmin && user.isBusiness) && (
        <Typography>Admin-Business</Typography>
      )}
      {user && (user.isAdmin && !user.isBusiness) && (
        <Typography>Admin-NotBusiness</Typography>
      )}

      <BottomNavigation showLabels
        sx={{
          backgroundColor: '#CFC9C6',
          boxShadow: 'none',
        }} >
        <BottomNavigationAction
          label="About"
          icon={
            <InfoIcon
              sx={{
                color: "#EBE2CA",
                boxShadow: "0px 11px 11px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "50%",
              }}
            />
          }
          onClick={() => navigate(ROUTES.ABOUT)}
        />
        <BottomNavigationAction
          label="All Cards"
          icon={
            <StyleIcon
              sx={{
                color: "#EBE2CA",
                boxShadow: "0px 11px 11px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "50%",
              }}
            />
          }
          onClick={() => navigate(ROUTES.CARDS)}
        />
        {user && (user.isAdmin || user.isBusiness) && (
          <BottomNavigationAction
            label="My Cards"
            icon={
              <RecentActors
                sx={{
                  color: "#EBE2CA",
                  boxShadow: "0px 11px 11px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "50%",
                }}
              />
            }
            onClick={() => navigate(ROUTES.MY_CARDS)}
          />
        )}
        {user && (
          <BottomNavigationAction
            label="Fav Cards"
            icon={
              <Favorite
                sx={{
                  color: "#EBE2CA",
                  boxShadow: "0px 11px 11px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "50%",
                }}
              />
            }
            onClick={() => navigate(ROUTES.FAV_CARDS)}
          />
        )}
        {user && (user.isAdmin) && (
          <BottomNavigationAction
            label="CRM"
            icon={
              <FindInPage
                sx={{
                  color: "#EBE2CA",
                  boxShadow: "0px 11px 11px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "50%",
                }}
              />
            }
            onClick={() => navigate(ROUTES.CRM_ADMIN)}
          />
        )}
      </BottomNavigation>
    </Paper >
  );
}
