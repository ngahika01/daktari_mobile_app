import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";

import ProfileScreen from "../screens/ProfileScreen";
import FeedNav from "./FeedNav";
import PatientScreen from "../screens/PatientScreen";

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  const { colors } = useTheme();



  return (
    <Tab.Navigator
      initialRouteName="feed"
      activeColor={colors.accent}
      inactiveColor={colors.primary}
      barStyle={{ backgroundColor: colors.background }}
    >
      <Tab.Screen
        name="feed"
        component={FeedNav}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="admission"
        component={AdmissionsScreen}
        options={{
          tabBarLabel: "Admissions",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-check"
              color={color}
              size={24}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="patients"
        component={PatientScreen}
        options={{
          tabBarLabel: "Patients",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="doctor" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="logout"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-edit"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
