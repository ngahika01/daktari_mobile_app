import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  UserAuthContextProvider,
  useUserAuth,
} from "./app/context/UserAuthContext";
import { Provider as PaperProvider } from "react-native-paper";
import { darkmodeTheme, theme } from "./app/config/theme";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
import AuthNav from "./app/navigator/AuthNav";
import { NavigationContainer } from "@react-navigation/native";
import AuthHandler from "./app/components/AuthHandler";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const scheme = useColorScheme();
  return (
    <>
      <PaperProvider theme={scheme === "light" ? theme : darkmodeTheme}>
        <SafeAreaProvider>
          <UserAuthContextProvider>
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: theme.colors.background,
              }}
            >
              <NavigationContainer>
                <AuthHandler />
              </NavigationContainer>
            </SafeAreaView>
          </UserAuthContextProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
