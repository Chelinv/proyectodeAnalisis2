import React, { useState } from 'react';
import { registrarVenta } from '../../services/dataService';
import EstadoCompra from './EstadoCompra';

/**
 * Componente para manejar el proceso de compra
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.productosCarrito - Productos en el carrito
 * @param {Object} props.cliente - Información del cliente
 * @param {Function} props.onCompraFinalizada - Función a ejecutar cuando la compra finaliza
 * @param {Function} props.onVaciarCarrito - Función para vaciar el carrito después de la compra
 */
const ProcesoCompra = ({ productosCarrito, cliente, onCompraFinalizada, onVaciarCarrito }) => {
  const [compraProcesando, setCompraProcesando] = useState(false);
  const [ventaId, setVentaId] = useState(null);
  const [error, setError] = useState(null);

  // Calcular total de la compra
  const calcularTotal = () => {
    return productosCarrito.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad);
    }, 0);
  };

  // Manejar el proceso de compra
  const procesarCompra = async () => {
    try {
      setError(null);
      setCompraProcesando(true);

      // Preparar datos de la venta
      const nuevaVenta = {
        cliente: cliente.nombre, // Solo usar el nombre del cliente
        productos: productosCarrito.map(producto => ({
          id: producto.id,
          nombre: producto.nombre,
          cantidad: producto.cantidad,
          precioUnitario: producto.precio
        })),
        total: calcularTotal()
      };

      // Registrar la venta
      const resultado = await registrarVenta(nuevaVenta);

      if (resultado.success) {
        setVentaId(resultado.venta.id);
      } else {
        setError(resultado.error || 'Error al procesar la compra');
        setCompraProcesando(false);
      }
    } catch (err) {
      setError('Error al procesar la compra');
      setCompraProcesando(false);
      console.error(err);
    }
  };

  // Manejar cuando la compra es exitosa
  const handleCompraExitosa = (venta) => {
    // Vaciar carrito
    if (onVaciarCarrito) {
      onVaciarCarrito();
    }

    // Notificar que la compra ha finalizado
    if (onCompraFinalizada) {
      onCompraFinalizada(venta);
    }
  };

  // Si no hay productos en el carrito
  if (!productosCarrito || productosCarrito.length === 0) {
    return (
      <div className="text-center p-4">
        <p>No hay productos en el carrito</p>
      </div>
    );
  }

  return (
    <div className="proceso-compra bg-gray-50 p-6 rounded-lg shadow-sm">
      {!compraProcesando ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Resumen de compra</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Productos</h3>
            <ul className="divide-y divide-gray-200">
              {productosCarrito.map(producto => (
                <li key={producto.id} className="py-2 flex justify-between">
                  <div>
                    <span className="font-medium">{producto.nombre}</span>
                    <span className="text-gray-600 ml-2">x{producto.cantidad}</span>
                  </div>
                  <span>${(producto.precio * producto.cantidad).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${calcularTotal().toFixed(2)}</span>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <button 
            onClick={procesarCompra}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Confirmar Compra
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Procesando tu compra</h2>
          
          {ventaId ? (
            <EstadoCompra 
              ventaId={ventaId} 
              onCompraExitosa={handleCompraExitosa} 
            />
          ) : (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2">Iniciando proceso de compra...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProcesoCompra;