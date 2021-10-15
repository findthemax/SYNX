import React from "react";

import { Text, TouchableOpacity, StyleSheet, Image, View } from "react-native";

import { Colors, ColorsHex } from "../../../Constants/Colors";
import { Fonts, Weights } from "../../../Constants/Fonts";

export interface PlaylistItemProps {
  image: string;
  name: string;
  displayName: string;
  style?: object;
  onPress: () => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  image,
  name,
  displayName,
  style,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={style ? { ...styles.button, ...style } : styles.button}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Image style={styles.image} source={{ uri: image }} />

      <View style={styles.textBox}>
        <Text style={styles.textPlaylist}>{name}</Text>
        <Text style={styles.textOwner}>by {displayName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  image: {
    width: 100,
    height: 100,
    margin: 10
  },
  textBox: {
    width: "100%",
    flexShrink: 1,
    flexDirection: "column"
  },
  textPlaylist: {
    fontFamily: Fonts.MAIN,
    fontWeight: Weights.BOLD,
    fontSize: 14,
    color: ColorsHex.WHITE
  },
  textOwner: {
    fontFamily: Fonts.MAIN,
    fontWeight: Weights.MEDIUM,
    fontSize: 10,
    color: `rgba(${Colors.WHITE},.8)`
  }
});

export default PlaylistItem;
