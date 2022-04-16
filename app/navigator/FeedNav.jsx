import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "../screens/HomeScreen";
import CreatePatientScreen from "../screens/CreatePatient";
import PatientScreen from "../screens/PatientScreen";
import PatientDetails from "../screens/PatientDetails";
import EditPatient from "../screens/EditPatient";
import CreateRecords from "../screens/CreateRecords";

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
        <Stack.Screen
          name="createpatient"
          options={{ headerShown: false }}
          component={CreatePatientScreen}
        />
        <Stack.Screen
          name="patients"
          options={{ headerShown: false }}
          component={PatientScreen}
        />
        <Stack.Screen
          name="patientDetails"
          options={{ headerShown: false }}
          component={PatientDetails}
        />
        <Stack.Screen
          name="editpatient"
          options={{ headerShown: false }}
          component={EditPatient}
        />
        <Stack.Screen
          name="createRecords"
          options={{ headerShown: false }}
          component={CreateRecords}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default FeedNav;

const styles = StyleSheet.create({});
