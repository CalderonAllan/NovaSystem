import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Encabezado from "./src/componentes/Encabezado";

export default function App() {
  return (
    <View style={styles.container}>
      <Encabezado
      titulo="Si"
      mostrarFlecha={true}
      />
      <Text>App.js</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
