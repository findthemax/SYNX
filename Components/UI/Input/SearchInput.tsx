import React from "react";

import { Text, View, StyleSheet, TextInput } from "react-native";

import { Colors, ColorsHex } from "../../../Constants/Colors";
import { Fonts } from "../../../Constants/Fonts";
import { AntDesign } from "@expo/vector-icons";

export interface Props {
  title: string;
  value: string;
  valueUpdate: (text: string) => void;
  style?: object;
}

const SearchInput: React.FC<Props> = ({ title, value, valueUpdate, style }) => {
  return (
    <View style={{ ...styles.input, ...style }}>
      <View style={styles.icon}>
        <AntDesign
          name="search1"
          size={18}
          color={`rgba(${Colors.WHITE},0.8)`}
        />
      </View>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={text => valueUpdate(text)}
        placeholder={title}
        placeholderTextColor={`rgba(${Colors.WHITE},0.8)`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: `100%`,
    alignItems: `center`,
    flexDirection: "row"
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: ColorsHex.GREY_FORM,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    flexGrow: 1,
    height: 40,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: ColorsHex.GREY_FORM,
    color: ColorsHex.WHITE,
    paddingRight: 16
  }
});

export default SearchInput;
