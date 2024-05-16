import { StyleSheet } from "react-native";

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
  },
  description: {
    textAlign: "justify",
  },
  tabIcon: {
    width: 18,
    height: 18,
  },
  tabButton: {
    padding: 18,
    borderRadius: 50,
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: "15%",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -50,
    },
    shadowOpacity: 0.07,
    shadowRadius: 20,
  },
  FabButton: {
    backgroundColor: "#613EEA",
    padding: 18,
    borderRadius: 50,
  },
  appTopBar: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 5,
  },
  appTopBarText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
