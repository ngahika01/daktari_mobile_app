import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Appbar,
  Button,
  Divider,
  IconButton,
  List,
  Text,
  Title,
  useTheme,
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db } from "../config/firebase";
import * as Print from "expo-print";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { shareAsync } from "expo-sharing";
import { useUserAuth } from "../context/UserAuthContext";

const PatientDetails = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const admissionsRef = collection(db, "records");

  const route = useRoute();
  const patient = route.params.patient;

  const patientsRef = collection(db, "patients");

  const ref = useRef(null);

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

  console.log(admission, "admission");
  useEffect(() => {
    async function getPatientAdmission() {
      const q = await query(admissionsRef, where("patient", "==", patient.id));
      const data = await getDocs(q);
      setAdmission(data.docs.map((doc) => doc.data({})));
    }
    getPatientAdmission();
  }, [patient]);

  const { user } = useUserAuth();
  //   map admissions data in html document

  const html = `
  
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    body {
      background-color: #f2f2f2;
      color: purple;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

    }
    .container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .main {
      width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

   
  </style>
  <body>
    <h1 style="text-align: center;">Patient Detials</h1>

    <div class="main">
    <h3> Admission Details for
    ${user.email}</h3>
    <h3> Phone Number
    ${patient.phoneNumber}</h3>
    <h3> Age ${patient.age}</h3>


        <div class="container">
           ${
             admission &&
             admission.map((admission) => (
               <div class="container">
                 <h3>Admission Date: ${admission.admissionDate}</h3>
                 <h3>Discharge Date: ${admission.dischargeDate}</h3>
                 <h3>Medication: ${admission.medication}</h3>
                 <h3>Illness : ${admission.illness}</h3>
                 <h3>Diagnosis: ${admission.diagnosis}</h3>
                 <h3>Amoun paid: ${admission.amount}</h3>
               </div>
             ))
           }
                                    
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
          color={colors.danger}
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
        ref={ref}
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
              {admission.length > 0 &&
                admission.map((admission) => (
                  <>
                    <List.Item
                      style={{
                        backgroundColor: colors.background,
                      }}
                      title={`Admission Date: ${admission.dateOfAdmission}`}
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
                      title={`Disharge Date: ${admission.dischargeDate}`}
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
                      title={`Medication: ${admission.medication}`}
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
                      title={`Diagnosis: ${admission.illness}`}
                      left={(props) => (
                        <List.Icon
                          {...props}
                          icon="account-alert"
                          color={colors.error}
                        />
                      )}
                    />
                    <List.Item
                      style={{
                        backgroundColor: colors.background,
                      }}
                      title={`Amount Paid: ${admission.amount}`}
                      left={(props) => (
                        <List.Icon
                          {...props}
                          icon="cash"
                          color={colors.success}
                        />
                      )}
                    />
                    <Divider />
                    <View
                      style={{
                        backgroundColor: colors.background,
                      }}
                    >
                      <Text>Lab test results</Text>
                      <Image
                        source={{
                          uri: admission?.image,
                        }}
                        style={{
                          width: 200,
                          height: 200,
                          padding: 10,
                          margin: 5,
                        }}
                      />
                    </View>

                    <Title
                      style={{
                        color: colors.accent,
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      End of Details
                    </Title>
                  </>
                ))}
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
      {/* <Button
        mode="contained"
        onPress={printToFile}
        style={{
          margin: 10,
        }}
      >
        Print
      </Button> */}
    </SafeAreaView>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({});
