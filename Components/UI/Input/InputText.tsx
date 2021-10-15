import React from "react";
import { Platform, View, StyleSheet, Text, TextInput } from "react-native";
import { Fonts } from "../../../Constants/Fonts";
import { Colors } from "../../../Constants/Colors";

export interface InputTextProps {
  errors: string[];
  placeholder: string;
  value: string;
  param: string;
  onChangeHandler: (param: string, value: string) => void;
  onBlurHandler: (param: string) => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoComplete?:
    | "off"
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-number"
    | "email"
    | "name"
    | "password"
    | "postal-code"
    | "street-address"
    | "tel"
    | "username";
}

const InputText: React.FC<InputTextProps> = ({
  errors,
  placeholder,
  value,
  param,
  onChangeHandler,
  onBlurHandler,
  autoCapitalize,
  autoComplete
}) => {
  let warningStyle = {};
  if (errors.length > 0) {
    warningStyle = {
      borderColor: "red"
    };
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        style={{ ...styles.input, ...warningStyle }}
        placeholder={placeholder}
        onChangeText={(val: string) => onChangeHandler(param, val)}
        onBlur={() => onBlurHandler(param)}
        autoCapitalize={autoCapitalize ? autoCapitalize : "none"}
        autoCompleteType={autoComplete ? autoComplete : "off"}
      />
      {errors.length > 0 && <Text style={styles.warningText}>{errors[0]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  warningText: {
    width: "100%",
    textAlign: "left",
    color: `red`,
    marginTop: 10,
    fontFamily: Fonts.MAIN,
    fontWeight: "300",
    fontSize: 12,
    letterSpacing: 0.5
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: `rgba(${Colors.BLACK}, .3)`,
    color: `rgba(${Colors.BLACK}, .8)`,
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: Fonts.MAIN,
    fontWeight: "400",
    letterSpacing: 0.5
  }
});

export default InputText;
