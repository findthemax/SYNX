import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import DeviceItem from "./components/DeviceItem";
import { Colors, ColorsHex } from "../../Constants/Colors";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { StackScreenProps } from "@react-navigation/stack";
import { AuthParamList } from "../../Navigator/AuthParamList";
import { useActions } from "../../hooks/useActions";
import { Fonts, Weights } from "../../Constants/Fonts";
import HostGuestOptions from "./components/HostGuestOptions";
import MiniButton from "../../Components/UI/Buttons/MiniButton";
import MainButton from "../../Components/UI/Buttons/MainButton";

type Props = StackScreenProps<AuthParamList, "Home">;

const { width } = Dimensions.get("window");

// If room is present navigates to player if no room options to host or join are presented
// Room data is from getPlayback

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { image_url } = useTypedSelector(state => state.user);
  const { token, user_id, name, admin } = useTypedSelector(state => state.user);
  const { reward_loading } = useTypedSelector(state => state.reward);

  const { device_name, device_type, is_playing } = useTypedSelector(
    state => state.playback
  );

  // console.log(devices);
  const { getPlayback } = useActions();

  useEffect(() => {
    if (token) {
      getPlayback(token);
    }
  }, []);

  const getPlaybackHandler = () => {
    if (token) {
      getPlayback(token);
    }
  };

  const { synx_id } = useTypedSelector(state => state.room);

  useEffect(() => {
    if (synx_id) {
      navigation.navigate("Playa");
    }
  }, [synx_id]);

  if (reward_loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/backgrounds/home-bg.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.savContainer}>
        <View style={styles.topContainer}>
          <LinearGradient
            colors={[ColorsHex.BLACK, "transparent"]}
            style={styles.linearGradient}
          />
          <Image
            source={require("../../assets/logo/synx.logo.darkBg.png")}
            style={styles.logo}
          />
          <Text style={styles.name}>{name}</Text>
          {image_url && (
            <Image
              source={
                image_url === "null"
                  ? require("../../assets/images/spotify/no_profile_image.png")
                  : {
                      uri: image_url
                    }
              }
              style={styles.profileImage}
            />
          )}

          {admin && (
            <MainButton
              styleButton={{ margin: 20 }}
              onPress={() => navigation.navigate("Admin")}
              title="Admin"
            />
          )}
        </View>
        {is_playing && device_name && device_type ? (
          <View style={styles.bottomContainer}>
            <LinearGradient
              colors={["transparent", ColorsHex.BLACK]}
              style={styles.linearGradient}
            />
            <DeviceItem name={device_name} type={device_type} />
            <HostGuestOptions />
          </View>
        ) : (
          <View style={styles.synxWarningContainer}>
            <Text style={styles.synxWarningText}>
              You currently have no songs playing. In order for SYNX to locate
              your device please play any song in Spotify on the device you want
              to SYNX and then press 'OK'
            </Text>
            <View style={styles.buttonContainer}>
              <MiniButton
                onPress={() => {
                  getPlaybackHandler();
                }}
                title="OK"
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsHex.BLACK
  },
  savContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  topContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20
  },
  linearGradient: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20
  },
  name: {
    fontFamily: Fonts.MAIN,
    fontWeight: Weights.REGULAR,
    color: ColorsHex.WHITE,
    fontSize: 25,
    textAlign: "center"
  },
  logo: {
    width: width * 0.7,
    height: (width * 0.7) / 3.33,
    resizeMode: "contain",
    marginBottom: 25
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 10
  },
  synxWarningContainer: {
    width: "90%",
    marginBottom: 40,
    padding: 15,
    borderWidth: 2,
    borderColor: ColorsHex.GREEN,
    backgroundColor: `rgba(${Colors.GREY_BACKGROUND}, .8)`
  },
  synxWarningText: {
    fontFamily: Fonts.MAIN,
    fontWeight: Weights.LIGHT,
    color: ColorsHex.GREEN,
    fontSize: 18,
    textAlign: "center"
  },
  buttonContainer: {
    width: "100%",
    // alignItems: "center"
    padding: 20
  }
});

export default HomeScreen;
