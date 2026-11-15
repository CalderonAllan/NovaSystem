import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [cantidadFavoritos, setCantidadFavoritos] = useState(2);

  return (
    <View style={styles.webBackground}>
      <View style={styles.pageContainer}>



        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.imageCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80' }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.title}>Auriculares Nova Bass</Text>
            <Text style={styles.price}>$89.99</Text>

            <Text style={styles.description}>
              Disfruta de la mejor calidad de sonido.
            </Text>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setCantidadFavoritos(cantidadFavoritos + 1)}
            >
              <Text style={styles.actionButtonText}>Agregar a Favoritos</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webBackground: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    paddingVertical: 20,
    alignSelf: "stretch",
  },
  pageContainer: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  // Estilos del encabezado
  container: {
    flexDirection: "row",
    backgroundColor: "#133975",
    width: "100%",
    paddingTop: 40,
    paddingBottom: 35,
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
    position: "relative"
  },
  iconosMenu: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    position: 'relative',
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
  // Estilos del contenido inferior
  content: {
    padding: 24,
  },
  imageCard: {
    backgroundColor: '#EDF2F7',
    borderRadius: 16,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  infoSection: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#2D3748',
    lineHeight: 23,
    marginBottom: 32,
  },
  actionButton: {
    backgroundColor: '#31A8C6',
    borderRadius: 30,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
