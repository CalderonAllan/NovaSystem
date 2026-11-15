import {createContext, useState} from 'react'
import {productosIniciales} from '../datos/productos'

export const ProductosContext = createContext()

export function ProductosProvider({children}) {
    const [productos, setProductos] = useState(productosIniciales)

    function agregarProducto(nuevoProducto){
        setProductos([nuevoProducto, ...productos]);
    }

    return (
        <ProductosContext.Provider
            value={{productos, agregarProducto}}
        >
            {children}
        </ProductosContext.Provider>
    )

}