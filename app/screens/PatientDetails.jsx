import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Divider, List, Title, useTheme } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db } from "../config/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const PatientDetails = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const admissionsRef = collection(db, "admissions");

  const route = useRoute();
  const patient = route.params.patient;

  const patientsRef = collection(db, "patients");

  const handleDelete = async () => {
    const patientDoc = doc(db, `patients`, patient.id);

    Alert.alert("Do you want to delete this patient?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            await deleteDoc(patientDoc);
            navigation.navigate("patients");
          } catch (error) {
            alert(error.message);
          }
        },
      },
    ]);
  };
  const [admission, setAdmission] = React.useState(null);

  useEffect(() => {
    async function getPatientAdmission() {
      const q = await query(admissionsRef, where("patient", "==", patient.id));
      const data = await getDocs(q);
      setAdmission(data.docs.map((doc) => doc.data({})));
    }
    getPatientAdmission();
  }, [patient]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Patient Details" />
        <Appbar.Action
          icon="plus"
          onPress={() =>
            navigation.navigate("createRecords", {
              patient,
            })
          }
          color={colors.success}
        />
        <Appbar.Action
          icon="delete"
          onPress={handleDelete}
          color={colors.success}
        />
        <Appbar.Action
          icon="account-edit"
          onPress={() =>
            navigation.navigate("editpatient", {
              patient,
            })
          }
        />
      </Appbar>
      <ImageBackground
        blurRadius={6}
        fadeDuration={5000}
        source={require("../assets/doc.png")}
        style={{
          flex: 1,
          backgroundColor: colors.accent,
          paddingTop: 20,
        }}
      >
        <ScrollView>
          <List.Item
            style={{
              backgroundColor: colors.background,
            }}
            title={`Name: ${patient.firstName} ${patient.lastName}`}
            description={`Age: ${patient.age}`}
            left={(props) => (
              <List.Icon {...props} icon="account" color={colors.primary} />
            )}
          />
          <Divider />
          <List.Item
            style={{
              backgroundColor: colors.background,
            }}
            title={`
          PhoneNumber  0${patient.phoneNumber}`}
            description={`Patient Number:  ${patient.patientNumber}`}
            left={(props) => (
              <List.Icon {...props} icon="phone" color={colors.primary} />
            )}
          />
          <Divider />
          {/* admission details */}
          {admission && admission !== null ? (
            <>
              {admission.length > 0 && (
                <>
                  <List.Item
                    style={{
                      backgroundColor: colors.background,
                    }}
                    title={`Admission Date: ${admission[0].dateOfAdmission}`}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon="calendar"
                        color={colors.primary}
                      />
                    )}
                  />
                  <Divider />
                  <List.Item
                    style={{
                      backgroundColor: colors.background,
                    }}
                    title={`Disharge Date: ${admission[0].dischargeDate}`}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon="calendar"
                        color={colors.primary}
                      />
                    )}
                  />
                  <Divider />
                  <List.Item
                    style={{
                      backgroundColor: colors.background,
                    }}
                    title={`Medication: ${admission[0].medication}`}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon="pill"
                        color={colors.primary}
                      />
                    )}
                  />
                  <Divider />
                  <List.Item
                    style={{
                      backgroundColor: colors.background,
                    }}
                    title={`Diagnosis: ${admission[0].illness}`}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon="account-alert"
                        color={colors.error}
                      />
                    )}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Title
                style={{
                  color: colors.background,
                  textAlign: "center",
                  marginTop: 40,
                }}
              >
                No Admission details found Press the second button on top to
                admit this patient.
              </Title>
            </>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({});
