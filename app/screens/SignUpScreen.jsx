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
import { useNavigation } from "@react-navigation/native";
import { useUserAuth } from "../context/UserAuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import CustomDropDown from "../components/form/CustomDropDown";
import { roles } from "../data/data";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required("Please enter a password")
    .min(6, "Password must be at least 6 characters"),
  role: Yup.string().label("Role").required("Please select a role"),
});

const SignUpScreen = () => {
  const { colors } = useTheme();
  const { signUp, signInWithGoogle } = useUserAuth();
  const [error, setError] = useState("");

  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const usersRef = collection(db, "users");

  const handleRegister = async ({ email, password, role }) => {
    try {
      const user = await signUp(email, password);
      if (user) {
        const userId = user.user.uid;
        const userData = {
          email,
          role,
        };
        await setDoc(doc(db, "users", userId), userData);
      }
      navigation.navigate("home");
      alert("Registration Successful");
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
          title="Register"
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
              role: "",
            }}
            onSubmit={handleRegister}
          >
            <InputComponent
              secureTextEntry={false}
              label={"email"}
              keyboardType="email-address"
            />
            <CustomDropDown label={"role"} roles={roles} />

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
              value={"Register"}
            />
          </Form>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("login");
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: colors.text,
            }}
          >
            Have an account?{" "}
            <Text
              style={{
                color: colors.primary,
              }}
            >
              Sign in
            </Text>
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default SignUpScreen;

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
