import React from "react";

import { Text, TouchableOpacity, StyleSheet, Image, View } from "react-native";

import { Colors, ColorsHex } from "../../../Constants/Colors";
import { Fonts } from "../../../Constants/Fonts";

export interface TrackItemProps {
  image: string;
  name: string;
  artists: string[];
  onPress: () => void;
}

const TrackItem: React.FC<TrackItemProps> = ({
  image,
  name,
  artists,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Image style={styles.image} source={{ uri: image }} />

      <View style={styles.textBox}>
        <Text style={styles.textPlaylist}>{name}</Text>
        <Text style={styles.textOwner}>
          {artists.toString().replace(",", ", ")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  image: {
    width: 60,
    height: 60,
    margin: 5
  },
  textBox: {
    width: "100%",
    flexShrink: 1,
    flexDirection: "column"
  },
  textPlaylist: {
    fontFamily: Fonts.BOLD,
    fontSize: 14,
    color: ColorsHex.WHITE
  },
  textOwner: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 10,
    color: `rgba(${Colors.WHITE},.8)`
  }
});

export default TrackItem;
