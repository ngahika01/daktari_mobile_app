import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, useTheme } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Yup from "yup";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Form from "../components/form/Form";
import InputComponent from "../components/form/InputComponent";
import CheckedComponent from "../components/form/CheckedComponent";
import { gender } from "../data/data";
import SubmitButton from "../components/form/SubmitButton";
import { db } from "../config/firebase";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .label("First Name")
    .required("Please enter your first name"),
  lastName: Yup.string()
    .label("Last Name")
    .required("Please enter your last name"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.string().required("Age is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number is not valid"),
  patientNumber: Yup.string().required("Patient number is required"),
});

const EditPatient = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  // firebase query to create patient and add to database
  const route = useRoute();
  const { patient } = route.params;

  const patientsRef = collection(db, "patients");

  const handleSubmit = async ({
    firstName,
    lastName,
    gender,
    age,
    phoneNumber,
    patientNumber,
  }) => {
    try {
      const patientdoc = doc(db, "patients", patient.id);
      await updateDoc(patientdoc, {
        firstName,
        lastName,
        gender,
        age: parseInt(age),
        patientNumber,
        phoneNumber: parseInt(phoneNumber),
      });

      alert("Patient edited successfully.");
      navigation.navigate("patients");
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
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Create Patient" />
      </Appbar>
      <ImageBackground
        style={{
          flex: 1,
          padding: 10,
        }}
        source={require("../assets/doc.png")}
      >
        <ScrollView>
          <Form
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{
              firstName: patient.firstName,
              lastName: patient.lastName,
              gender: patient.gender,
              age: String(patient.age),
              phoneNumber: String(patient.phoneNumber),
              patientNumber: patient.patientNumber,
            }}
          >
            <>
              <InputComponent label={"firstName"} secureTextEntry={false} />
              <InputComponent label={"lastName"} secureTextEntry={false} />
              <InputComponent
                label={"age"}
                keyboardType="numeric"
                secureTextEntry={false}
              />
              <CheckedComponent label={"gender"} roles={gender} />
              <InputComponent
                label={"phoneNumber"}
                keyboardType="numeric"
                secureTextEntry={false}
              />
              <InputComponent
                label={"patientNumber"}
                keyboardType="default"
                secureTextEntry={false}
              />
              <SubmitButton
                color={colors.primary}
                icon="check"
                value={"Submit"}
                textColor={colors.accent}
              />
            </>
          </Form>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default EditPatient;

const styles = StyleSheet.create({});
