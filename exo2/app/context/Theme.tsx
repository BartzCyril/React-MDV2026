import {createContext, type SetStateAction} from "react";

const ThemeContext = createContext({
    theme: "light",
    setTheme: (theme: SetStateAction<"light" | "dark">) => {}
})

export default ThemeContext;