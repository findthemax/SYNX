import { Platform } from "react-native";

export const Fonts = {
  MAIN: Platform.OS === "ios" ? "Helvetica Neue" : "Roboto"
};

export const Weights = {
  THIN: "100",
  LIGHT: "300",
  REGULAR: "normal",
  MEDIUM: "500",
  BOLD: "bold"
};
