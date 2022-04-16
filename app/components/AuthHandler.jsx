import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import MyTabs from "../navigator/TabNav";
import AuthNav from "../navigator/AuthNav";
import { ActivityIndicator, useTheme } from "react-native-paper";

const AuthHandler = () => {
  const { colors } = useTheme();
  const [loading, setLoading] = React.useState(true);
  const { user } = useUserAuth();
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return loading ? (
    <ActivityIndicator
      animating={true}
      style={{
        flex: 1,
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundColor: colors.background,
      }}
      size="large"
    />
  ) : !user ? (
    <AuthNav />
  ) : (
    <MyTabs />
  );
};

export default AuthHandler;

