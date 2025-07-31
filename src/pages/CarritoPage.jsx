import React from 'react';
import EjemploCarritoCompra from '../components/ui/EjemploCarritoCompra';

const CarritoPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Carrito de Compras</h1>
      <EjemploCarritoCompra />
    </div>
  );
};

export default CarritoPage;