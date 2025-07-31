import React, { useState, useEffect } from 'react';
import { verificarEstadoVenta } from '../../services/dataService';

/**
 * Componente para mostrar el estado de una compra
 * @param {Object} props - Propiedades del componente
 * @param {number} props.ventaId - ID de la venta a verificar
 * @param {Function} props.onCompraExitosa - Función a ejecutar cuando la compra cambia a estado exitoso
 */
const EstadoCompra = ({ ventaId, onCompraExitosa }) => {
  const [estado, setEstado] = useState('Procesando');
  const [numeroSeguimiento, setNumeroSeguimiento] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [venta, setVenta] = useState(null);

  // Verificar estado inicial y configurar intervalo para actualizar
  useEffect(() => {
    let intervalId;

    const verificarEstado = async () => {
      try {
        setLoading(true);
        const resultado = await verificarEstadoVenta(ventaId);
        
        if (resultado.success) {
          setEstado(resultado.estado);
          setNumeroSeguimiento(resultado.numeroSeguimiento);
          setVenta(resultado.venta);
          
          // Si el estado cambia a Exitosa, ejecutar callback y detener intervalo
          if (resultado.estado === 'Exitosa' && onCompraExitosa) {
            onCompraExitosa(resultado.venta);
            clearInterval(intervalId);
          }
        } else {
          setError(resultado.error);
        }
      } catch (err) {
        setError('Error al verificar el estado de la compra');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Verificar estado inmediatamente
    verificarEstado();

    // Configurar intervalo para verificar cada 2 segundos
    intervalId = setInterval(verificarEstado, 2000);

    // Limpiar intervalo al desmontar
    return () => {
      clearInterval(intervalId);
    };
  }, [ventaId, onCompraExitosa]);

  // Renderizar diferentes estados
  const renderEstado = () => {
    if (loading && !venta) {
      return <div className="animate-pulse">Cargando información de la compra...</div>;
    }

    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Estado de tu compra</h3>
        
        <div className="mb-2">
          <span className="font-medium">Número de seguimiento:</span> 
          <span className="ml-2">{numeroSeguimiento}</span>
        </div>
        
        <div className="mb-4">
          <span className="font-medium">Estado:</span> 
          <span className={`ml-2 px-2 py-1 rounded-full text-sm ${getEstadoColor()}`}>
            {estado}
          </span>
        </div>
        
        {estado === 'Procesando' && (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
            <span className="text-sm text-gray-600">Tu compra está siendo procesada...</span>
          </div>
        )}
        
        {estado === 'Exitosa' && (
          <div className="text-green-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>¡Compra realizada con éxito!</span>
          </div>
        )}
      </div>
    );
  };

  // Obtener color según estado
  const getEstadoColor = () => {
    switch (estado) {
      case 'Procesando':
        return 'bg-yellow-100 text-yellow-800';
      case 'Exitosa':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="estado-compra">
      {renderEstado()}
    </div>
  );
};

export default EstadoCompra;