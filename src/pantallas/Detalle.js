import { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FavoritosContext } from '../contexto/FavoritosContext';
import Encabezado from '../componentes/Encabezado';

export default function Detalle({ route, navigation }) {
  const { producto } = route.params;
  const { favoritos, alternarFavorito } = useContext(FavoritosContext);

  const esFavorito = favoritos.includes(producto.id);

  function manejarFavorito() {
    alternarFavorito(producto.id);
  }

  function regresar() {
    navigation.goBack();
  }

  return (
    <View style={styles.webBackground}>
      <View style={styles.pageContainer}>
        <Encabezado
          titulo="Detalle"
          mostrarFlecha={true}
          alVolver={regresar}
        />

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.imageCard}>
            <Image
              source={producto.imagen}
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.title}>{producto.nombre}</Text>
            <Text style={styles.price}>${producto.precio}</Text>

            <Text style={styles.description}>
              {producto.descripcion}
            </Text>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={manejarFavorito}
            >
              <AntDesign
                name="heart"
                size={20}
                color={esFavorito ? '#e63946' : '#FFFFFF'}
                style={styles.botonIcono}
              />
              <Text style={styles.actionButtonText}>
                {esFavorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
              </Text>
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  pageContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  content: {
    padding: 24,
  },
  imageCard: {
    backgroundColor: '#EDF2F7',
    borderRadius: 16,
    height: 300,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  productImage: {
    width: '100%',
    height: '100%',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonIcono: {
    marginRight: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});