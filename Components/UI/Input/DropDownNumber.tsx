import React, { useState } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Modal
} from "react-native";
import { Fonts } from "../../../Constants/Fonts";
import { ColorsHex } from "../../../Constants/Colors";

export interface DropDownNumberProps {
  value: string;
  onChangeHandler: (value: string) => void;
}

const DropDownNumber: React.FC<DropDownNumberProps> = ({
  value,
  onChangeHandler
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const numberOptions = [1, 2, 5, 10, 12, 30, 100];

  const setNumberHandler = (number: number) => {
    onChangeHandler(number.toString());
    setModalVisible(false);
  };

  return (
    <>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <SafeAreaView style={styles.modalContainer}>
          <View>
            {numberOptions.map(num => (
              <Pressable
                style={styles.num}
                key={num}
                onPress={() => setNumberHandler(num)}
              >
                <Text style={styles.numText}>{num}</Text>
              </Pressable>
            ))}
          </View>
        </SafeAreaView>
      </Modal>

      <Pressable style={styles.container} onPress={() => setModalVisible(true)}>
        <Text style={styles.label}>{value}</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    height: 50
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center"
  },
  numContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  num: {
    padding: 15,
    margin: 10,
    borderWidth: 1,
    alignItems: "center"
  },
  numText: {
    fontFamily: Fonts.MAIN,
    fontSize: 25,
    color: ColorsHex.BLACK
  },
  label: {
    fontFamily: Fonts.MAIN,
    fontSize: 25,
    color: ColorsHex.WHITE
  }
});

export default DropDownNumber;
