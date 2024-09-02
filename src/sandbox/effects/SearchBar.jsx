import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import React, { memo } from "react";
import { useTheme } from "../providers/CustomThemeProvider";
import { useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export default memo(function SearchBar() {
    const { isDark } = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = ({ target }) => setSearch({ q: target.value });

    return (
        <Box>
            <FormControl>
                <OutlinedInput
                    size="small"
                    placeholder={`Search ${searchParams.get("q") || ""}`}
                    onChange={handleChange}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    sx={{
                        backgroundColor: isDark ? "#222831" : "#EEEEEE",
                    }}
                />
            </FormControl>
        </Box>
    );
});
