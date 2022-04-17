import { DarkTheme, DefaultTheme } from "react-native-paper";

const theme = {
  dark: false,
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#500472",
    accent: "#79cbb8",
    background: "#fafafa",
    surface: "#fafafa",
    placeholder: "#5C5C5C",
    text: "#5C5C5C",
    warning: "#ffcc00",
    danger: "#ff0000",
    //green

    success: "#4bb543",
  },
  animation: {
    scale: 1.0,
  },
};
const darkmodeTheme = {
  dark: true,
  ...DarkTheme,
  mode: "adaptive",
  roundness: 10,
  colors: {
    ...DarkTheme.colors,
  },
};
export { theme, darkmodeTheme };
