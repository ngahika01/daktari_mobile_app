import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DropDown from "react-native-paper-dropdown";
import { useFormikContext } from "formik";
import { HelperText } from "react-native-paper";

const CustomDropdown = ({ label, roles, ...otherProps }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const { setFieldValue, values, setFieldTouched, touched, errors } =
    useFormikContext();

  return (
    <>
      <DropDown
        {...otherProps}
        label={label}
        value={values[label]}
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        setValue={(value) => {
          //set field value to value or id of each role
          setFieldValue(label, value);
          console.log(value, "value");
          setShowDropDown(false);
        }}
        list={roles}
      />
      <HelperText
        type="error"
        visible={touched[label] && errors[label] ? errors[label] : null}
      >
        {errors[label]}
      </HelperText>
    </>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({});
