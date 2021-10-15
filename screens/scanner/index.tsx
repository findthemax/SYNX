import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  StyleSheet
} from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import { BlurView } from "expo-blur";

import MiniButton from "../../Components/UI/Buttons/MiniButton";
import { Colors, ColorsHex } from "../../Constants/Colors";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { StackScreenProps } from "@react-navigation/stack";
import { AuthParamList } from "../../Navigator/AuthParamList";
import { useActions } from "../../hooks/useActions";
import { DateTime } from "luxon";
import { Fonts, Weights } from "../../Constants/Fonts";
import SYNXApi from "../../Constants/SYNXApi";

const { width, height } = Dimensions.get("window");

type Props = StackScreenProps<AuthParamList, "Scanner">;

const ScannerScreen: React.FC<Props> = () => {
  const { token } = useTypedSelector(state => state.user);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  async function checkCameraPermissions() {
    const { status, permissions } = await Permissions.getAsync(
      Permissions.CAMERA
    );
    if (status === "granted") {
      setHasPermission(true);
      return true;
    } else {
      if (permissions.camera.canAskAgain) {
        setHasPermission(null);
        return null;
      } else {
        setHasPermission(false);
        return false;
      }
    }
  }

  async function getCameraPermissions() {
    await Permissions.askAsync(Permissions.CAMERA);
    await checkCameraPermissions();
  }

  useEffect(() => {
    (async () => {
      const stat = await checkCameraPermissions();
      if (stat === null) {
        await getCameraPermissions();
      }
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (data.includes(SYNXApi.QR_URL)) {
      setScanned(true);
      const room_id = data.replace(SYNXApi.QR_URL, "");
      if (token) {
        joinRoom(token, room_id);
      }
    } else {
      setScanned(true);
      Alert.alert(
        "Code Not Recognised",
        "This is not recognised as a SYNX room code",
        [{ text: "OK", onPress: () => setScanned(false) }],
        { cancelable: false }
      );
    }
  };

  const { joinRoom } = useActions();

  if (hasPermission) {
    return (
      <View style={styles.container}>
        <BarCodeScanner
          type={BarCodeScanner.Constants.Type.back}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        >
          <View style={styles.scannerContainer}>
            <BlurView intensity={90} tint="dark" style={styles.upper}>
              <Text style={styles.title}>Scan a SYNX Code</Text>
            </BlurView>
            <View style={styles.middle}>
              <BlurView intensity={90} tint="dark" style={styles.outer} />
              <BlurView intensity={90} tint="dark" style={styles.outer} />
            </View>
            <BlurView intensity={90} tint="dark" style={styles.bottom} />
          </View>
        </BarCodeScanner>
      </View>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center"
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            width: "90%"
          }}
        >
          {hasPermission === null ? (
            <>
              <Text style={styles.title}>No access to camera</Text>
              <Text style={styles.subTitle}>
                SYNX requires access to your camera in order to scan SYNX Codes
              </Text>
              <MiniButton
                onPress={async () => {
                  await getCameraPermissions();
                }}
                title="Grant Permission"
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>No access to camera</Text>
              <Text style={styles.subTitle}>
                To give SYNX access to your camera please enable 'Camera' in you
                iPhone settings Settings-SYNX-Camera
              </Text>
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  scannerContainer: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    paddingBottom: 5,
    fontFamily: Fonts.MAIN,
    fontWeight: Weights.BOLD,
    color: ColorsHex.GREEN,
    fontSize: 25,
    marginBottom: 20
  },
  subTitle: {
    paddingBottom: 16,
    fontFamily: Fonts.MAIN,
    fontWeight: Weights.REGULAR,
    color: ColorsHex.GREEN,
    fontSize: 15,
    textAlign: "center"
  },
  scanner: {
    flex: 1,
    width: "100%"
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20
  },
  upper: {
    width: "100%",
    height: height * 0.25,
    alignItems: "center",
    backgroundColor: `rgba(${Colors.GREEN}, .25)`,
    justifyContent: "flex-end"
  },
  middle: {
    width: "100%",
    height: width * 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  outer: {
    backgroundColor: "green",
    width: width * 0.15,
    height: width * 0.7
  },
  bottom: {
    width: "100%",
    flex: 1,
    alignItems: "center"
  }
});

export default ScannerScreen;
