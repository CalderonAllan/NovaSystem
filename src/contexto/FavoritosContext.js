import {createContext, useState} from 'react'

export const FavoritosContext = createContext();

export function FavoritosProvider({children}){
    const [favoritos, setFavoritos] = useState([]);

    function alternarFavorito(idProducto) {
        const nuevaLista = new Set(favoritos);

        if (favoritos.includes(idProducto)) {
            nuevaLista.delete(idProducto);
        } else {
        nuevaLista.add(idProducto);
        }

        setFavoritos([...nuevaLista]);
    }

    function esFavorito(idProducto){
        return favoritos.includes(idProducto);
    }

    return (
        <FavoritosContext.Provider
          value={{ favoritos, alternarFavorito, esFavorito }}
        >
          {children}
        </FavoritosContext.Provider>
    );
}