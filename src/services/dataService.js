/**
 * Servicio para manejar operaciones con datos JSON
 */

// Función para obtener productos
export const getProductos = async () => {
  try {
    const response = await fetch('/api/productos');
    if (!response.ok) {
      throw new Error('Error al cargar productos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getProductos:', error);
    return [];
  }
};

// Función para obtener un producto por ID
export const getProductoById = async (id) => {
  try {
    const productos = await getProductos();
    return productos.find(producto => producto.id === parseInt(id)) || null;
  } catch (error) {
    console.error('Error en getProductoById:', error);
    return null;
  }
};

// Función para guardar productos
export const saveProductos = async (productos) => {
  try {
    const response = await fetch('/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productos),
    });
    
    if (!response.ok) {
      throw new Error('Error al guardar productos');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en saveProductos:', error);
    return { success: false, error: error.message };
  }
};

// Función para agregar un producto
export const addProducto = async (producto) => {
  try {
    const productos = await getProductos();
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    const nuevoProducto = { ...producto, id: nuevoId };
    
    const nuevosProductos = [...productos, nuevoProducto];
    await saveProductos(nuevosProductos);
    
    return { success: true, producto: nuevoProducto };
  } catch (error) {
    console.error('Error en addProducto:', error);
    return { success: false, error: error.message };
  }
};

// Función para actualizar un producto
export const updateProducto = async (id, productoActualizado) => {
  try {
    const productos = await getProductos();
    const index = productos.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    
    productos[index] = { ...productos[index], ...productoActualizado };
    await saveProductos(productos);
    
    return { success: true, producto: productos[index] };
  } catch (error) {
    console.error('Error en updateProducto:', error);
    return { success: false, error: error.message };
  }
};

// Función para eliminar un producto
export const deleteProducto = async (id) => {
  try {
    const productos = await getProductos();
    const nuevosProductos = productos.filter(p => p.id !== parseInt(id));
    
    if (nuevosProductos.length === productos.length) {
      throw new Error('Producto no encontrado');
    }
    
    await saveProductos(nuevosProductos);
    
    return { success: true };
  } catch (error) {
    console.error('Error en deleteProducto:', error);
    return { success: false, error: error.message };
  }
};

// Función para obtener usuarios
export const getUsuarios = async () => {
  try {
    const response = await fetch('/api/usuarios');
    if (!response.ok) {
      throw new Error('Error al cargar usuarios');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getUsuarios:', error);
    return [];
  }
};

// Función para autenticar usuario
export const autenticarUsuario = async (usuario, contraseña) => {
  try {
    const usuarios = await getUsuarios();
    const usuarioEncontrado = usuarios.find(
      u => u.usuario === usuario && u.contraseña === contraseña
    );
    
    if (usuarioEncontrado) {
      return { success: true, usuario: usuarioEncontrado };
    } else {
      return { success: false, error: 'Usuario o contraseña incorrectos' };
    }
  } catch (error) {
    console.error('Error en autenticarUsuario:', error);
    return { success: false, error: error.message };
  }
};

// Función para registrar un nuevo usuario
export const registrarUsuario = async (nuevoUsuario) => {
  try {
    const usuarios = await getUsuarios();
    
    // Verificar si el usuario ya existe
    const usuarioExistente = usuarios.find(
      u => u.usuario === nuevoUsuario.usuario || u.email === nuevoUsuario.email
    );
    
    if (usuarioExistente) {
      return { 
        success: false, 
        error: 'El usuario o email ya está registrado' 
      };
    }
    
    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    const usuarioCompleto = { 
      ...nuevoUsuario, 
      id: nuevoId,
      rol: 'Cliente',
      estado: 'Activo',
      ultimoAcceso: new Date().toISOString().split('T')[0]
    };
    
    const nuevosUsuarios = [...usuarios, usuarioCompleto];
    
    // Guardar usuarios
    const response = await fetch('/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevosUsuarios),
    });
    
    if (!response.ok) {
      throw new Error('Error al guardar usuario');
    }
    
    return { success: true, usuario: usuarioCompleto };
  } catch (error) {
    console.error('Error en registrarUsuario:', error);
    return { success: false, error: error.message };
  }
};

// Función para obtener ventas
export const getVentas = async () => {
  try {
    const response = await fetch('/api/ventas');
    if (!response.ok) {
      throw new Error('Error al cargar ventas');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getVentas:', error);
    return [];
  }
};

// Función para obtener una venta por ID
export const getVentaById = async (id) => {
  try {
    const ventas = await getVentas();
    return ventas.find(venta => venta.id === parseInt(id)) || null;
  } catch (error) {
    console.error('Error en getVentaById:', error);
    return null;
  }
};

// Función para verificar el estado de una venta
export const verificarEstadoVenta = async (ventaId) => {
  try {
    const venta = await getVentaById(ventaId);
    if (!venta) {
      return { success: false, error: 'Venta no encontrada' };
    }
    
    return { 
      success: true, 
      estado: venta.estado,
      numeroSeguimiento: venta.numeroSeguimiento,
      venta: venta
    };
  } catch (error) {
    console.error('Error en verificarEstadoVenta:', error);
    return { success: false, error: error.message };
  }
};

// Función para registrar una nueva venta
export const registrarVenta = async (nuevaVenta) => {
  try {
    const ventas = await getVentas();
    const nuevoId = ventas.length > 0 ? Math.max(...ventas.map(v => v.id)) + 1 : 1;
    const numeroSeguimiento = `BM${String(100000 + nuevoId).substring(1)}`;
    
    // Crear venta con estado inicial "Procesando"
    const ventaCompleta = { 
      ...nuevaVenta, 
      id: nuevoId, 
      estado: "Procesando",
      numeroSeguimiento,
      fecha: new Date().toISOString().split('T')[0]
    };
    
    const nuevasVentas = [...ventas, ventaCompleta];
    
    // Guardar ventas
    const response = await fetch('/api/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevasVentas),
    });
    
    if (!response.ok) {
      throw new Error('Error al guardar venta');
    }
    
    // Actualizar stock de productos
    await actualizarStockProductos(ventaCompleta.productos);
    
    // Cambiar estado a "Exitosa" después de 5 segundos
    setTimeout(async () => {
      await actualizarEstadoVenta(nuevoId, "Exitosa");
    }, 5000);
    
    return { success: true, venta: ventaCompleta };
  } catch (error) {
    console.error('Error en registrarVenta:', error);
    return { success: false, error: error.message };
  }
};

// Función para actualizar el stock de productos después de una venta
const actualizarStockProductos = async (productosVendidos) => {
  try {
    const productos = await getProductos();
    
    // Actualizar stock de cada producto vendido
    productosVendidos.forEach(productoVendido => {
      const index = productos.findIndex(p => p.id === productoVendido.id);
      if (index !== -1) {
        productos[index].stock -= productoVendido.cantidad;
      }
    });
    
    // Guardar productos actualizados
    await saveProductos(productos);
    
    return { success: true };
  } catch (error) {
    console.error('Error en actualizarStockProductos:', error);
    return { success: false, error: error.message };
  }
};

// Función para actualizar el estado de una venta
export const actualizarEstadoVenta = async (ventaId, nuevoEstado) => {
  try {
    const ventas = await getVentas();
    const index = ventas.findIndex(v => v.id === parseInt(ventaId));
    
    if (index === -1) {
      throw new Error('Venta no encontrada');
    }
    
    ventas[index].estado = nuevoEstado;
    
    // Guardar ventas actualizadas
    const response = await fetch('/api/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ventas),
    });
    
    if (!response.ok) {
      throw new Error('Error al actualizar estado de venta');
    }
    
    console.log(`Venta #${ventaId} actualizada a estado: ${nuevoEstado}`);
    return { success: true, venta: ventas[index] };
  } catch (error) {
    console.error('Error en actualizarEstadoVenta:', error);
    return { success: false, error: error.message };
  }
};

