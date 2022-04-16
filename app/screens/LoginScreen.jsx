import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, TextInput, useTheme, Text } from "react-native-paper";
import * as Yup from "yup";
import Form from "../components/form/Form";
import InputComponent from "../components/form/InputComponent";
import SubmitButton from "../components/form/SubmitButton";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required("Please enter a password")
    .min(6, "Password must be at least 6 characters"),
});

const LoginScreen = () => {
  const { colors } = useTheme();
  const { login, signInWithGoogle } = useUserAuth();
  const [error, setError] = useState("");

  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async ({ email, password }) => {
    try {
      await login(email, password);
      navigation.navigate("home");
      alert("Login Successful");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Appbar>
        <Appbar.Content
          style={{
            alignItems: "center",
          }}
          title="Login"
        />
      </Appbar>
      <ImageBackground
        source={require("../assets/doc.png")}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Form
            validationSchema={validationSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleLogin}
          >
            <InputComponent
              secureTextEntry={false}
              label={"email"}
              keyboardType="default"
            />
            <InputComponent
              secureTextEntry={visible}
              label={"password"}
              keyboardType="default"
              right={
                <TextInput.Icon
                  onPress={() => {
                    setVisible(!visible);
                  }}
                  name={visible ? "eye" : "eye-off"}
                />
              }
            />
            <SubmitButton
              color={colors.primary}
              icon="login"
              textColor={colors.background}
              value={"Login"}
            />
          </Form>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("signUp");
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: colors.text,
            }}
          >
            Don't have an account?{" "}
            <Text
              style={{
                color: colors.primary,
              }}
            >
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  googleButton: {
    marginTop: 20,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  googleText: {
    color: "#fafafa",
  },
});
