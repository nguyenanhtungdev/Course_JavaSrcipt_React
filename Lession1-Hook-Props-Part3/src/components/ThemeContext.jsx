import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(); // Tạo một context mới với giá trị mặc định là light
ThemeContext.displayName = "MyContext";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    //bọc toàn bộ ứng dụng. Tất cả các component con sẽ có thể truy cập vào theme context
    //{ children } là một prop đặc biệt chứa tất cả các component con được bọc bên trong một component cha.
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
