import React from "react";

import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MiniButton from "../../../Components/UI/Buttons/MiniButton";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";

export interface HostGuestProps {}

const HostGuestOptions: React.FC<HostGuestProps> = () => {
  const navigation = useNavigation();
  const { getPlayback } = useActions();

  const { token } = useTypedSelector(state => state.user);
  const { is_playing } = useTypedSelector(state => state.playback);

  const getPlaybackHandler = () => {
    if (token) {
      getPlayback(token);
    }
  };

  const navigateHandler = (destination: string) => {
    if (token) {
      getPlayback(token);
    }
    if (is_playing) {
      navigation.navigate(destination);
    } else {
      Alert.alert(
        "No Spotify Device",
        "We are unable to locate your spotify device - please make sure you are playing any song on spotify so that we can locate it",
        [{ text: "OK", onPress: () => getPlaybackHandler() }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <MiniButton
          onPress={() => {
            navigateHandler("Host");
          }}
          title="HOST"
        />
      </View>
      <View style={styles.buttonContainer}>
        <MiniButton
          onPress={() => {
            navigateHandler("Scanner");
          }}
          title="GUEST"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    paddingBottom: 50
  },
  buttonContainer: {
    width: "35%"
  }
});

export default HostGuestOptions;
