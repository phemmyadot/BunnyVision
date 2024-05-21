import { Platform, StyleSheet } from "react-native";

export const colors = {
  primary: "#155565",
  secondary: "#6c757d",
  success: "#28a745",
  danger: "#dc3545",
  warning: "#ffc107",
  info: "#17a2b8",
  light: "#f8f9fa",
  dark: "#343a40",
  white: "#ffffff",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  descriptionContainer: {
    padding: 40,
    flex: 1,
  },
  description: {
    textAlign: "justify",
    marginBottom: 100,
  },
  tabIcon: {
    width: 20,
    height: 20,
  },
  fabIcon: {
    width: 32,
    height: 32,
  },
  tabButton: {
    padding: 12,
    borderRadius: 50,
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: "15%",
    paddingVertical: 10,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 5,
    backgroundColor: colors.white,
  },
  FabButtonContainer: {
    bottom: 40,
    right: 0,
    left: 0,
    alignItems: "center",
    zIndex: 1,
  },
  FabButtonInnerContainer: {
    position: "absolute",
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 50,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  FabButton: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 50,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  appTopBar: {
    paddingVertical: 20,
    width: "100%",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  appTopBarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
});
