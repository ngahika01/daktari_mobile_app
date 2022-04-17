import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, useTheme, Text, Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { useUserAuth } from "../context/UserAuthContext";

const Receipt = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const {user} = useUserAuth()

  const { patient, amount } = route.params;

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
  </head>
  <body>
        <div style="width: 100%; height: 100%;">
        <h4> ${patient.firstName} </h4>
        <h4> ${patient.lastName} </h4>
        <h4> 0${patient.phoneNumber} </h4>
        <h4>Amount received ${amount} </h4>

        <p> You were served by ${user.email} </p>
            </div>
      
  </body>
  </html>
  
  `;
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html,
    });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Appbar>
        <Appbar.Content title="Receipt" />
      </Appbar>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          padding: 10,
          justifyContent: "center",
        }}
      >
        <Button onPress={printToFile} mode="contained">
          Print Receipt
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Receipt;

const styles = StyleSheet.create({});
