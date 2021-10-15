import * as AuthSession from "expo-auth-session";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import React, { useState } from "react";
import { ImageBackground, Image, Text, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";

import { useActions } from "../../hooks/useActions";

WebBrowser.maybeCompleteAuthSession();

import { Account, Url, Scope } from "../../Constants/Spotify";
import MainButton from "../../Components/UI/Buttons/MainButton";

const discovery = { authorizationEndpoint: Url.AUTH };

// const uri = AuthSession.makeRedirectUri({ useProxy: false });

//Authorizes through the spotify web auth, returns a code that is sent to the SYNX server
//for authing with spotify API & saving / user object is sent back with auth code for spotify
const LoginScreen = () => {
  const { getTokenFromCode } = useActions();
  const [sendState, setSendState] = useState("x");

  React.useEffect(() => {
    const random =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    setSendState(random);
  }, []);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Account.CLIENT_ID,
      scopes: Scope,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      state: sendState,
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        native: "synx://",
        // native: AuthSession.makeRedirectUri({ useProxy: false })
        useProxy: false
      })
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code, state } = response.params;
      if (state === sendState) {
        //the request has been received and is secure
        //Authenticate through SYNX Api
        getTokenFromCode(code);
      } else {
        // console.log("codes didn't match", response);
        // console.log("Send state", sendState);
      }
    }
  }, [response]);

  return (
    <ImageBackground
      source={require("../../assets/backgrounds/home-bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <Image
        source={require("../../assets/logo/synx.logo.darkBg.png")}
        style={styles.logo}
      />

      <MainButton
        title="Login with Spotify"
        onPress={() => promptAsync()}
        styleButton={{ width: "90%" }}
        styleText={{
          textTransform: "uppercase"
        }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40
  },
  logo: {
    width: "80%",
    maxWidth: 400,
    maxHeight: "20%",
    resizeMode: "contain"
  }
});

export default LoginScreen;
