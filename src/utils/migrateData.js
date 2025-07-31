import fs from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/db.js';

// Importar modelos
import Usuario from '../models/Usuario.js';
import Producto from '../models/Producto.js';
import Venta from '../models/Venta.js';
import Inventario from '../models/Inventario.js';
import Cliente from '../models/Cliente.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Función para leer un archivo JSON
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error al leer el archivo ${filePath}:`, error);
    return [];
  }
}

// Función para migrar datos
async function migrateData() {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    // Migrar usuarios
    const usuariosData = await readJsonFile(join(__dirname, '../../src/data/usuarios.json'));
    if (usuariosData.length > 0) {
      await Usuario.deleteMany({}); // Limpiar colección existente
      
      // Transformar datos de usuarios para que coincidan con el esquema
      const usuariosTransformados = usuariosData.map(usuario => {
        // Si existe contraseña, asignarla a password
        if (usuario.contraseña) {
          usuario.password = usuario.contraseña;
        }
        return usuario;
      });
      
      await Usuario.insertMany(usuariosTransformados);
      console.log(`${usuariosData.length} usuarios migrados correctamente`);
    }
    
    // Migrar productos
    const productosData = await readJsonFile(join(__dirname, '../../src/data/productos.json'));
    if (productosData.length > 0) {
      await Producto.deleteMany({});
      await Producto.insertMany(productosData);
      console.log(`${productosData.length} productos migrados correctamente`);
    }
    
    // Migrar ventas
    const ventasData = await readJsonFile(join(__dirname, '../../src/data/ventas.json'));
    if (ventasData.length > 0) {
      await Venta.deleteMany({});
      await Venta.insertMany(ventasData);
      console.log(`${ventasData.length} ventas migradas correctamente`);
    }
    
    // Migrar inventario
    const inventarioData = await readJsonFile(join(__dirname, '../../src/data/inventario.json'));
    if (inventarioData.length > 0) {
      await Inventario.deleteMany({});
      await Inventario.insertMany(inventarioData);
      console.log(`${inventarioData.length} items de inventario migrados correctamente`);
    }
    
    // Migrar clientes
    const clientesData = await readJsonFile(join(__dirname, '../../src/data/clientes.json'));
    if (clientesData.length > 0) {
      await Cliente.deleteMany({});
      await Cliente.insertMany(clientesData);
      console.log(`${clientesData.length} clientes migrados correctamente`);
    }
    
    console.log('Migración completada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error durante la migración:', error);
    process.exit(1);
  }
}

// Ejecutar la migración
migrateData();