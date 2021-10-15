import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Alert } from "react-native";
import {
  createStackNavigator,
  StackNavigationOptions
} from "@react-navigation/stack";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { AuthParamList } from "./AuthParamList";

import { ColorsHex } from "../Constants/Colors";
import { Fonts } from "../Constants/Fonts";

const Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: ColorsHex.WHITE,
    background: ColorsHex.BLACK
  }
};

const NavigatorStyle: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: ColorsHex.BLACK,
    borderBottomColor: ColorsHex.BLACK
  },
  headerTitleStyle: {
    textTransform: "uppercase",
    fontFamily: Fonts.MAIN,
    fontSize: 25,
    color: ColorsHex.WHITE
  }
};

//Screens
import HomeScreen from "../screens/home";
import HostScreen from "../screens/host";
import PlayaScreen from "../screens/playa";
import ScannerScreen from "../screens/scanner";
import UsersScreen from "../screens/admin/users/UsersScreen";
import AdminScreen from "../screens/admin/AdminScreen";
import UserInspector from "../screens/admin/users/UserInspector";

const AuthStack = createStackNavigator<AuthParamList>();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="Home" screenOptions={NavigatorStyle}>
      <AuthStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <AuthStack.Screen
        name="Host"
        component={HostScreen}
        options={{
          title: "Host a Room"
        }}
      />
      <AuthStack.Screen
        name="Playa"
        component={PlayaScreen}
        options={{
          headerShown: false
        }}
      />
      <AuthStack.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          headerShown: true
        }}
      />
      <AuthStack.Screen
        name="Admin"
        component={AdminScreen}
        options={{
          headerShown: true
        }}
      />
      <AuthStack.Screen
        name="Users"
        component={UsersScreen}
        options={{
          headerShown: true
        }}
      />
      <AuthStack.Screen
        name="UserInspector"
        component={UserInspector}
        options={{
          headerShown: true
        }}
      />
    </AuthStack.Navigator>
  );
};

//Screens
import LoginScreen from "../screens/login";
import { useActions } from "../hooks/useActions";

type RootStackParamList = {
  Login: undefined;
  Auth: undefined;
};
const RootStack = createStackNavigator<RootStackParamList>();

// If no token the Login screen is shown
const RootStackScreen = () => {
  const { token } = useTypedSelector(state => state.user);
  console.log("token in Navigator:: ", token);
  return (
    <RootStack.Navigator headerMode="none">
      {token ? (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            animationEnabled: false
          }}
        />
      ) : (
        <RootStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            animationEnabled: false
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default () => {
  const { errors } = useTypedSelector(state => state.error);
  const { clearError } = useActions();

  useEffect(() => {
    if (errors && errors.length > 0) {
      let message = errors.map(err => err.msg);
      message = message.join("\r\n \r\n");
      Alert.alert("Oops something went wrong", "\r\n" + message, [
        {
          text: "OK",
          onPress: () => clearError()
        }
      ]);
    }
  }, [errors]);

  return (
    <NavigationContainer theme={Theme}>
      <RootStackScreen />
    </NavigationContainer>
  );
};
