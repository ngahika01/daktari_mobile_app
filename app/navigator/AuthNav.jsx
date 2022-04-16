import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MyTabs from "./TabNav";

const Stack = createNativeStackNavigator();
const AuthNav = () => {
  const user = null;
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="signUp"
          options={{ headerShown: false }}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="home"
          options={{ headerShown: false }}
          component={MyTabs}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default AuthNav;

const styles = StyleSheet.create({});
