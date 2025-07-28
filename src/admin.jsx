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
} from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

// Datos quemados
const productosData = [
  { id: 1, nombre: "Cuaderno Universitario", categoria: "Cuadernos", precio: 2.5, stock: 150 },
  { id: 2, nombre: "Lápiz HB", categoria: "Útiles Escolares", precio: 0.5, stock: 300 },
  { id: 3, nombre: "Colores Faber", categoria: "Material de Arte", precio: 8.75, stock: 45 },
  { id: 4, nombre: "Grapadora", categoria: "Oficina", precio: 12.0, stock: 25 },
  { id: 5, nombre: "Borrador Blanco", categoria: "Útiles Escolares", precio: 0.75, stock: 200 },
]

const inventarioData = [
  {
    id: 1,
    producto: "Cuaderno Universitario",
    movimiento: "Entrada",
    cantidad: 50,
    fecha: "2024-01-15",
    motivo: "Compra",
  },
  { id: 2, producto: "Lápiz HB", movimiento: "Salida", cantidad: 25, fecha: "2024-01-14", motivo: "Venta" },
  { id: 3, producto: "Colores Faber", movimiento: "Entrada", cantidad: 20, fecha: "2024-01-13", motivo: "Compra" },
  { id: 4, producto: "Grapadora", movimiento: "Salida", cantidad: 5, fecha: "2024-01-12", motivo: "Venta" },
]

const ventasData = [
  {
    id: 1,
    cliente: "Juan Pérez",
    productos: "Cuaderno, Lápiz",
    total: 15.5,
    fecha: "2024-01-15",
    estado: "Completada",
  },
  {
    id: 2,
    cliente: "María García",
    productos: "Colores Faber",
    total: 8.75,
    fecha: "2024-01-14",
    estado: "Completada",
  },
  {
    id: 3,
    cliente: "Carlos López",
    productos: "Grapadora, Borrador",
    total: 12.75,
    fecha: "2024-01-13",
    estado: "Pendiente",
  },
  { id: 4, cliente: "Ana Martínez", productos: "Cuaderno x3", total: 7.5, fecha: "2024-01-12", estado: "Completada" },
]

const clientesData = [
  { id: 1, nombre: "Juan Pérez", email: "juan@email.com", telefono: "555-0101", compras: 5, total: 125.5 },
  { id: 2, nombre: "María García", email: "maria@email.com", telefono: "555-0102", compras: 3, total: 89.25 },
  { id: 3, nombre: "Carlos López", email: "carlos@email.com", telefono: "555-0103", compras: 7, total: 234.75 },
  { id: 4, nombre: "Ana Martínez", email: "ana@email.com", telefono: "555-0104", compras: 2, total: 45.0 },
]

const usuariosData = [
  {
    id: 1,
    nombre: "Admin Principal",
    email: "admin@bazar.com",
    rol: "Administrador",
    estado: "Activo",
    ultimoAcceso: "2024-01-15",
  },
  {
    id: 2,
    nombre: "Vendedor 1",
    email: "vendedor1@bazar.com",
    rol: "Vendedor",
    estado: "Activo",
    ultimoAcceso: "2024-01-14",
  },
  {
    id: 3,
    nombre: "Cajero 1",
    email: "cajero1@bazar.com",
    rol: "Cajero",
    estado: "Inactivo",
    ultimoAcceso: "2024-01-10",
  },
]

