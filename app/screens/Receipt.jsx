import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, useTheme } from "react-native-paper";

const Receipt = () => {
  const { colors } = useTheme();
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
            <Text
                style={{
                    fontSize: 40,
                    color: colors.accent,
                    textAlign: "center",
                    fontWeight: "bold",
                }}
            >
                
            </Text>
        </View>
    </SafeAreaView>
  );
}


export default Receipt;

const styles = StyleSheet.create({});
