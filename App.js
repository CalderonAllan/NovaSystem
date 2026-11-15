import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProductosProvider } from "./src/contexto/ProductosContext";
import { FavoritosProvider } from "./src/contexto/FavoritosContext";

import Catalogo from "./src/pantallas/Catalogo";
import Detalle from "./src/pantallas/Detalle";
import AgregarProducto from "./src/pantallas/AgregarProducto";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProductosProvider>
      <FavoritosProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Catalogo" component={Catalogo} />
            <Stack.Screen name="Detalle" component={Detalle} />
            <Stack.Screen name="AgregarProducto" component={AgregarProducto} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritosProvider>
    </ProductosProvider>
  );
}