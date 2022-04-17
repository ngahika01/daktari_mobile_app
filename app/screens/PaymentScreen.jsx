import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Headline,
  Paragraph,
  useTheme,
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { io } from "socket.io-client";
import axios from "axios";
import { useUserAuth } from "../context/UserAuthContext";
const socket = io("http://192.168.226.85:5000", { transports: ["websocket"] });

const PaymentScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const { colors } = useTheme();

  const route = useRoute();
  const { patient, amount } = route.params;

  const navigation = useNavigation();
  //   console.log(records);
  socket.on("querying", (data) => {
    setLoading(true);
  });

  socket.on("queried", (data) => {
    setData(data);
    setLoading(false);
  });

  const { user } = useUserAuth();

  React.useEffect(() => {
    if (data === "Request cancelled by user") {
      setData(null);
      alert(
        "Request cancelled by user.The user must confirm the payment to print a receipt"
      );
    } else if (data === "The initiator information is invalid.") {
      setData(null);
      alert(
        "Request cancelled by user.The user must confirm the payment to print a receipt"
      );
    } else if (data === "The service request is processed successfully.") {
      setData(null);
      alert("Payment successful.");
      navigation.navigate("receipt", {
        patient,
        amount,
      });
    }
  }, [navigation, data]);

  const handlePress = async (phoneNumber) => {
    const url = "http://192.168.226.85:5000";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const lipa = await axios.post(url, { phoneNumber }, config);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Payment" />
      </Appbar>
      <ImageBackground
        source={require("../assets/mpesa.png")}
        style={{
          flex: 1,
          resizeMode: "contain",
          justifyContent: "center",
          alignItems: "center",
        }}
        blurRadius={2}
      >
        {loading && (
          <ActivityIndicator
            size="large"
            animating={loading}
            color={colors.primary}
            style={{
              flex: 1,
            }}
          />
        )}
        <Headline
          style={{
            fontSize: 30,
            color: colors.primary,
          }}
        >
          We only accept Mpesa payments due to the ongoing COVID-19 pandemic.
        </Headline>

        <Paragraph></Paragraph>

        <Button
          mode="contained"
          onPress={() => {
            handlePress(patient.phoneNumber);
          }}
          disabled={loading}
          style={{ margin: 10 }}
        >
          Request payment from user.
        </Button>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
