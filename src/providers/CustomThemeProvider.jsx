import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { createContext, useCallback, useContext, useState } from "react";

const ThemeContext = createContext();

export default function CustomThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const theme = createTheme({
    palette: {
      background: {
        default: '#ffffff', // הרקע הכללי של ה-body
      },
      primary: {
        main: '#CFC9C6', // header בצבע כהה יותר
        contrastText: '#918A87', // hover בצבע
      },
      secondary: {
        main: '#F1E8CF', // צבע הכפתורים
      },
      text: {
        primary: '#918A87', // צבע הכותרות
      },
    },
    typography: {
      fontFamily: 'Tahoma', // פונט כללי
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "F1E8CF",
            justifyContent: "space-between",
            marginLeft: '2vw',
            '&:hover': {
              backgroundColor: '#918A87', // צבע hover של הכפתורים
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#CFC9C6', // צבע כהה יותר ל-header
            boxShadow: 'none',
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: '#918A87',
            '&:hover': {
              color: '#918A87',
              backgroundColor: '#E1DCD9',
              borderRadius: '50%', // קצה מעוגל לאייקונים ב-header
            },
            '& + &': {
              paddingLeft: '8px',
            },
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            backgroundColor: '#F0E7CE',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#918A87',
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: '#918A87',
            '&:hover': {
              color: '#000',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#EEEAE8',
            border: '0.2px solid #A8A8A8',
            '&:hover': {
              backgroundColor: '#ffffff',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
              padding: '3px',
              transition: 'all 0.3s ease',
            },
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            textAlign: 'center', // יישור התיאור של הכרטיסים למרכז
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a Provider");
  return context;
};
