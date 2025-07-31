import React from "react"

import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import {
  Package,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  Users,
  BarChart3,
  ShoppingCart,
  Archive,
  Settings,
  X,
  Download,
} from "lucide-react"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

// Datos iniciales vacíos
const productosDataInicial = []
const inventarioDataInicial = []
const ventasDataInicial = []
const usuariosDataInicial = []

export default function AdminPage() {
  const [seccionActiva, setSeccionActiva] = useState("productos")
  const [productos, setProductos] = useState([])
  const [inventario, setInventario] = useState([])
  const [ventas, setVentas] = useState([])
  const [usuarios, setUsuarios] = useState(usuariosDataInicial)
  const [busqueda, setBusqueda] = useState("")
  const [modalAbierto, setModalAbierto] = useState(false)
  const [tipoModal, setTipoModal] = useState("")
  const [itemSeleccionado, setItemSeleccionado] = useState(null)
  const [formData, setFormData] = useState({})
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [mensaje, setMensaje] = useState("")
  const navigate = useNavigate()

  // Verificar autenticación y cargar datos
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")
    
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    
    if (userRole !== "administrador" && userRole !== "admin") {
      navigate("/")
      return
    }
    
    // Cargar todos los datos necesarios
    const cargarDatos = async () => {
      setCargando(true)
      setError("")
      
      try {
        // Cargar productos
        const resProductos = await axios.get('/api/productos')
        setProductos(resProductos.data)
        
        // Cargar inventario
        const resInventario = await axios.get('/api/inventario')
        setInventario(resInventario.data)
        
        // Cargar ventas
        const resVentas = await axios.get('/api/ventas')
        setVentas(resVentas.data)
        
        // Cargar usuarios
        const resUsuarios = await axios.get('/api/usuarios')
        setUsuarios(resUsuarios.data)
      } catch (err) {
        console.error("Error al cargar datos:", err)
        setError("Error al cargar los datos. Por favor, intente nuevamente.")
      } finally {
        setCargando(false)
      }
    }
    
    cargarDatos()
  }, [navigate])

  const handleCerrarSesion = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    navigate("/")
  }
  
  // Función para generar PDF con las ventas
  const generarPDFVentas = () => {
    // Crear nuevo documento PDF
    const doc = new jsPDF();
    
    // Configurar título
    doc.setFontSize(18);
    doc.text("Reporte de Ventas - Bazar Doña Marlene", 14, 22);
    
    // Agregar fecha actual
    const fecha = new Date().toLocaleDateString();
    doc.setFontSize(11);
    doc.text(`Fecha de generación: ${fecha}`, 14, 30);
    
    // Preparar datos para la tabla
    const tableColumn = ["ID", "Cliente", "Productos", "Total", "Fecha"];
    const tableRows = [];
    
    ventas.forEach(venta => {
      let productosTexto = "";
      
      // Formatear productos
      if (Array.isArray(venta.productos)) {
        productosTexto = venta.productos
          .map(p => `${p.nombre} x${p.cantidad}`)
          .join(", ");
      } else {
        productosTexto = venta.productos || "Sin productos";
      }
      
      // Limitar longitud del texto de productos
      if (productosTexto.length > 30) {
        productosTexto = productosTexto.substring(0, 27) + "...";
      }
      
      const ventaData = [
        venta.id.toString().substring(0, 8),
        venta.cliente,
        productosTexto,
        `$${venta.total.toFixed(2)}`,
        venta.fecha || fecha
      ];
      tableRows.push(ventaData);
    });
    
    // Generar tabla automática
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 40 },
        2: { cellWidth: 60 },
        3: { cellWidth: 25 },
        4: { cellWidth: 30 }
      },
      headStyles: { fillColor: [66, 66, 66] }
    });
    
    // Agregar pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Página ${i} de ${pageCount} - Bazar Doña Marlene - Documento generado automáticamente`,
        doc.internal.pageSize.width / 2, 
        doc.internal.pageSize.height - 10, 
        { align: "center" }
      );
    }
    
    // Guardar el PDF
    doc.save(`Ventas_BazarDonaMarlene_${fecha.replace(/\//g, "-")}.pdf`);
  }

  const abrirModal = (tipo, item) => {
    setTipoModal(tipo)
    setItemSeleccionado(item)
    setFormData(item || {})
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setTipoModal("")
    setItemSeleccionado(null)
    setFormData({})
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)
    setError("")

    try {
      switch (seccionActiva) {
        case "productos":
          if (tipoModal === "nuevo") {
            // Crear nuevo producto
            const nuevoProducto = {
              id: Date.now() + Math.random(), // Generar ID único más robusto
              ...formData,
              precio: Number.parseFloat(formData.precio),
              stock: Number.parseInt(formData.stock),
            }
            
            // Actualizar en el servidor
            const productosActualizados = [...productos, nuevoProducto]
            await axios.post('/api/productos', productosActualizados)
            setProductos(productosActualizados)
            
            // Registrar en inventario
            const nuevoMovimiento = {
              id: Date.now() + Math.random(),
              producto: nuevoProducto.nombre,
              movimiento: "Entrada",
              cantidad: nuevoProducto.stock,
              fecha: new Date().toISOString().split('T')[0],
              motivo: "Nuevo producto"
            }
            
            const inventarioActualizado = [...inventario, nuevoMovimiento]
            await axios.post('/api/inventario', inventarioActualizado)
            setInventario(inventarioActualizado)
            
          } else if (tipoModal === "editar") {
            // Editar producto existente
            const productoAnterior = productos.find(p => p.id === itemSeleccionado.id)
            const productosActualizados = productos.map((p) =>
              p.id === itemSeleccionado.id
                ? {
                    ...p,
                    ...formData,
                    precio: Number.parseFloat(formData.precio),
                    stock: Number.parseInt(formData.stock),
                  }
                : p
            )
            
            await axios.post('/api/productos', productosActualizados)
            setProductos(productosActualizados)
            
            // Si cambió el stock, registrar en inventario
            const stockAnterior = productoAnterior.stock
            const stockNuevo = Number.parseInt(formData.stock)
            
            if (stockAnterior !== stockNuevo) {
              const diferencia = stockNuevo - stockAnterior
              const nuevoMovimiento = {
                id: Date.now() + Math.random(),
                producto: productoAnterior.nombre,
                movimiento: diferencia > 0 ? "Entrada" : "Salida",
                cantidad: Math.abs(diferencia),
                fecha: new Date().toISOString().split('T')[0],
                motivo: "Ajuste de inventario"
              }
              
              const inventarioActualizado = [...inventario, nuevoMovimiento]
              await axios.post('/api/inventario', inventarioActualizado)
              setInventario(inventarioActualizado)
            }
          }
          break
          
        case "usuarios":
          if (tipoModal === "nuevo") {
            const nuevoUsuario = {
              id: Date.now() + Math.random(),
              ...formData,
              ultimoAcceso: "Nunca",
            }
            
            const usuariosActualizados = [...usuarios, nuevoUsuario]
            await axios.post('/api/usuarios', usuariosActualizados)
            setUsuarios(usuariosActualizados)
          } else if (tipoModal === "editar") {
            const usuariosActualizados = usuarios.map((u) => 
              u.id === itemSeleccionado.id ? { ...u, ...formData } : u
            )
            
            await axios.post('/api/usuarios', usuariosActualizados)
            setUsuarios(usuariosActualizados)
          }
          break
      }
      setMensaje(tipoModal === "nuevo" ? "Elemento creado exitosamente" : "Elemento actualizado exitosamente")
      setTimeout(() => setMensaje(""), 3000)
      cerrarModal()
    } catch (err) {
      console.error("Error al guardar datos:", err)
      setError("Error al guardar los datos. Por favor, intente nuevamente.")
    } finally {
      setCargando(false)
    }
  }

  const handleEliminar = async (id) => {
    if (confirm("¿Está seguro de que desea eliminar este elemento?")) {
      setCargando(true)
      setError("")
      
      try {
        switch (seccionActiva) {
          case "productos":
            // Obtener el producto antes de eliminarlo
            const productoAEliminar = productos.find(p => p.id === id)
            
            // Eliminar el producto
            const productosActualizados = productos.filter((p) => p.id !== id)
            await axios.post('/api/productos', productosActualizados)
            setProductos(productosActualizados)
            
            // Registrar en inventario
            if (productoAEliminar) {
              const nuevoMovimiento = {
                id: Date.now() + Math.random(),
                producto: productoAEliminar.nombre,
                movimiento: "Salida",
                cantidad: productoAEliminar.stock,
                fecha: new Date().toISOString().split('T')[0],
                motivo: "Producto eliminado"
              }
              
              const inventarioActualizado = [...inventario, nuevoMovimiento]
              await axios.post('/api/inventario', inventarioActualizado)
              setInventario(inventarioActualizado)
            }
            break
            
          case "usuarios":
            const usuariosActualizados = usuarios.filter((u) => u.id !== id)
            await axios.post('/api/usuarios', usuariosActualizados)
            setUsuarios(usuariosActualizados)
            break
        }
        setMensaje("Elemento eliminado exitosamente")
        setTimeout(() => setMensaje(""), 3000)
      } catch (err) {
        console.error("Error al eliminar:", err)
        setError("Error al eliminar. Por favor, intente nuevamente.")
      } finally {
        setCargando(false)
      }
    }
  }

  const menuItems = [
    { id: "productos", label: "Productos", icon: Package },
    { id: "inventario", label: "Inventario", icon: Archive },
    { id: "ventas", label: "Ventas", icon: ShoppingCart },
    { id: "reportes", label: "Reportes", icon: BarChart3 },
    { id: "usuarios", label: "Usuarios", icon: Users },
    { id: "configuracion", label: "Configuración", icon: Settings },
  ]

  const renderModal = () => {
    if (!modalAbierto) return null

    let campos = []
    let titulo = ""

    // Obtener categorías únicas de los productos existentes
    const categoriasUnicas = [...new Set(productos.map(p => p.categoria))].sort()

    switch (seccionActiva) {
      case "productos":
        titulo = tipoModal === "nuevo" ? "Nuevo Producto" : "Editar Producto"
        campos = [
          { name: "nombre", label: "Nombre", type: "text", required: true },
          { 
            name: "categoria", 
            label: "Categoría", 
            type: "select", 
            options: categoriasUnicas,
            required: true,
            allowCustom: true // Permitir agregar nueva categoría
          },
          { name: "precio", label: "Precio", type: "number", step: "0.01", required: true },
          { name: "stock", label: "Stock", type: "number", required: true },
        ]
        break
      case "usuarios":
        titulo = tipoModal === "nuevo" ? "Nuevo Usuario" : "Editar Usuario"
        campos = [
          { name: "nombre", label: "Nombre", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          {
            name: "rol",
            label: "Rol",
            type: "select",
            options: ["Administrador", "Cliente"],
            required: true,
          },
          { name: "estado", label: "Estado", type: "select", options: ["Activo", "Inactivo"], required: true },
        ]
        break
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{titulo}</h3>
            <Button variant="ghost" onClick={cerrarModal} className="p-1">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {campos.map((campo) => (
              <div key={campo.name}>
                <Label className="block text-sm font-medium text-gray-700 mb-1">{campo.label}</Label>
                {campo.type === "select" ? (
                  <div>
                    <select
                      value={formData[campo.name] || ""}
                      onChange={(e) => setFormData({ ...formData, [campo.name]: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                      required={campo.required}
                    >
                      <option value="">Seleccionar...</option>
                      {campo.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                      {campo.allowCustom && (
                        <option value="__custom__">+ Agregar nueva categoría</option>
                      )}
                    </select>
                    {campo.allowCustom && formData[campo.name] === "__custom__" && (
                      <Input
                        type="text"
                        placeholder="Escribir nueva categoría..."
                        value={formData.customCategoria || ""}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          customCategoria: e.target.value,
                          categoria: e.target.value 
                        })}
                        className="mt-2 border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                        required={campo.required}
                      />
                    )}
                  </div>
                ) : (
                  <Input
                    type={campo.type}
                    step={campo.step}
                    value={formData[campo.name] || ""}
                    onChange={(e) => setFormData({ ...formData, [campo.name]: e.target.value })}
                    className="border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                    required={campo.required}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                disabled={cargando}
                className="flex-1 bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {cargando ? "Guardando..." : (tipoModal === "nuevo" ? "Crear" : "Guardar")}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={cerrarModal} 
                disabled={cargando}
                className="flex-1 bg-transparent disabled:opacity-50"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const renderContenido = () => {
    let datos = []
  let columnas = []
    let titulo = ""

    switch (seccionActiva) {
      case "productos":
        datos = productos.filter(
          (item) =>
            item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.categoria.toLowerCase().includes(busqueda.toLowerCase()),
        )
        titulo = "Gestión de Productos"
        columnas = [
          { key: "id", label: "ID" },
          { key: "nombre", label: "Nombre" },
          { key: "categoria", label: "Categoría" },
          { key: "precio", label: "Precio", format: (val) => `$${val.toFixed(2)}` },
  { key: "stock", label: "Stock", format: (val) => `${val} unidades` },
        ]
        break

      case "inventario":
        datos = inventario.filter(
          (item) =>
            item.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.movimiento.toLowerCase().includes(busqueda.toLowerCase()),
        )
        titulo = "Control de Inventario"
        columnas = [
          { key: "id", label: "ID" },
          { key: "producto", label: "Producto" },
          {
            key: "movimiento",
            label: "Tipo",
            format: (val) => (
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  val === "Entrada" ? "bg-gray-200 text-gray-800" : "bg-gray-400 text-white"
                }`}
              >
                {val}
              </span>
            ),
          },
          { key: "cantidad", label: "Cantidad" },
          { key: "fecha", label: "Fecha" },
          { key: "motivo", label: "Motivo" },
        ]
        break

      case "ventas":
        datos = ventas.filter(
          (item) =>
            (typeof item.cliente === 'string' && item.cliente.toLowerCase().includes(busqueda.toLowerCase())) ||
            (item.productos && typeof item.productos === 'string' && item.productos.toLowerCase().includes(busqueda.toLowerCase())),
        )
        titulo = "Registro de Ventas"
        columnas = [
          { key: "id", label: "ID" },
          { key: "cliente", label: "Cliente" },
          { 
            key: "productos", 
            label: "Productos",
            // ===================== MODIFICACIÓN ASISTENTE: FORMATEAR PRODUCTOS COMO LISTA =====================
            format: (productos) => {
              if (Array.isArray(productos)) {
                return (
                  <div className="max-w-xs">
                    {productos.map((producto, index) => (
                      <div key={index} className="text-xs text-gray-600 mb-1">
                        • {producto.nombre} x{producto.cantidad} (${producto.precioUnitario})
                      </div>
                    ))}
                  </div>
                )
              }
              return productos || "Sin productos"
            }
            // ===================== FIN MODIFICACIÓN ASISTENTE =====================
          },
          { key: "total", label: "Total", format: (val) => `$${val.toFixed(2)}` },
          { key: "fecha", label: "Fecha" },
          {
            key: "estado",
            label: "Estado",
            format: (val) => (
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  val === "Completada" ? "bg-gray-200 text-gray-800" : "bg-gray-300 text-gray-700"
                }`}
              >
                {val}
              </span>
            ),
          },
        ]
        break

      case "reportes":
        // Calcular estadísticas basadas en los datos reales del JSON
        const ventasCompletadas = ventas.filter(v => v.estado === "Completada")
        const totalVentas = ventasCompletadas.length
        const ingresosTotales = ventasCompletadas.reduce((sum, v) => sum + v.total, 0)
        const productosVendidos = ventasCompletadas.reduce((sum, v) => {
          return sum + v.productos.reduce((productSum, p) => productSum + p.cantidad, 0)
        }, 0)
        const ticketPromedio = totalVentas > 0 ? ingresosTotales / totalVentas : 0

        // Calcular productos más vendidos
        const productosVentas = {}
        ventasCompletadas.forEach(venta => {
          venta.productos.forEach(producto => {
            if (!productosVentas[producto.nombre]) {
              productosVentas[producto.nombre] = {
                nombre: producto.nombre,
                cantidad: 0,
                ingresos: 0,
                categoria: productos.find(p => p.nombre === producto.nombre)?.categoria || "Sin categoría"
              }
            }
            productosVentas[producto.nombre].cantidad += producto.cantidad
            productosVentas[producto.nombre].ingresos += producto.cantidad * producto.precioUnitario
          })
        })

        const productosMasVendidos = Object.values(productosVentas)
          .sort((a, b) => b.cantidad - a.cantidad)
          .slice(0, 5)

        // Calcular ventas por categoría
        const ventasPorCategoria = {}
        ventasCompletadas.forEach(venta => {
          venta.productos.forEach(producto => {
            const categoria = productos.find(p => p.nombre === producto.nombre)?.categoria || "Sin categoría"
            if (!ventasPorCategoria[categoria]) {
              ventasPorCategoria[categoria] = 0
            }
            ventasPorCategoria[categoria] += producto.cantidad * producto.precioUnitario
          })
        })

        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">📊 Reportes de Ventas</h2>

            {/* Resumen de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ventas del Período</h3>
                <p className="text-3xl font-bold text-gray-900">{totalVentas}</p>
                <p className="text-sm text-gray-600 mt-1">ventas completadas</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingresos Totales</h3>
                <p className="text-3xl font-bold text-gray-900">${ingresosTotales.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-1">total de ventas</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Productos Vendidos</h3>
                <p className="text-3xl font-bold text-gray-900">{productosVendidos}</p>
                <p className="text-sm text-gray-600 mt-1">unidades</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ticket Promedio</h3>
                <p className="text-3xl font-bold text-gray-900">${ticketPromedio.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-1">por venta</p>
              </div>
            </div>

            {/* Productos más vendidos */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Productos Más Vendidos</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posición</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Unidades Vendidas
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ingresos</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">% del Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {productosMasVendidos.map((producto, index) => {
                      const porcentaje = productosVendidos > 0 ? ((producto.cantidad / productosVendidos) * 100).toFixed(1) : 0
                      const getPositionColor = (pos) => {
                        switch (pos) {
                          case 0: return "bg-yellow-100 text-yellow-800"
                          case 1: return "bg-gray-100 text-gray-800"
                          case 2: return "bg-orange-100 text-orange-800"
                          default: return "bg-gray-100 text-gray-600"
                        }
                      }
                      
                      return (
                        <tr key={`producto-${producto.nombre}-${index}`}>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${getPositionColor(index)}`}>
                              {index + 1}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{producto.nombre}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{producto.categoria}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{producto.cantidad}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">${producto.ingresos.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{porcentaje}%</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabla de ventas detallada */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Tabla de Ventas Detallada</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Venta</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Productos</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {ventasCompletadas.map((venta, index) => {
                      const cantidadTotal = venta.productos.reduce((sum, p) => sum + p.cantidad, 0)
                      const productosTexto = venta.productos.map(p => `${p.nombre} x${p.cantidad}`).join(", ")
                      
                      return (
                        <tr key={`venta-${venta.id}-${index}`}>
                          <td className="px-4 py-3 text-sm text-gray-900">{venta.fecha}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">#{venta.id.toString().padStart(6, '0')}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{venta.cliente}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{productosTexto}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{cantidadTotal}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">${venta.total.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-800">{venta.estado}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Gráfico resumen por categorías */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Resumen Gráfico de Ventas por Categoría</h3>
              <div className="space-y-4">
                {Object.entries(ventasPorCategoria).map(([categoria, ingresos], index) => {
                  const porcentaje = ingresosTotales > 0 ? ((ingresos / ingresosTotales) * 100).toFixed(1) : 0
                  const colors = ["bg-gray-600", "bg-gray-500", "bg-gray-400", "bg-gray-300", "bg-gray-200"]
                  
                  return (
                    <div key={`categoria-${categoria}-${index}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">{categoria}</span>
                        <span className="text-sm text-gray-600">{porcentaje}% (${ingresos.toFixed(2)})</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className={`${colors[index % colors.length]} h-3 rounded-full`} style={{ width: `${porcentaje}%` }}></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )

      case "usuarios":
        datos = usuarios.filter(
          (item) =>
            item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.email.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.rol.toLowerCase().includes(busqueda.toLowerCase()),
        )
        titulo = "Gestión de Usuarios"
        columnas = [
          { key: "id", label: "ID" },
          { key: "nombre", label: "Nombre" },
          { key: "email", label: "Email" },
          { 
            key: "rol", 
            label: "Rol",
            format: (val) => (
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  val === "Administrador" ? "bg-blue-200 text-blue-800" : "bg-green-200 text-green-800"
                }`}
              >
                {val}
              </span>
            ),
          },
          { key: "estado", label: "Estado" },
          { key: "ultimoAcceso", label: "Último Acceso" },
        ]
        break

      case "configuracion":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Configuración del Sistema</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de la Empresa</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Nombre</Label>
                    <Input defaultValue="Bazar Doña Marlene" className="border-gray-300" />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</Label>
                    <Input defaultValue="(555) 123-4567" className="border-gray-300" />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Email</Label>
                    <Input defaultValue="info@bazarmarlene.com" className="border-gray-300" />
                  </div>
                  <Button className="bg-gray-700 text-white hover:bg-gray-800">Guardar Cambios</Button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuración General</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Moneda</Label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>MXN ($)</option>
                    </select>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Zona Horaria</Label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>GMT-5 (América/Lima)</option>
                      <option>GMT-6 (América/México)</option>
                      <option>GMT-3 (América/Argentina)</option>
                    </select>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Idioma</Label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Español</option>
                      <option>English</option>
                      <option>Português</option>
                    </select>
                  </div>
                  <Button className="bg-gray-700 text-white hover:bg-gray-800">Aplicar Configuración</Button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Respaldo de Datos</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={generarPDFVentas} 
                  className="bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Crear Respaldo
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Al crear un respaldo se generará un archivo PDF con todas las ventas realizadas hasta el momento.
              </p>
            </div>
          </div>
        )
    }

    const puedeEditar = ["productos", "usuarios"].includes(seccionActiva)

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">{titulo}</h2>
          {puedeEditar && (
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => abrirModal("nuevo")} 
                disabled={cargando}
                className="bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                {cargando ? "Cargando..." : "Nuevo"}
              </Button>
              <Button
                onClick={() => itemSeleccionado && abrirModal("editar", itemSeleccionado)}
                disabled={!itemSeleccionado || cargando}
                variant="outline"
                className="border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent disabled:opacity-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                {cargando ? "Cargando..." : "Editar"}
              </Button>
              <Button
                onClick={() => itemSeleccionado && handleEliminar(itemSeleccionado.id)}
                disabled={!itemSeleccionado || cargando}
                variant="outline"
                className="border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {cargando ? "Cargando..." : "Eliminar"}
              </Button>
            </div>
          )}
        </div>

        {/* Barra de búsqueda */}
        <div className="flex items-center space-x-2 max-w-md">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10 border-gray-300 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  {puedeEditar && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seleccionar
                    </th>
                  )}
                  {columnas.map((columna) => (
                    <th
                      key={columna.key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {columna.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {datos.map((item, index) => (
                  <tr key={`${item.id}-${index}`} className="hover:bg-gray-50">
                    {puedeEditar && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="radio"
                          name="itemSeleccionado"
                          onChange={() => setItemSeleccionado(item)}
                          className="text-gray-600"
                        />
                      </td>
                    )}
                    {columnas.map((columna) => (
                      <td key={`${item.id}-${columna.key}-${index}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {columna.format ? columna.format(item[columna.key]) : item[columna.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
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
          <Button
            onClick={handleCerrarSesion}
            variant="outline"
            className="border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Menú de navegación */}
      <nav className="bg-gray-200 border-b border-gray-300">
        <div className="px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  onClick={() => {
                    setSeccionActiva(item.id)
                    setItemSeleccionado(null)
                    setBusqueda("")
                  }}
                  variant={seccionActiva === item.id ? "default" : "ghost"}
                  className={`flex items-center space-x-2 ${
                    seccionActiva === item.id
                      ? "bg-gray-700 text-white hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Mensajes de estado */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
              <button 
                onClick={() => setError("")}
                className="float-right font-bold text-red-700 hover:text-red-900"
              >
                ×
              </button>
            </div>
          )}
          {mensaje && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {mensaje}
              <button 
                onClick={() => setMensaje("")}
                className="float-right font-bold text-green-700 hover:text-green-900"
              >
                ×
              </button>
            </div>
          )}
          {renderContenido()}
        </div>
      </main>

      {/* Modal */}
      {renderModal()}
    </div>
  )
}
