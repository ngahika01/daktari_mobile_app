import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import InputComponent from "./InputComponent";
import { HelperText, TextInput } from "react-native-paper";
import { useFormikContext } from "formik";

export default function DatePickerComponent({ label, mt, mb }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const { values, setFieldTouched, errors, setFieldValue, touched } =
    useFormikContext();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setFieldValue(label, currentDate.toLocaleDateString());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          minimumDate={new Date(2021, 1, 1)}
          display="calendar"
          onChange={onChange}
        />
      )}
      <TextInput
        onChangeText={(text) => setDate(text)}
        value={date.toLocaleDateString()}
        label={label}
        mode="outlined"
        style={{ marginTop: mt, marginBottom: mb }}
        right={<TextInput.Icon onPress={showDatepicker} name="calendar" />}
      />
      {errors[label] && touched[label] && (
        <HelperText type="error" visible={true}>
          {errors[label]}
        </HelperText>
      )}
    </>
  );
}
