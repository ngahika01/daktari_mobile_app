import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
const FeedNav = () => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="myhome"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default FeedNav;

const styles = StyleSheet.create({});
