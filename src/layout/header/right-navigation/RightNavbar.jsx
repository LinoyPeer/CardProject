// RightNavbar.js
import React, { useState } from "react";
import { useTheme } from "../../../providers/CustomThemeProvider";
import { Box, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from "./SearchBar";

export default function RightNavbar() {
  const { user } = useCurrentUser();
  const { isDark, toggleDarkMode } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleSearch = (query) => {
    console.log('Search query:', query);
    handleSearchClose();
  };

  return (
    <Box
      sx={{
        display: { xs: "none", md: "inline-flex" },
        alignItems: "center",
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {isSearchOpen ? (
          <SearchBar onSearch={handleSearch} />
        ) : (
          <IconButton onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
        )}
      </Box>

      <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode}>
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      {user ? <Logged /> : <NotLogged />}
    </Box>
  );
}