// Función para obtener inventario
export const getInventario = async () => {
  try {
    const response = await fetch('/api/inventario');
    if (!response.ok) {
      throw new Error('Error al cargar inventario');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getInventario:', error);
    return [];
  }
};

// Función para registrar un movimiento de inventario
export const registrarMovimientoInventario = async (movimiento) => {
  try {
    const inventario = await getInventario();
    const nuevoId = inventario.length > 0 ? Math.max(...inventario.map(i => i.id)) + 1 : 1;
    const movimientoCompleto = { ...movimiento, id: nuevoId };
    
    const nuevoInventario = [...inventario, movimientoCompleto];
    
    // Guardar inventario
    const response = await fetch('/api/inventario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoInventario),
    });
    
    if (!response.ok) {
      throw new Error('Error al guardar movimiento de inventario');
    }
    
    // Actualizar stock del producto
    await actualizarStockPorMovimiento(movimientoCompleto);
    
    return { success: true, movimiento: movimientoCompleto };
  } catch (error) {
    console.error('Error en registrarMovimientoInventario:', error);
    return { success: false, error: error.message };
  }
};

// Función para actualizar el stock de un producto por movimiento de inventario
const actualizarStockPorMovimiento = async (movimiento) => {
  try {
    const productos = await getProductos();
    const productoIndex = productos.findIndex(p => p.nombre === movimiento.producto);
    
    if (productoIndex === -1) {
      throw new Error('Producto no encontrado');
    }
    
    // Actualizar stock según el tipo de movimiento
    if (movimiento.movimiento === 'Entrada') {
      productos[productoIndex].stock += movimiento.cantidad;
    } else if (movimiento.movimiento === 'Salida') {
      productos[productoIndex].stock -= movimiento.cantidad;
    }
    
    // Guardar productos actualizados
    await saveProductos(productos);
    
    return { success: true };
  } catch (error) {
    console.error('Error en actualizarStockPorMovimiento:', error);
    return { success: false, error: error.message };
  }
};

// Función para obtener clientes
export const getClientes = async () => {
  try {
    const response = await fetch('/src/data/clientes.json');
    if (!response.ok) {
      throw new Error('Error al cargar clientes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getClientes:', error);
    return [];
  }
};

// Función para agregar un cliente
export const addCliente = async (cliente) => {
  try {
    const clientes = await getClientes();
    const nuevoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
    const nuevoCliente = { 
      ...cliente, 
      id: nuevoId,
      compras: 0,
      total: 0
    };
    
    const nuevosClientes = [...clientes, nuevoCliente];
    
    // Guardar clientes
    const response = await fetch('/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevosClientes),
    });
    
    if (!response.ok) {
      throw new Error('Error al guardar cliente');
    }
    
    return { success: true, cliente: nuevoCliente };
  } catch (error) {
    console.error('Error en addCliente:', error);
    return { success: false, error: error.message };
  }
};

// Función para actualizar un cliente
export const updateCliente = async (id, clienteActualizado) => {
  try {
    const clientes = await getClientes();
    const index = clientes.findIndex(c => c.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Cliente no encontrado');
    }
    
    clientes[index] = { ...clientes[index], ...clienteActualizado };
    
    // Guardar clientes
    const response = await fetch('/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientes),
    });
    
    if (!response.ok) {
      throw new Error('Error al actualizar cliente');
    }
    
    return { success: true, cliente: clientes[index] };
  } catch (error) {
    console.error('Error en updateCliente:', error);
    return { success: false, error: error.message };
  }
};