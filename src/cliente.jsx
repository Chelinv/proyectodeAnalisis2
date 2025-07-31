import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import {
  Package,
  User,
  ShoppingCart,
  Search,
  Eye,
  Plus,
  HelpCircle,
  LogOut,
  Star,
  Minus,
  X,
  Truck,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

export default function ClientePage() {
  const [productos, setProductos] = useState([])
  const [productosFiltrados, setProductosFiltrados] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [categoriaActiva, setCategoriaActiva] = useState("Todos")
  const [carrito, setCarrito] = useState([])
  const [mostrarDetalles, setMostrarDetalles] = useState(null)
  const [seccionActiva, setSeccionActiva] = useState("catalogo")
  const [compras, setCompras] = useState([])
  const [mostrarCarrito, setMostrarCarrito] = useState(false)
  const [cargandoProductos, setCargandoProductos] = useState(true)
  const [cargandoCompras, setCargandoCompras] = useState(true)
  const [error, setError] = useState("")
  const [usuario, setUsuario] = useState(null)
  const navigate = useNavigate()

  // Verificar autenticación
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")
    const userId = localStorage.getItem("userId")
    
    if (!isAuthenticated || (userRole !== "cliente" && userRole !== "Cliente")) {
      navigate("/login")
    } else {
      // Cargar información del usuario
      const cargarUsuario = async () => {
        try {
          const response = await axios.get('/api/usuarios')
          const usuarios = response.data
          const usuarioActual = usuarios.find(u => u.id === parseInt(userId))
          if (usuarioActual) {
            setUsuario(usuarioActual)
          } else {
            // Si no se encuentra el usuario, cerrar sesión
            localStorage.removeItem("isAuthenticated")
            localStorage.removeItem("userRole")
            localStorage.removeItem("userId")
            localStorage.removeItem("userName")
            navigate("/login")
          }
        } catch (err) {
          console.error("Error al cargar información del usuario:", err)
        }
      }
      
      cargarUsuario()
    }
  }, [navigate])

  // Cargar productos
  useEffect(() => {
    const cargarProductos = async () => {
      setCargandoProductos(true)
      setError("")
      
      try {
        const response = await axios.get('/api/productos')
        setProductos(response.data)
      } catch (err) {
        console.error("Error al cargar productos:", err)
        setError("Error al cargar productos. Usando datos de respaldo.")
        // Usar datos de respaldo
        setProductos([
          {
            id: 1,
            nombre: "Cuaderno Universitario 100 hojas",
            categoria: "Papelería",
            precio: 2.5,
            stock: 150,
            descripcion: "Cuaderno universitario de 100 hojas rayadas, tapa dura",
            rating: 4.5,
          },
          {
            id: 2,
            nombre: "Lápiz HB Faber-Castell",
            categoria: "Papelería",
            precio: 0.5,
            stock: 300,
            descripcion: "Lápiz de grafito HB de alta calidad",
            rating: 4.8,
          },
          {
            id: 3,
            nombre: "Set de Colores 24 unidades",
            categoria: "Regalos",
            precio: 8.75,
            stock: 45,
            descripcion: "Set de colores de madera con 24 tonalidades diferentes",
            rating: 4.3,
          },
          {
            id: 4,
            nombre: "Grapadora Metálica",
            categoria: "Oficina",
            precio: 12.0,
            stock: 25,
            descripcion: "Grapadora metálica resistente para uso profesional",
            rating: 4.6,
          },
          {
            id: 5,
            nombre: "Borrador Blanco Pelikan",
            categoria: "Papelería",
            precio: 0.75,
            stock: 200,
            descripcion: "Borrador blanco suave que no daña el papel",
            rating: 4.2,
          },
          {
            id: 6,
            nombre: "Agenda 2024 Ejecutiva",
            categoria: "Regalos",
            precio: 15.5,
            stock: 30,
            descripcion: "Agenda ejecutiva con calendario y notas",
            rating: 4.7,
          },
          {
            id: 7,
            nombre: "Calculadora Científica",
            categoria: "Oficina",
            precio: 25.0,
            stock: 15,
            descripcion: "Calculadora científica con funciones avanzadas",
            rating: 4.4,
          },
          {
            id: 8,
            nombre: "Marcadores Permanentes x6",
            categoria: "Oficina",
            precio: 6.25,
            stock: 80,
            descripcion: "Set de 6 marcadores permanentes de colores básicos",
            rating: 4.1,
          },
        ])
      } finally {
        setCargandoProductos(false)
      }
    }
    
    cargarProductos()
  }, [])

  // Cargar compras del cliente
  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const userName = localStorage.getItem("userName")
    if (!userId || !userName) return
    
    const cargarCompras = async () => {
      setCargandoCompras(true)
      
      try {
        const response = await axios.get('/api/ventas')
        const ventas = response.data
        // Filtrar ventas por nombre del cliente
        const comprasCliente = ventas.filter(venta => 
          venta.cliente === userName
        )
        
        if (comprasCliente.length > 0) {
          setCompras(comprasCliente)
        } else {
          // Si no hay compras en la API, usar datos de respaldo
          setCompras([
            {
              id: 1,
              fecha: "2024-01-15",
              productos: [
                { nombre: "Cuaderno Universitario 100 hojas", cantidad: 2, precioUnitario: 2.5 },
                { nombre: "Lápiz HB Faber-Castell", cantidad: 5, precioUnitario: 0.5 },
              ],
              total: 7.5,
              estado: "Entregado",
              numeroSeguimiento: "BM001234",
            },
            {
              id: 2,
              fecha: "2024-01-10",
              productos: [
                { nombre: "Set de Colores 24 unidades", cantidad: 1, precioUnitario: 8.75 },
                { nombre: "Borrador Blanco Pelikan", cantidad: 3, precioUnitario: 0.75 },
              ],
              total: 11.0,
              estado: "En tránsito",
              numeroSeguimiento: "BM001235",
            },
            {
              id: 3,
              fecha: "2024-01-05",
              productos: [{ nombre: "Grapadora Metálica", cantidad: 1, precioUnitario: 12.0 }],
              total: 12.0,
              estado: "Procesando",
              numeroSeguimiento: "BM001236",
            },
          ])
        }
      } catch (err) {
        console.error("Error al cargar compras:", err)
        // Usar datos de respaldo
        setCompras([
          {
            id: 1,
            fecha: "2024-01-15",
            productos: [
              { nombre: "Cuaderno Universitario 100 hojas", cantidad: 2, precioUnitario: 2.5 },
              { nombre: "Lápiz HB Faber-Castell", cantidad: 5, precioUnitario: 0.5 },
            ],
            total: 7.5,
            estado: "Entregado",
            numeroSeguimiento: "BM001234",
          },
          {
            id: 2,
            fecha: "2024-01-10",
            productos: [
              { nombre: "Set de Colores 24 unidades", cantidad: 1, precioUnitario: 8.75 },
              { nombre: "Borrador Blanco Pelikan", cantidad: 3, precioUnitario: 0.75 },
            ],
            total: 11.0,
            estado: "En tránsito",
            numeroSeguimiento: "BM001235",
          },
          {
            id: 3,
            fecha: "2024-01-05",
            productos: [{ nombre: "Grapadora Metálica", cantidad: 1, precioUnitario: 12.0 }],
            total: 12.0,
            estado: "Procesando",
            numeroSeguimiento: "BM001236",
          },
        ])
      } finally {
        setCargandoCompras(false)
      }
    }
    
    cargarCompras()
  }, [])

  // Filtrar productos
  useEffect(() => {
    let filtrados = productos

    // Filtrar por búsqueda
    if (busqueda) {
      filtrados = filtrados.filter((producto) => producto.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    }

    // Filtrar por categoría
    if (categoriaActiva !== "Todos") {
      filtrados = filtrados.filter((producto) => producto.categoria === categoriaActiva)
    }

    setProductosFiltrados(filtrados)
  }, [busqueda, categoriaActiva, productos])

  const handleCerrarSesion = () => {
    // ===================== MODIFICACIÓN ASISTENTE: LIMPIAR COMPLETAMENTE EL LOCALSTORAGE =====================
    // Limpiar todos los datos de sesión para evitar conflictos
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    // Limpiar cualquier otro dato que pueda estar causando conflictos
    localStorage.clear()
    // ===================== FIN MODIFICACIÓN ASISTENTE =====================
    navigate("/")
  }

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item.id === producto.id)
    if (productoExistente) {
      setCarrito(carrito.map((item) => (item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)))
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }])
    }
  }

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      setCarrito(carrito.filter((item) => item.id !== id))
    } else {
      setCarrito(carrito.map((item) => (item.id === id ? { ...item, cantidad: nuevaCantidad } : item)))
    }
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const procesarCompra = async () => {
    if (carrito.length === 0) return
    
    const userId = localStorage.getItem("userId")
    const userName = localStorage.getItem("userName")
    
    if (!userId) {
      alert("Debe iniciar sesión para realizar una compra")
      return
    }
    
    try {
      // Obtener datos actuales de ventas
      const responseVentas = await axios.get('/api/ventas')
      const ventas = responseVentas.data
      
      // Obtener datos actuales de usuarios con rol Cliente
      const responseUsuarios = await axios.get('/api/usuarios')
      const usuarios = responseUsuarios.data
      
      // Buscar usuario actual
      let cliente = usuarios.find(u => u.id === parseInt(userId) && u.rol.toLowerCase() === 'cliente')
      
      if (!cliente) {
        // Si no se encuentra el cliente, redirigir al login
        alert("Debe iniciar sesión como cliente para realizar una compra")
        navigate("/login")
        return
      } else {
        // Asegurar que el cliente tenga la información actualizada
        if (usuario?.nombre && cliente.nombre !== usuario.nombre) {
          cliente.nombre = usuario.nombre
        }
      }
      
      // Crear nueva venta
      const nuevaVenta = {
        id: ventas.length > 0 ? Math.max(...ventas.map(v => v.id)) + 1 : 1,
        cliente: cliente.nombre, // Usar el nombre del cliente
        productos: carrito.map(item => ({
          id: item.id || 0,
          nombre: item.nombre || 'Producto sin nombre',
          cantidad: item.cantidad || 1,
          precioUnitario: item.precio || 0
        })).filter(item => item.nombre && item.id), // Filtrar productos inválidos
        total: parseFloat(totalCarrito.toFixed(2)), // Asegurar que sea un número con 2 decimales
        fecha: new Date().toISOString().split("T")[0],
        estado: "Procesando"
        // Dejar que el servidor genere el número de seguimiento
      }
      
      // Guardar la nueva venta
      console.log('Enviando datos de venta:', JSON.stringify(nuevaVenta, null, 2));
      try {
        // Usar la ruta correcta del API para guardar la venta
        const respuestaVenta = await axios.post('/api/ventas', nuevaVenta);
        console.log('Respuesta del servidor (venta):', respuestaVenta.data);
        
        if (!respuestaVenta.data.success) {
          throw new Error(respuestaVenta.data.error || 'Error al crear la venta');
        }
      } catch (error) {
        console.error('Error al crear la venta:', error);
        throw error; // Propagar el error para que sea manejado por el catch principal
      }
      
      // Actualizar inventario
      const responseInventario = await axios.get('/api/inventario')
      const inventario = responseInventario.data
      
      // Registrar movimientos de inventario para cada producto
      const nuevosMovimientos = carrito.map(item => ({
        id: inventario.length > 0 ? Math.max(...inventario.map(i => i.id)) + 1 : 1,
        producto: item.nombre,
        tipo: "Salida",
        cantidad: item.cantidad,
        fecha: new Date().toISOString().split("T")[0],
        motivo: `Venta #${nuevaVenta.id}`
      }))
      
      await axios.post('/api/inventario', [...inventario, ...nuevosMovimientos])
      
      // Actualizar productos (reducir stock)
      const responseProductos = await axios.get('/api/productos')
      const productos = responseProductos.data
      
      const productosActualizados = productos.map(producto => {
        const itemCarrito = carrito.find(item => item.id === producto.id)
        if (itemCarrito) {
          return {
            ...producto,
            stock: producto.stock - itemCarrito.cantidad
          }
        }
        return producto
      })
      
      await axios.post('/api/productos', productosActualizados)
      
      // Actualizar cliente
      // La actualización del cliente ahora se maneja en el servidor cuando se crea la venta
      // No es necesario enviar la actualización del cliente desde aquí
      
      // Actualizar estado local
      setCompras([nuevaVenta, ...compras])
      setCarrito([])
      setMostrarCarrito(false)
      
      // Recargar productos para actualizar stock
      const newProductsResponse = await axios.get('/api/productos')
      setProductos(newProductsResponse.data)
      
      alert("¡Compra realizada exitosamente!")
    } catch (err) {
      console.error("Error al procesar la compra:", err)
      
      // Mostrar mensaje de error más descriptivo
      let mensajeError = "Error al procesar la compra. Por favor, intente nuevamente.";
      
      if (err.response) {
        // El servidor respondió con un código de error
        console.error("Respuesta del servidor:", err.response.data);
        
        if (err.response.data && err.response.data.error) {
          mensajeError = `Error: ${err.response.data.error}`;
          
          if (err.response.data.message) {
            mensajeError += `\n${err.response.data.message}`;
          }
          
          if (err.response.data.detalles && Array.isArray(err.response.data.detalles)) {
            mensajeError += `\n${err.response.data.detalles.join('\n')}`;
          }
        }
      }
      
      alert(mensajeError)
    }
  }

  const categorias = ["Todos", "Papelería", "Regalos", "Oficina"]
  const totalCarrito = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)
  const cantidadCarrito = carrito.reduce((total, item) => total + item.cantidad, 0)

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Entregado":
        return "bg-gray-200 text-gray-800"
      case "En tránsito":
        return "bg-gray-300 text-gray-700"
      case "Procesando":
        return "bg-gray-400 text-white"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "Entregado":
        return <CheckCircle className="h-4 w-4" />
      case "En tránsito":
        return <Truck className="h-4 w-4" />
      case "Procesando":
        return <Clock className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  // Modal del carrito
  const renderCarrito = () => {
    if (!mostrarCarrito) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Mi Carrito</h3>
            <Button variant="ghost" onClick={() => setMostrarCarrito(false)} className="p-1">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {carrito.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {carrito.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.nombre}</h4>
                        <p className="text-gray-600">${item.precio.toFixed(2)} c/u</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 border-gray-300"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.cantidad}</span>
                        <Button
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 border-gray-300"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="font-semibold text-gray-800 w-16 text-right">
                        ${(item.precio * item.cantidad).toFixed(2)}
                      </span>
                      <Button
                        onClick={() => eliminarDelCarrito(item.id)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-xl font-bold text-gray-900">${totalCarrito.toFixed(2)}</span>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={vaciarCarrito}
                    variant="outline"
                    className="flex-1 border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent"
                  >
                    Vaciar Carrito
                  </Button>
                  <Button onClick={procesarCompra} className="flex-1 bg-gray-700 text-white hover:bg-gray-800">
                    Procesar Compra
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  // Renderizar contenido según sección activa
  const renderContenido = () => {
    switch (seccionActiva) {
      case "catalogo":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Lista de Productos</h2>

            {/* Filtros */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Barra de búsqueda */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10 border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
                <Button className="bg-gray-700 text-white hover:bg-gray-800">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Categorías */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 mr-4">Categorías:</span>
                {categorias.map((categoria) => (
                  <Button
                    key={categoria}
                    onClick={() => setCategoriaActiva(categoria)}
                    variant={categoriaActiva === categoria ? "default" : "outline"}
                    className={
                      categoriaActiva === categoria
                        ? "bg-gray-700 text-white hover:bg-gray-800"
                        : "border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent"
                    }
                  >
                    {categoria}
                  </Button>
                ))}
              </div>
            </div>

            {/* Estado de carga */}
            {cargandoProductos ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Cargando productos...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              /* Lista de productos */
              <div className="space-y-4">
                {productosFiltrados.map((producto) => (
                  <div key={producto.id} className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{producto.nombre}</h3>
                          <p className="text-gray-600 text-sm mb-2">{producto.descripcion}</p>
                          <div className="flex items-center space-x-4">
                            <span className="text-xl font-bold text-gray-900">${producto.precio.toFixed(2)}</span>
                            <span className="text-sm text-gray-500">Stock: {producto.stock}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-gray-400 text-gray-400" />
                              <span className="text-sm text-gray-600">{producto.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          onClick={() => setMostrarDetalles(mostrarDetalles === producto.id ? null : producto.id)}
                          variant="outline"
                          className="border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalles
                        </Button>
                        <Button
                          onClick={() => agregarAlCarrito(producto)}
                          className="bg-gray-700 text-white hover:bg-gray-800"
                          disabled={producto.stock === 0}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Añadir
                        </Button>
                      </div>
                    </div>

                    {/* Detalles expandidos */}
                    {mostrarDetalles === producto.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Información del Producto</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>
                                <strong>Categoría:</strong> {producto.categoria}
                              </li>
                              <li>
                                <strong>Stock disponible:</strong> {producto.stock} unidades
                              </li>
                              <li>
                                <strong>Calificación:</strong> {producto.rating}/5 estrellas
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Descripción</h4>
                            <p className="text-sm text-gray-600">{producto.descripcion}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Mensaje si no hay productos */}
            {!cargandoProductos && productosFiltrados.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No se encontraron productos</h3>
                <p className="text-gray-600">Intenta con otros términos de búsqueda o categorías</p>
              </div>
            )}
          </div>
        )

      case "compras":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Mis Compras</h2>

            {cargandoCompras ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Cargando historial de compras...</p>
              </div>
            ) : compras.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No tienes compras registradas</h3>
                <p className="text-gray-600">Cuando realices tu primera compra, aparecerá aquí</p>
              </div>
            ) : (
              <div className="space-y-4">
                {compras.map((compra) => (
                  <div key={compra.id} className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Pedido #{compra.numeroSeguimiento}</h3>
                        <p className="text-gray-600 text-sm">Fecha: {compra.fecha}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getEstadoColor(compra.estado)}`}
                        >
                          {getEstadoIcon(compra.estado)}
                          <span>{compra.estado}</span>
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium text-gray-800">Productos:</h4>
                      {compra.productos.map((producto, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">
                            {producto.nombre} x{producto.cantidad}
                          </span>
                          <span className="text-gray-800 font-medium">
                            ${(producto.precioUnitario * producto.cantidad).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-lg font-semibold text-gray-800">Total: ${compra.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case "ayuda":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Centro de Ayuda</h2>

            {/* Información de contacto */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Teléfono</p>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600">info@bazarmarlene.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Dirección</p>
                    <p className="text-gray-600">Av. Principal 123</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horarios de atención */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Horarios de Atención</h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Lunes a Viernes:</strong> 8:00 AM - 7:00 PM
                </p>
                <p>
                  <strong>Sábados:</strong> 9:00 AM - 5:00 PM
                </p>
                <p>
                  <strong>Domingos:</strong> Cerrado
                </p>
              </div>
            </div>

            {/* Preguntas frecuentes */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Preguntas Frecuentes</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">¿Cómo puedo realizar una compra?</h4>
                  <p className="text-gray-600 text-sm">
                    Navega por nuestro catálogo, añade productos a tu carrito y procesa la compra. Recibirás un número
                    de seguimiento para rastrear tu pedido.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">¿Cuáles son los métodos de pago?</h4>
                  <p className="text-gray-600 text-sm">
                    Aceptamos efectivo, tarjetas de débito y crédito, y transferencias bancarias.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">¿Hacen entregas a domicilio?</h4>
                  <p className="text-gray-600 text-sm">
                    Sí, realizamos entregas en la ciudad. El costo de envío se calcula según la distancia.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">¿Puedo devolver un producto?</h4>
                  <p className="text-gray-600 text-sm">
                    Aceptamos devoluciones dentro de los 7 días posteriores a la compra, siempre que el producto esté en
                    perfectas condiciones.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">¿Cómo puedo rastrear mi pedido?</h4>
                  <p className="text-gray-600 text-sm">
                    Puedes ver el estado de tus pedidos en la sección "Mis Compras" o contactarnos con tu número de
                    seguimiento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-800 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Bazar Doña Marlene</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleCerrarSesion}
              variant="outline"
              className="border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Navegación */}
      <nav className="bg-gray-200 border-b border-gray-300">
        <div className="px-6 py-4">
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => setSeccionActiva("catalogo")}
              className={
                seccionActiva === "catalogo"
                  ? "bg-gray-700 text-white hover:bg-gray-800"
                  : "bg-transparent text-gray-700 hover:bg-gray-300"
              }
            >
              <Package className="h-4 w-4 mr-2" />
              Catálogo
            </Button>
            <Button
              onClick={() => setMostrarCarrito(true)}
              variant="outline"
              className="border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent relative"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Carrito
              {cantidadCarrito > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cantidadCarrito}
                </span>
              )}
            </Button>
            <Button
              onClick={() => setSeccionActiva("compras")}
              className={
                seccionActiva === "compras"
                  ? "bg-gray-700 text-white hover:bg-gray-800"
                  : "bg-transparent text-gray-700 hover:bg-gray-300"
              }
            >
              <Package className="h-4 w-4 mr-2" />
              Mis Compras
            </Button>
            <Button
              onClick={() => setSeccionActiva("ayuda")}
              className={
                seccionActiva === "ayuda"
                  ? "bg-gray-700 text-white hover:bg-gray-800"
                  : "bg-transparent text-gray-700 hover:bg-gray-300"
              }
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Ayuda
            </Button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">{renderContenido()}</div>
      </main>

      {/* Modal del carrito */}
      {renderCarrito()}
    </div>
  )
}
