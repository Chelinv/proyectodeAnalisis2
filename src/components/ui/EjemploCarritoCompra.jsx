import React, { useState, useEffect } from 'react';
import { getProductos } from '../../services/dataService';
import ProcesoCompra from './ProcesoCompra';

/**
 * Componente de ejemplo que muestra cómo implementar el proceso de compra
 */
const EjemploCarritoCompra = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarProceso, setMostrarProceso] = useState(false);
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [ventaCompletada, setVentaCompletada] = useState(null);

  // Obtener información del cliente autenticado
  const [clienteInfo, setClienteInfo] = useState({
    id: parseInt(localStorage.getItem("userId")) || 0,
    nombre: localStorage.getItem("userName") || 'Cliente'
  });

  // Cargar productos
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        setError('Error al cargar productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      // Verificar si el producto ya está en el carrito
      const productoExistente = prevCarrito.find(item => item.id === producto.id);

      if (productoExistente) {
        // Incrementar cantidad si ya existe
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Agregar nuevo producto al carrito
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (productoId) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== productoId));
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Manejar finalización de compra
  const handleCompraFinalizada = (venta) => {
    setCompraFinalizada(true);
    setVentaCompletada(venta);
    setTimeout(() => {
      setMostrarProceso(false);
    }, 3000);
  };

  // Reiniciar proceso
  const reiniciarProceso = () => {
    setCompraFinalizada(false);
    setVentaCompletada(null);
  };

  if (loading) {
    return <div className="text-center p-8">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Ejemplo de Carrito de Compras</h1>

      {compraFinalizada && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-bold">¡Compra realizada con éxito!</span>
          </div>
          <p className="mt-2">Tu número de seguimiento es: {ventaCompletada?.numeroSeguimiento}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lista de productos */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Productos disponibles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {productos.map(producto => (
              <div key={producto.id} className="border rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-lg">{producto.nombre}</h3>
                <p className="text-gray-600 mb-2">{producto.descripcion}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold">${producto.precio.toFixed(2)}</span>
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                    disabled={producto.stock <= 0}
                  >
                    {producto.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carrito y proceso de compra */}
        <div>
          {!mostrarProceso ? (
            <div className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Carrito de compras</h2>
              
              {carrito.length === 0 ? (
                <p className="text-gray-500">Tu carrito está vacío</p>
              ) : (
                <>
                  <ul className="divide-y">
                    {carrito.map(item => (
                      <li key={item.id} className="py-2 flex justify-between items-center">
                        <div>
                          <span>{item.nombre}</span>
                          <span className="text-gray-600 text-sm ml-2">x{item.cantidad}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">${(item.precio * item.cantidad).toFixed(2)}</span>
                          <button
                            onClick={() => eliminarDelCarrito(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>
                        ${carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-col space-y-2">
                    <button
                      onClick={() => setMostrarProceso(true)}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
                    >
                      Proceder al pago
                    </button>
                    
                    <button
                      onClick={vaciarCarrito}
                      className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-1 px-4 rounded transition text-sm"
                    >
                      Vaciar carrito
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <ProcesoCompra
              productosCarrito={carrito}
              cliente={clienteInfo}
              onCompraFinalizada={handleCompraFinalizada}
              onVaciarCarrito={vaciarCarrito}
            />
          )}
        </div>
      </div>

      {compraFinalizada && (
        <div className="mt-6 text-center">
          <button
            onClick={reiniciarProceso}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition"
          >
            Realizar otra compra
          </button>
        </div>
      )}
    </div>
  );
};

export default EjemploCarritoCompra;