export default function AdminPage() {
  const [seccionActiva, setSeccionActiva] = useState("productos")
  const [productos, setProductos] = useState(productosData)
  const [inventario, setInventario] = useState(inventarioData)
  const [ventas, setVentas] = useState(ventasData)
  const [clientes, setClientes] = useState(clientesData)
  const [usuarios, setUsuarios] = useState(usuariosData)
  const [busqueda, setBusqueda] = useState("")
  const [modalAbierto, setModalAbierto] = useState(false)
  const [tipoModal, setTipoModal] = useState("")
  const [itemSeleccionado, setItemSeleccionado] = useState(null)
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [navigate])

  const handleCerrarSesion = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    navigate("/")
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


  const handleSubmit = (e) => {
    e.preventDefault()

    switch (seccionActiva) {
      case "productos":
        if (tipoModal === "nuevo") {
          const nuevoProducto = {
            id: productos.length + 1,
            ...formData,
            precio: Number.parseFloat(formData.precio),
            stock: Number.parseInt(formData.stock),
          }
          setProductos([...productos, nuevoProducto])
        } else if (tipoModal === "editar") {
          setProductos(
            productos.map((p) =>
              p.id === itemSeleccionado.id
                ? {
                    ...p,
                    ...formData,
                    precio: Number.parseFloat(formData.precio),
                    stock: Number.parseInt(formData.stock),
                  }
                : p,
            ),
          )
        }
        break
      case "clientes":
        if (tipoModal === "nuevo") {
          const nuevoCliente = {
            id: clientes.length + 1,
            ...formData,
            compras: 0,
            total: 0,
          }
          setClientes([...clientes, nuevoCliente])
        } else if (tipoModal === "editar") {
          setClientes(clientes.map((c) => (c.id === itemSeleccionado.id ? { ...c, ...formData } : c)))
        }
        break
      case "usuarios":
        if (tipoModal === "nuevo") {
          const nuevoUsuario = {
            id: usuarios.length + 1,
            ...formData,
            ultimoAcceso: "Nunca",
          }
          setUsuarios([...usuarios, nuevoUsuario])
        } else if (tipoModal === "editar") {
          setUsuarios(usuarios.map((u) => (u.id === itemSeleccionado.id ? { ...u, ...formData } : u)))
        }
        break
    }
    cerrarModal()
  }

  const handleEliminar = (id) => {
    if (confirm("¿Está seguro de que desea eliminar este elemento?")) {
      switch (seccionActiva) {
        case "productos":
          setProductos(productos.filter((p) => p.id !== id))
          break
        case "clientes":
          setClientes(clientes.filter((c) => c.id !== id))
          break
        case "usuarios":
          setUsuarios(usuarios.filter((u) => u.id !== id))
          break
      }
    }
  }

  const menuItems = [
    { id: "productos", label: "Productos", icon: Package },
    { id: "inventario", label: "Inventario", icon: Archive },
    { id: "ventas", label: "Ventas", icon: ShoppingCart },
    { id: "clientes", label: "Clientes", icon: Users },
    { id: "reportes", label: "Reportes", icon: BarChart3 },
    { id: "usuarios", label: "Usuarios", icon: Users },
    { id: "configuracion", label: "Configuración", icon: Settings },
  ]

  const renderModal = () => {
    if (!modalAbierto) return null

    let campos = []
    let titulo = ""

    switch (seccionActiva) {
      case "productos":
        titulo = tipoModal === "nuevo" ? "Nuevo Producto" : "Editar Producto"
        campos = [
          { name: "nombre", label: "Nombre", type: "text", required: true },
          { name: "categoria", label: "Categoría", type: "text", required: true },
          { name: "precio", label: "Precio", type: "number", step: "0.01", required: true },
          { name: "stock", label: "Stock", type: "number", required: true },
        ]
        break
      case "clientes":
        titulo = tipoModal === "nuevo" ? "Nuevo Cliente" : "Editar Cliente"
        campos = [
          { name: "nombre", label: "Nombre", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "telefono", label: "Teléfono", type: "text", required: true },
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
            options: ["Administrador", "Vendedor", "Cajero"],
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
                  </select>
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
              <Button type="submit" className="flex-1 bg-gray-700 text-white hover:bg-gray-800">
                {tipoModal === "nuevo" ? "Crear" : "Guardar"}
              </Button>
              <Button type="button" variant="outline" onClick={cerrarModal} className="flex-1 bg-transparent">
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
            item.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.productos.toLowerCase().includes(busqueda.toLowerCase()),
        )
        titulo = "Registro de Ventas"
        columnas = [
          { key: "id", label: "ID" },
          { key: "cliente", label: "Cliente" },
          { key: "productos", label: "Productos" },
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

      case "clientes":
        datos = clientes.filter(
          (item) =>
            item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.email.toLowerCase().includes(busqueda.toLowerCase()),
        )
        titulo = "Gestión de Clientes"
        columnas = [
          { key: "id", label: "ID" },
          { key: "nombre", label: "Nombre" },
          { key: "email", label: "Email" },
          { key: "telefono", label: "Teléfono" },
          { key: "compras", label: "Compras" },
          { key: "total", label: "Total", format: (val) => `$${val.toFixed(2)}` },
        ]
        break

      case "reportes":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">📊 Reportes de Ventas</h2>

            {/* Controles de fecha y acciones */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Label className="text-sm font-medium text-gray-700">Seleccionar Fecha:</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="date"
                      defaultValue="2024-01-01"
                      className="border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                    />
                    <span className="text-gray-500">a</span>
                    <Input
                      type="date"
                      defaultValue="2024-01-31"
                      className="border-gray-300 focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button className="bg-gray-700 text-white hover:bg-gray-800">Ver Productos más vendidos</Button>
                  <Button variant="outline" className="border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent">
                    Exportar PDF
                  </Button>
                </div>
              </div>
            </div>

            {/* Resumen de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ventas del Período</h3>
                <p className="text-3xl font-bold text-gray-900">47</p>
                <p className="text-sm text-gray-600 mt-1">+12% vs período anterior</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingresos Totales</h3>
                <p className="text-3xl font-bold text-gray-900">$1,247.50</p>
                <p className="text-sm text-gray-600 mt-1">+8% vs período anterior</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Productos Vendidos</h3>
                <p className="text-3xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600 mt-1">unidades</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ticket Promedio</h3>
                <p className="text-3xl font-bold text-gray-900">$26.54</p>
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
                    <tr>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                          1
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Cuaderno Universitario 100 hojas</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Papelería</td>
                      <td className="px-4 py-3 text-sm text-gray-900">45</td>
                      <td className="px-4 py-3 text-sm text-gray-900">$112.50</td>
                      <td className="px-4 py-3 text-sm text-gray-600">28.8%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-800 rounded-full text-xs font-bold">
                          2
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Lápiz HB Faber-Castell</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Papelería</td>
                      <td className="px-4 py-3 text-sm text-gray-900">38</td>
                      <td className="px-4 py-3 text-sm text-gray-900">$19.00</td>
                      <td className="px-4 py-3 text-sm text-gray-600">24.4%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-800 rounded-full text-xs font-bold">
                          3
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Set de Colores 24 unidades</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Regalos</td>
                      <td className="px-4 py-3 text-sm text-gray-900">22</td>
                      <td className="px-4 py-3 text-sm text-gray-900">$192.50</td>
                      <td className="px-4 py-3 text-sm text-gray-600">14.1%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                          4
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Borrador Blanco Pelikan</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Papelería</td>
                      <td className="px-4 py-3 text-sm text-gray-900">18</td>
                      <td className="px-4 py-3 text-sm text-gray-900">$13.50</td>
                      <td className="px-4 py-3 text-sm text-gray-600">11.5%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                          5
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Grapadora Metálica</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Oficina</td>
                      <td className="px-4 py-3 text-sm text-gray-900">12</td>
                      <td className="px-4 py-3 text-sm text-gray-900">$144.00</td>
                      <td className="px-4 py-3 text-sm text-gray-600">7.7%</td>
                    </tr>
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
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">2024-01-15</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">#V001</td>
                      <td className="px-4 py-3 text-sm text-gray-900">Juan Pérez</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Cuaderno, Lápiz x3</td>
                      <td className="px-4 py-3 text-sm text-gray-900">4</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">$4.00</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-800">Completada</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">2024-01-15</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">#V002</td>
                      <td className="px-4 py-3 text-sm text-gray-900">María García</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Set de Colores</td>
                      <td className="px-4 py-3 text-sm text-gray-900">1</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">$8.75</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-800">Completada</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">2024-01-14</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">#V003</td>
                      <td className="px-4 py-3 text-sm text-gray-900">Carlos López</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Grapadora, Borrador x2</td>
                      <td className="px-4 py-3 text-sm text-gray-900">3</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">$13.50</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-800">Completada</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">2024-01-14</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">#V004</td>
                      <td className="px-4 py-3 text-sm text-gray-900">Ana Martínez</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Cuaderno x2, Agenda</td>
                      <td className="px-4 py-3 text-sm text-gray-900">3</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">$20.50</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-800">Completada</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">2024-01-13</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">#V005</td>
                      <td className="px-4 py-3 text-sm text-gray-900">Luis Rodríguez</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Calculadora Científica</td>
                      <td className="px-4 py-3 text-sm text-gray-900">1</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">$25.00</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-800">Completada</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">2024-01-13</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">#V006</td>
                      <td className="px-4 py-3 text-sm text-gray-900">Patricia Silva</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Marcadores x2, Lápiz x5</td>
                      <td className="px-4 py-3 text-sm text-gray-900">7</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">$15.00</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-800">Completada</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Gráfico resumen (representación visual simple) */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Resumen Gráfico de Ventas</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Papelería</span>
                    <span className="text-sm text-gray-600">65% ($810.00)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gray-600 h-3 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Oficina</span>
                    <span className="text-sm text-gray-600">25% ($312.50)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gray-500 h-3 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Regalos</span>
                    <span className="text-sm text-gray-600">10% ($125.00)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gray-400 h-3 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "usuarios":
        datos = usuarios.filter(
          (item) =>
            item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.email.toLowerCase().includes(busqueda.toLowerCase()),
        )
        titulo = "Gestión de Usuarios"
        columnas = [
          { key: "id", label: "ID" },
          { key: "nombre", label: "Nombre" },
          { key: "email", label: "Email" },
          { key: "rol", label: "Rol" },
          {
            key: "estado",
            label: "Estado",
            format: (val) => (
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  val === "Activo" ? "bg-gray-200 text-gray-800" : "bg-gray-400 text-white"
                }`}
              >
                {val}
              </span>
            ),
          },
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
                <Button className="bg-gray-700 text-white hover:bg-gray-800">Crear Respaldo</Button>
                <Button variant="outline" className="border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent">
                  Restaurar Respaldo
                </Button>
                <Button variant="outline" className="border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent">
                  Programar Respaldos
                </Button>
              </div>
            </div>
          </div>
        )
    }

    const puedeEditar = ["productos", "clientes", "usuarios"].includes(seccionActiva)

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">{titulo}</h2>
          {puedeEditar && (
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => abrirModal("nuevo")} className="bg-gray-700 text-white hover:bg-gray-800">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo
              </Button>
              <Button
                onClick={() => itemSeleccionado && abrirModal("editar", itemSeleccionado)}
                disabled={!itemSeleccionado}
                variant="outline"
                className="border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent disabled:opacity-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button
                onClick={() => itemSeleccionado && handleEliminar(itemSeleccionado.id)}
                disabled={!itemSeleccionado}
                variant="outline"
                className="border-gray-400 text-gray-700 hover:bg-gray-100 bg-transparent disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
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
                {datos.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
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
                      <td key={columna.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
        <div className="max-w-7xl mx-auto">{renderContenido()}</div>
      </main>

      {/* Modal */}
      {renderModal()}
    </div>
  )
}
