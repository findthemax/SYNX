import React from "react";

import { Text, StyleSheet, Image, View } from "react-native";

import { ColorsHex } from "../../../Constants/Colors";
import { Fonts } from "../../../Constants/Fonts";

export interface DeviceItemProps {
  name: string;
  type: string;
}

const DeviceItem: React.FC<DeviceItemProps> = ({ name, type }) => {
  const iconTypeSelected = {
    Computer: require("../../../assets/images/spotify/computer.icon.selected.png"),
    TV: require("../../../assets/images/spotify/tv.icon.selected.png"),
    Unknown: require("../../../assets/images/spotify/speaker.icon.selected.png"),
    Speaker: require("../../../assets/images/spotify/speaker.icon.selected.png"),
    Smartphone: require("../../../assets/images/spotify/phone.icon.selected.png")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>SYNX will play on:</Text>
      <View style={styles.deviceContainer}>
        <Image style={styles.image} source={iconTypeSelected[type]} />
        <View style={styles.textBox}>
          <Text style={styles.text}>{name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  containerText: {
    fontFamily: Fonts.REGULAR,
    fontSize: 20,
    color: ColorsHex.WHITE
  },
  deviceContainer: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 50,
    height: 50,
    margin: 5
  },
  textBox: {
    marginLeft: 10,
    flexShrink: 1,
    flexDirection: "column"
  },
  text: {
    fontFamily: Fonts.BOLD,
    fontSize: 16,
    color: ColorsHex.GREEN
  }
});

export default DeviceItem;
