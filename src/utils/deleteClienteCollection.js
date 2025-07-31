import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';

// Cargar variables de entorno
dotenv.config();

async function deleteClienteCollection() {
  try {
    // Conectar a la base de datos
    const conn = await connectDB();
    
    // Eliminar la colección de clientes
    await conn.connection.db.dropCollection('clientes');
    console.log('Colección de clientes eliminada correctamente');
    
    // Cerrar la conexión
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada');
    
    process.exit(0);
  } catch (error) {
    if (error.code === 26) {
      console.log('La colección de clientes no existe o ya ha sido eliminada');
    } else {
      console.error('Error al eliminar la colección de clientes:', error);
    }
    
    // Cerrar la conexión en caso de error
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada');
    
    process.exit(error.code === 26 ? 0 : 1);
  }
}

// Ejecutar la función
deleteClienteCollection();