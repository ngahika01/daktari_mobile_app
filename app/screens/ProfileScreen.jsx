import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Appbar,
  Card,
  IconButton,
  List,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useUserAuth } from "../context/UserAuthContext";
import { collection, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import moment from "moment";

const ProfileScreen = () => {
  const [me, setMe] = React.useState(null);

  const usersRef = collection(db, "users");

  const navigation = useNavigation();
  const { colors } = useTheme();
  const { user, logout } = useUserAuth();
  const handleLogout = async () => {
    await logout();
    navigation.navigate("logout");
  };

  // React.useEffect(() => {
  //   async function fetchMe() {
  //     const me = await getDoc(usersRef, user.uid);
  //     setMe(me.data());
  //   }
  //   fetchMe();
  // }, [user]);

  console.log(user.uid, "me");
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Appbar>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar>
      <Card>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent:"center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <IconButton
            icon={"account-circle"}
            color={colors.primary}
            size={100}
          />

          <Card.Content>
            <Paragraph>{`${user.email}`}</Paragraph>
            <Paragraph>
              Phone number: {user.phoneNumber ? user.phoneNumber : "Not set in your email account"}
            </Paragraph>
            <Paragraph>{`Last Login: ${moment(user.lastLoginAt).format(
              "h.mma"
            )}`}</Paragraph>
          </Card.Content>
        </View>
      </Card>
      <>
        <List.Item
          title="Logout"
          right={(props) => <List.Icon {...props} icon="logout" />}
          onPress={handleLogout}
        />
      </>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
