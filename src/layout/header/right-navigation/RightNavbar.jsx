import { useTheme } from "../../../providers/CustomThemeProvider";
import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from "react-router-dom";

export default function RightNavbar() {
  const { user } = useCurrentUser();
  const { isDark, toggleDarkMode } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useSearchParams();

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  }
  const handleSearchChanges = () => {
    setIsSearchOpen(true);
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  }

  return (
    <Box
      sx={{
        display: { xs: "none", md: "inline-flex" },
        alignItems: "center",
      }}
    >
      {isSearchOpen ? (
        <Box width={100}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            autoFocus
            onBlur={handleSearchClose}
          />
        </Box>
      ) : (
        <IconButton onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
      )}

      <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode}>
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      {user ? <Logged /> : <NotLogged />}
    </Box>
  );
}
