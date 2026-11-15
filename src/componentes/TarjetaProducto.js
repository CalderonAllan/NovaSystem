import { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FavoritosContext } from "../contexto/FavoritosContext";

export default function TarjetaProducto({ producto, alPresionar }) {
  const { esFavorito, alternarFavorito } = useContext(FavoritosContext);
  const favorito = esFavorito(producto.id);

  const fuenteImagen =
    typeof producto.imagen === "string"
      ? { uri: producto.imagen }
      : producto.imagen;

  return (
    <TouchableOpacity
      style={styles.tarjeta}
      onPress={alPresionar}
      activeOpacity={0.85}
    >
      <View style={styles.contenedorImagen}>
        <Image
          source={fuenteImagen}
          style={styles.imagen}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={styles.botonFavorito}
          onPress={() => alternarFavorito(producto.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={favorito ? "heart" : "heart-outline"}
            size={20}
            color={favorito ? "#ef4444" : "#64748b"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.nombre} numberOfLines={2}>
          {producto.nombre}
        </Text>

        <Text style={styles.precio}>
          ${Number(producto.precio).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    width: "46%",
    margin: "2%",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  contenedorImagen: {
    position: "relative",
    width: "100%",
    backgroundColor: "#f1f5f9",
  },
  imagen: {
    width: "100%",
    height: 130,
  },
  botonFavorito: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#ffffff",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  info: {
    padding: 12,
  },
  nombre: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 6,
  },
  precio: {
    fontSize: 15,
    fontWeight: "700",
    color: "#133975",
  },
});