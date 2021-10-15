import React from "react";

import { Text, StyleSheet, View, Pressable, Dimensions } from "react-native";

import { Colors, ColorsHex } from "../../../Constants/Colors";
import { Fonts, Weights } from "../../../Constants/Fonts";
const window = Dimensions.get("window");

export interface SynxControlsProps {
  synxHandler: (num: number) => void;
  synxLevel: number;
  firstPlay: boolean;
}

const SynxControls: React.FC<SynxControlsProps> = ({
  synxHandler,
  synxLevel,
  firstPlay
}) => {
  return firstPlay ? (
    <View style={styles.synxControl}>
      <Pressable
        style={styles.synxButton}
        onPress={() => {
          synxHandler(1);
        }}
      >
        <Text style={styles.synxButtonText}>Host Ahead</Text>
      </Pressable>
      <Text style={styles.synxLevelText}>{synxLevel}</Text>
      <Pressable
        style={styles.synxButton}
        onPress={() => {
          synxHandler(3);
        }}
      >
        <Text style={styles.synxButtonText}>I'm Ahead</Text>
      </Pressable>
    </View>
  ) : (
    <View style={styles.firstSynxControl}>
      <Pressable
        style={styles.synxButton}
        onPress={() => {
          synxHandler(1);
        }}
      >
        <Text style={styles.synxButtonText}>SYNX</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  synxControl: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  firstSynxControl: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  synxButton: {
    backgroundColor: ColorsHex.GREEN,
    width: window.width * 0.35,
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 10
  },
  synxButtonText: {
    color: ColorsHex.WHITE,
    fontFamily: Fonts.MAIN,
    fontWeight: Weights.REGULAR,
    fontSize: 20
  },
  synxLevelText: {
    color: ColorsHex.GREEN,
    fontFamily: Fonts.MAIN,
    fontWeight: Weights.THIN,
    fontSize: 35
  }
});

export default SynxControls;
