import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-paper";
import { Image } from "react-native";
import axios from "axios";
import { useFormikContext } from "formik";
import InputComponent from "./InputComponent";

export default function ImagePickerComponent({ disabled, image }) {
  const { values, setFieldTouched, errors, setFieldValue, touched } =
    useFormikContext();

  const [photo, setPhoto] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dyzubblkf/upload";

  const openImagePickerAsync = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage(pickerResult);

    const base64Img = `data:image/jpg;base64,${pickerResult.base64}`;
    try {
      let apiUrl =
        "https://api.cloudinary.com/v1_1/technource/dyzubblkf/upload";

      let data = {
        file: base64Img,
        upload_preset: "smallscalecropmapping",
      };

      fetch(CLOUDINARY_URL, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then(async (r) => {
          let data = await r.json();
          console.log(data.secure_url);
          setPhoto(data);
          setFieldValue("image", data.secure_url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <InputComponent
        label={"Add an image"}
        value={photo && photo.secure_url}
        secureTextEntry={false}
        right={
          <TextInput.Icon
            disabled={disabled}
            onPress={openImagePickerAsync}
            name="camera"
          />
        }
      />
      {photo && photo.secure_url && (
        <Image
          source={{ uri: photo.secure_url }}
          style={{ width: 100, height: 100 }}
        />
      )}
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 200,
            resizeMode: "contain",
            display: "flex",
            alignSelf: "center",
          }}
        />
      )}
    </>
  );
}
