import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: "500",
    color: "#66ccff",
  },
  button: {
    flexDirection: "row",
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    width: 160,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#481380",
  },
  buttonText: {
    color: "#ffe2ff",
    fontSize: 15,
    marginRight: 5,
    textAlign: "center",
  },
});

export default styles;
