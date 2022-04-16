import { StyleSheet, View, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Button, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const HomeScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [users, setUsers] = React.useState([]);

  const userRef = collection(db, "users");

  React.useEffect(() => {
    async function getUsers() {
      const u = await getDocs(userRef);
      setUsers(
        u.docs.map((doc) =>
          doc.data({
            id: doc.id,
            ...doc.data(),
          })
        )
      );
    }
    getUsers();
  }, []);

  console.log(users);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Appbar>
        <Appbar.Content title="Home Page" />
      </Appbar>
      <ImageBackground
        source={require("../assets/doc.png")}
        fadeDuration={2000}
        blurRadius={6}
        style={{
          flex: 1,
          resizeMode: "cover",
          padding: 10,
          justifyContent: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 40,
              color: colors.accent,
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Welcome to Daktari app
          </Text>
          {/* <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            This is app is built for doctors to help them manage patients in
            their hospitals.
          </Text> */}
        </View>
        <View>
          <Button
            onPress={() => navigation.navigate("createpatient")}
            mode="contained"
            icon={"account"}
          >
            Create New Patient
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
