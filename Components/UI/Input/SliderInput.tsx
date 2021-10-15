import React, { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";

import { Text, View, StyleSheet, TextInput } from "react-native";

import { ColorsHex } from "../../../Constants/Colors";
import { Fonts } from "../../../Constants/Fonts";

export interface Props {
  title: string;
  titleMin: string;
  titleMax: string;
  value: number;
  minValue: number;
  maxValue: number;
  valueUpdate: (text: number) => void;
  style?: object;
  width: string;
}

const SliderInput: React.FC<Props> = ({
  title,
  titleMin,
  titleMax,
  value,
  minValue,
  maxValue,
  valueUpdate,
  style,
  width
}) => {
  // const [val, setVal] = useState(0);
  // const [valStatement, setValStatement] = useState("");

  // useEffect(() => {
  //   if (val === 0) {
  //     setValStatement("Only you can change a track, your excellency");
  //   } else if (val == 10) {
  //     setValStatement("Any Tom, Dick or Harriet can change a track");
  //   } else {
  //     const percent = 100 - val * 10;
  //     setValStatement(`${percent}% of listeners votes will change a track`);
  //   }
  // }, [val]);

  return (
    <View style={{ ...styles.input, ...style }}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.headings}>
        <Text style={styles.textHeadings}>{titleMin}</Text>
        <Text style={styles.textHeadings}>{titleMax}</Text>
      </View>
      <Slider
        style={{ width: width, height: 40 }}
        value={value}
        minimumValue={minValue}
        maximumValue={maxValue}
        step={1}
        minimumTrackTintColor={ColorsHex.WHITE}
        maximumTrackTintColor={ColorsHex.OFF_WHITE}
        onSlidingComplete={value => valueUpdate(value)}
        thumbTintColor={ColorsHex.GREEN}
        onValueChange={val => valueUpdate(val)}
      />
      {/*<Text style={styles.textDescription}>{valStatement}</Text>*/}
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
    paddingBottom: 8,
    fontFamily: Fonts.BOLD,
    color: ColorsHex.WHITE,
    fontSize: 22
  },
  headings: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textHeadings: {
    paddingBottom: 8,
    fontFamily: Fonts.REGULAR,
    color: ColorsHex.WHITE,
    fontSize: 12
  },
  textDescription: {
    width: "100%",
    textAlign: "right",
    fontFamily: Fonts.REGULAR,
    color: ColorsHex.GREEN,
    fontSize: 12
  }
});

export default SliderInput;
