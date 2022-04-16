import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Appbar,
  Card,
  Text,
  useTheme,
  Title,
  IconButton,
} from "react-native-paper";
import { useUserAuth } from "../context/UserAuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

const PatientScreen = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  const { user } = useUserAuth();
  const patientsRef = collection(db, "patients");

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchPatients() {
      const patients = await getDocs(patientsRef);
      setPatients(
        patients.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setLoading(false);
    }
    fetchPatients();
  }, []);
  console.log(patients);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Patients" />
        <Appbar.Action
          icon="plus"
          onPress={() => navigation.navigate("createpatient")}
        />
        <Appbar.Action></Appbar.Action>
      </Appbar>
      <ImageBackground
        source={require("../assets/doc.png")}
        style={{
          flex: 1,
        }}
        fadeDuration={2000}
        blurRadius={6}
      >
        {loading ? (
          <ActivityIndicator
            style={{
              flex: 1,
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
            animating={loading}
            size="large"
          />
        ) : (
          <ScrollView>
            {patients.map((patient) => (
              <Card
                onPress={() =>
                  navigation.navigate("patientDetails", {
                    patient,
                  })
                }
                style={{ margin: 10, backgroundColor: colors.accent }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    size={70}
                    color={colors.background}
                    icon={"account-circle"}
                  />

                  <Card.Content
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: colors.background,
                        }}
                      >
                        {" "}
                        {patient.firstName}{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: colors.background,
                        }}
                      >
                        {" "}
                        {patient.lastName}{" "}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: colors.background,
                      }}
                    >
                      {" "}
                      Age: {patient.age}{" "}
                    </Text>
                  </Card.Content>
                </View>
              </Card>
            ))}
          </ScrollView>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PatientScreen;
