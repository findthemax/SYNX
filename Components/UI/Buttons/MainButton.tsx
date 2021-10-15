import React from "react";

import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { Colors, ColorsHex } from "../../../Constants/Colors";
import { Fonts } from "../../../Constants/Fonts";

export interface Props {
  title: string;
  onPress: () => void;
  styleButton?: object;
  styleText?: object;
}

const MainButton: React.FC<Props> = ({
  title,
  onPress,
  styleButton,
  styleText
}) => {
  return (
    <TouchableOpacity
      style={styleButton ? { ...styles.button, ...styleButton } : styles.button}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Text style={styleText ? { ...styles.text, ...styleText } : styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: `100%`,
    height: 60,
    alignItems: `center`,
    justifyContent: `center`,
    borderRadius: 30,
    backgroundColor: ColorsHex.GREEN
    // margin: 10
  },
  text: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 25,
    color: ColorsHex.WHITE
  }
});

export default MainButton;
