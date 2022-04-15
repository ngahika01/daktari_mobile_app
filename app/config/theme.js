import { DarkTheme, DefaultTheme } from "react-native-paper";

const theme = {
  dark: false,
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#79cbb8",
    accent: "#500472",
    background: "#fafafa",
    surface: "#fafafa",
    placeholder: "#5C5C5C",
    text: "#ffffff",
    warning: "#ffcc00",
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
