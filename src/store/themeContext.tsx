import { useState, useContext, createContext } from "react";

export interface Theme {
  background: string;
  text: string;
  gradient: string[]
}

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

const lightTheme: Theme = {
  background: "#ffffff",
  text: "#000000",
  gradient : ['#fde6d5', '#dfd4ff']
};

const darkTheme: Theme = {
  background: "#000000",
  text: "#ffffff",
  gradient : ['#0f2027', '#243B55']
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(prev => !prev);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
  