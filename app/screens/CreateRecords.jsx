import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, useTheme } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Yup from "yup";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Form from "../components/form/Form";
import InputComponent from "../components/form/InputComponent";
import CheckedComponent from "../components/form/CheckedComponent";
import { gender } from "../data/data";
import SubmitButton from "../components/form/SubmitButton";
import { db } from "../config/firebase";
import DatePickerComponent from "../components/form/DatePickerComponent";

const validationSchema = Yup.object().shape({
  dateOfAdmission: Yup.string()
    .label("Date of Admission")
    .required("Please enter date of admission"),
  illness: Yup.string().required("Please enter illness"),
  dischargeDate: Yup.string().required("Please enter discharge date"),
  dateOfNextAppointment: Yup.string().required(
    "Please enter date of next appointment"
  ),
  medication: Yup.string().required("Medication is required"),
});

const CreateRecords = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  // firebase query to create patient and add to database

  const route = useRoute();
  const { patient } = route.params;

  const admissionsRef = collection(db, "admissions");

  const handleSubmit = async ({
    dateOfAdmission,
    illness,
    dischargeDate,
    dateOfNextAppointment,
    medication,
  }) => {
    try {
      await addDoc(admissionsRef, {
        patient: patient.id,
        dateOfAdmission,
        illness,
        dischargeDate,
        dateOfNextAppointment,
        medication,
      });

      alert("Admission created successfully.");
      navigation.navigate("admissions");
    } catch (error) {
      alert(error.message);
    }
  };
  const [patients, setPatients] = React.useState([]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Create Reocrds" />
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
              dateOfAdmission: "",
              illness: "",
              dischargeDate: "",
              dateOfNextAppointment: "",
              medication: "",
            }}
          >
            {
              <>
                <DatePickerComponent label={"dateOfAdmission"} />
                <InputComponent
                  label={"illness"}
                  keyboardType="default"
                  secureTextEntry={false}
                  multiline={true}
                  numberOfLines={6}
                />
                <DatePickerComponent mb={6} mt={6} label={"dischargeDate"} />
                <DatePickerComponent
                  mb={6}
                  mt={6}
                  label={"dateOfNextAppointment"}
                />

                <InputComponent
                  label={"medication"}
                  keyboardType="default"
                  secureTextEntry={false}
                  multiline={true}
                  numberOfLines={6}
                />
                <SubmitButton
                  color={colors.primary}
                  icon="check"
                  value={"Submit"}
                  textColor={colors.accent}
                />
              </>
            }
          </Form>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateRecords;

const styles = StyleSheet.create({});
