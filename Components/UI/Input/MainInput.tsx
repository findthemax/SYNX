import React from "react";

import { Text, View, StyleSheet, TextInput } from "react-native";

import { Colors, ColorsHex } from "../../../Constants/Colors";
import { Fonts } from "../../../Constants/Fonts";

export interface Props {
  title: string;
  value: string;
  valueUpdate: (text: string) => void;
  style?: object;
  placeholder?: string;
  defaultValue?: string;
}

const MainInput: React.FC<Props> = ({
  title,
  value,
  valueUpdate,
  style,
  placeholder,
  defaultValue
}) => {
  return (
    <View style={{ ...styles.input, ...style }}>
      <Text style={styles.text}>{title}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        placeholderTextColor={`rgba(${Colors.WHITE},0.8)`}
        onChangeText={text => valueUpdate(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: `100%`,
    alignItems: `center`
  },
  text: {
    width: "100%",
    paddingBottom: 16,
    fontFamily: Fonts.BOLD,
    color: ColorsHex.WHITE,
    fontSize: 22
  },
  textInput: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    backgroundColor: ColorsHex.GREY_FORM,
    color: ColorsHex.WHITE,
    paddingHorizontal: 16
  }
});

export default MainInput;
