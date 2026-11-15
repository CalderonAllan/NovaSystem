
import React, { useState } from "react";
import {
  View,Text,TextInput,TouchableOpacity,ScrollView,StyleSheet,Image,Alert,Platform,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import Encabezado from "../componentes/Encabezado";

export default function AgregarProducto({ onGuardar }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [errorPrecio, setErrorPrecio] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");
  const [errorImagen, setErrorImagen] = useState("");

  // Indica si la imagen proviene de un enlace o archivo
  const [tipoImagen, setTipoImagen] = useState("url");

  // Seleccionar imagen desde el dispositivo
  const seleccionarImagen = async () => {
    try {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets.length > 0) {
        setImagen(resultado.assets[0].uri);
        setTipoImagen("archivo");
        setErrorImagen("");
      }
    } catch (error) {
      setErrorImagen("No se pudo seleccionar la imagen.");
    }
  };

  // Validar URL
  const validarURL = (url) => {
    return /^https?:\/\/\S+$/i.test(url);
  };

  // Mostrar mensaje de éxito
  const mostrarMensaje = (mensaje) => {
    if (Platform.OS === "web") {
      window.alert(mensaje);
    } else {
      Alert.alert("NovaSystem", mensaje);
    }
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setNombre("");
    setPrecio("");
    setImagen("");
    setDescripcion("");
    setTipoImagen("url");
    setErrorPrecio("");
    setErrorGeneral("");
    setErrorImagen("");
  };

  // Guardar producto
  const guardarProducto = () => {
    setErrorPrecio("");
    setErrorGeneral("");
    setErrorImagen("");

    if (!nombre.trim()) {
      setErrorGeneral("Debe ingresar el nombre del producto.");
      return;
    }

    const precioNumero = Number(precio.trim());

    if (
      !precio.trim() ||
      !Number.isFinite(precioNumero) ||
      precioNumero <= 0
    ) {
      setErrorPrecio("El precio debe ser un número válido.");
      return;
    }

    if (!imagen.trim()) {
      setErrorImagen("Debe agregar una imagen del producto.");
      return;
    }

    if (tipoImagen === "url" && !validarURL(imagen.trim())) {
      setErrorImagen("Ingrese un enlace de imagen válido.");
      return;
    }

    if (!descripcion.trim()) {
      setErrorGeneral("Debe ingresar una descripción.");
      return;
    }

    const nuevoProducto = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      precio: precioNumero,
      imagen: imagen.trim(),
      descripcion: descripcion.trim(),
    };

    if (onGuardar) {
      onGuardar(nuevoProducto);
      limpiarFormulario();
    } else {
      mostrarMensaje(
        "Producto validado correctamente. Pendiente de conectar con el catálogo."
      );
      // No limpiar: todavía no se ha guardado.
    }
  };

  return (
    <View style={styles.contenedor}>
      {/* Encabezado compartido del proyecto */}
      <Encabezado
        titulo="Nuevo Producto"
        mostrarFlecha={true}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>
          Nuevo Producto
        </Text>

        <View style={styles.formulario}>

          {/* NOMBRE */}
          <Text style={styles.etiqueta}>
            Nombre del producto
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre del producto"
            placeholderTextColor="#92959D"
            value={nombre}
            onChangeText={setNombre}
          />

          {/* PRECIO */}
          <Text style={styles.etiqueta}>
            Precio ($)
          </Text>

          <TextInput
            style={[
              styles.input,
              errorPrecio ? styles.inputError : null,
            ]}
            placeholder="Precio ($)"
            placeholderTextColor="#92959D"
            keyboardType="decimal-pad"
            value={precio}
            onChangeText={(texto) => {
              setPrecio(texto);
              setErrorPrecio("");
            }}
          />

          {errorPrecio ? (
            <Text style={styles.error}>
              * {errorPrecio}
            </Text>
          ) : null}

          {/* IMAGEN */}
          <Text style={styles.etiqueta}>
            Imagen del producto
          </Text>

          <Text style={styles.textoAyuda}>
            Agregue un enlace o seleccione una imagen.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="https://ejemplo.com/imagen.jpg"
            placeholderTextColor="#92959D"
            autoCapitalize="none"
            keyboardType="url"
            value={tipoImagen === "url" ? imagen : ""}
            onChangeText={(texto) => {
              setImagen(texto);
              setTipoImagen("url");
              setErrorImagen("");
            }}
          />

          <Text style={styles.textoSeparador}>
            O
          </Text>

          <TouchableOpacity
            style={styles.botonImagen}
            onPress={seleccionarImagen}
          >
            <AntDesign
              name="picture"
              size={22}
              color="#133975"
            />

            <Text style={styles.textoBotonImagen}>
              Seleccionar imagen
            </Text>
          </TouchableOpacity>

          {errorImagen ? (
            <Text style={styles.error}>
              * {errorImagen}
            </Text>
          ) : null}

          {/* VISTA PREVIA */}
          {imagen.trim() &&
            (tipoImagen === "archivo" ||
              validarURL(imagen.trim())) && (
              <View style={styles.contenedorVistaPrevia}>
                <Text style={styles.textoVistaPrevia}>
                  Vista previa
                </Text>

                <Image
                  source={{ uri: imagen.trim() }}
                  style={styles.imagenPrevia}
                  resizeMode="contain"
                  onError={() => {
                    setErrorImagen(
                      "No se pudo cargar la imagen seleccionada."
                    );
                  }}
                  onLoad={() => setErrorImagen("")}
                />

                <TouchableOpacity
                  style={styles.botonEliminarImagen}
                  onPress={() => {
                    setImagen("");
                    setTipoImagen("url");
                    setErrorImagen("");
                  }}
                >
                  <AntDesign
                    name="close-circle"
                    size={18}
                    color="#C95739"
                  />

                  <Text style={styles.textoEliminar}>
                    Quitar imagen
                  </Text>
                </TouchableOpacity>
              </View>
            )}

          {/* DESCRIPCIÓN */}
          <Text style={styles.etiqueta}>
            Descripción
          </Text>

          <TextInput
            style={[styles.input, styles.descripcion]}
            placeholder="Descripción"
            placeholderTextColor="#92959D"
            multiline
            textAlignVertical="top"
            value={descripcion}
            onChangeText={setDescripcion}
          />

          {errorGeneral ? (
            <Text style={styles.error}>
              * {errorGeneral}
            </Text>
          ) : null}

          {/* GUARDAR */}
          <TouchableOpacity
            style={styles.botonGuardar}
            onPress={guardarProducto}
          >
            <Text style={styles.textoBoton}>
              Guardar
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  scroll: {
    flex: 1,
  },

  contenido: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#102344",
    marginBottom: 28,
    textAlign: "center",
  },

  formulario: {
    width: "100%",
    maxWidth: 540,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 25,
    paddingBottom: 32,
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  etiqueta: {
    fontSize: 19,
    fontWeight: "500",
    color: "#14223A",
    marginTop: 18,
    marginBottom: 10,
  },

  input: {
    width: "100%",
    minHeight: 58,
    borderWidth: 1,
    borderColor: "#A4A9B2",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    color: "#14223A",
    backgroundColor: "#FFFFFF",
  },

  inputError: {
    borderColor: "#D95A3A",
  },

  error: {
    color: "#C95739",
    fontSize: 14,
    marginTop: 8,
  },

  textoAyuda: {
    fontSize: 14,
    color: "#777F8C",
    marginBottom: 12,
  },

  textoSeparador: {
    fontSize: 15,
    color: "#777F8C",
    textAlign: "center",
    marginVertical: 12,
    fontWeight: "500",
  },

  botonImagen: {
    width: "100%",
    minHeight: 55,
    borderWidth: 1.5,
    borderColor: "#133975",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F7FC",
    gap: 10,
  },

  textoBotonImagen: {
    fontSize: 17,
    fontWeight: "600",
    color: "#133975",
  },

  contenedorVistaPrevia: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#F8FAFD",
    borderRadius: 14,
    padding: 15,
    width: "100%",
  },

  textoVistaPrevia: {
    fontSize: 16,
    fontWeight: "600",
    color: "#14223A",
    marginBottom: 12,
  },

  imagenPrevia: {
    width: "100%",
    height: 190,
    borderRadius: 12,
  },

  botonEliminarImagen: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 7,
  },

  textoEliminar: {
    color: "#C95739",
    fontSize: 15,
    fontWeight: "500",
  },

  descripcion: {
    height: 130,
    paddingTop: 15,
  },

  botonGuardar: {
    backgroundColor: "#1684F8",
    minHeight: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  textoBoton: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});






