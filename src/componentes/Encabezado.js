import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FavoritosContext } from "../contexto/FavoritosContext";

export default function Encabezado({ titulo, mostrarFlecha, alVolver }) {
  const { favoritos } = useContext(FavoritosContext);
  const cantidadFavoritos = favoritos.length;

  function manejarFavoritosHeader() {
    alert("Tienes " + cantidadFavoritos + " favoritos");
  }

  return (
    <View style={styles.container}>
      <View style={styles.contenedorIcono}>
        {mostrarFlecha && (
          <TouchableOpacity onPress={alVolver}>
            <AntDesign name="arrow-left" style={styles.iconosMenu} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.textoMenu}>{titulo}</Text>

      <TouchableOpacity onPress={manejarFavoritosHeader}>
        <AntDesign name="heart" style={styles.iconosMenu} />
        <View style={styles.insignia}>
          <Text style={styles.textoInsignia}>{cantidadFavoritos}</Text>
        </View>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#133975",
    width: "100%",
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
  contenedorIcono: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  textoMenu: {
    flex: 1,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    position: "relative",
  },
  iconosMenu: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    position: "relative",
  },
  insignia: {
    position: "absolute",
    top: -6,
    right: -4,
    backgroundColor: "#e63946",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  textoInsignia: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },
});