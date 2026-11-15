import { useContext } from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ProductosContext } from "../contexto/ProductosContext";
import Encabezado from "../componentes/Encabezado";
import TarjetaProducto from "../componentes/TarjetaProducto";

export default function PantallaCatalogo({ navigation }) {
  const { productos } = useContext(ProductosContext);

  function obtenerID(item) {
    return item.id;
  }

  function dibujarTarjeta({ item }) {
    function irADetalle() {
      navigation.navigate("Detalle", { producto: item });
    }

    return (
      <TarjetaProducto
        producto={item}
        alPresionar={irADetalle}
      />
    );
  }

  function irAAgregarProducto() {
    navigation.navigate("AgregarProducto");
  }

  function dibujarPieDeLista() {
    return (
      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={irAAgregarProducto}
      >
        <AntDesign name="plus" size={20} color="#FFFFFF" style={styles.iconoBoton} />
        <Text style={styles.textoBoton}>Agregar Producto</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Encabezado
        titulo="Catálogo"
        mostrarFlecha={false}
      />

      <FlatList
        data={productos}
        keyExtractor={obtenerID}
        numColumns={2}
        contentContainerStyle={styles.lista}
        columnWrapperStyle={styles.fila}
        renderItem={dibujarTarjeta}
        ListFooterComponent={dibujarPieDeLista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  lista: {
    padding: 12,
    paddingBottom: 40,
  },
  fila: {
    justifyContent: "space-between",
  },
  botonAgregar: {
    backgroundColor: "#31A8C6",
    marginTop: 16,
    marginBottom: 20,
    height: 54,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  iconoBoton: {
    marginRight: 8,
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});