import { Button } from "./components/ui/button"
import {
  Package,
  Star,
  BookOpen,
  Palette,
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
  Share2,
  Tag,
  Clock,
  Shield,
  Truck,
  RotateCcw,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export default function ProductoPage() {
  const params = useParams()
  const [producto, setProducto] = useState(null)
  const [cantidad, setCantidad] = useState(1)
  const [imagenActiva, setImagenActiva] = useState(0)
  const [tabActiva, setTabActiva] = useState("descripcion")
  const [loading, setLoading] = useState(true)

  // Base de datos de productos (incluyendo ofertas y productos regulares)
  const productosDB = [
    {
      id: 1,
      nombre: "Cuaderno Universitario 100 hojas",
      categoria: "Papelería",
      precioOriginal: 2.5,
      precioOferta: 1.99,
      descuento: 20,
      enOferta: true,
      descripcion: "Cuaderno universitario de 100 hojas rayadas, tapa dura",
      descripcionDetallada:
        "Cuaderno universitario profesional con 100 hojas de papel bond de alta calidad. Cuenta con tapa dura resistente, espiral metálico y hojas rayadas perfectas para tomar apuntes. Ideal para estudiantes universitarios y profesionales que buscan calidad y durabilidad en sus herramientas de escritura.",
      rating: 4.5,
      totalReseñas: 127,
      stock: 150,
      icon: BookOpen,
      tipoOferta: "Descuento",
      fechaVencimiento: "2024-02-15",
      especificaciones: [
        "100 hojas de papel bond 75g",
        "Tapa dura plastificada resistente",
        "Espiral metálico doble resistente",
        "Tamaño: 21 x 29.7 cm (A4)",
        "Hojas rayadas con margen rojo",
        "Papel libre de ácido",
        "Perforación estándar de 3 huecos",
      ],
      marca: "Norma",
      modelo: "Universitario Premium",
      codigoProducto: "NOR-001-UNI",
      garantia: "30 días por defectos de fabricación",
      pesoProducto: "320g",
      dimensiones: "21 x 29.7 x 1.2 cm",
      imagenes: [
        "/placeholder.svg?height=400&width=400&text=Cuaderno+Frente",
        "/placeholder.svg?height=400&width=400&text=Cuaderno+Abierto",
        "/placeholder.svg?height=400&width=400&text=Cuaderno+Espiral",
        "/placeholder.svg?height=400&width=400&text=Cuaderno+Detalle",
      ],
      caracteristicas: [
        "Papel de alta calidad que no traspasa la tinta",
        "Espiral metálico que permite abrir 360°",
        "Tapa plastificada resistente al agua",
        "Hojas microperforadas para fácil desprendimiento",
        "Margen rojo para mejor organización",
      ],
      usos: [
        "Ideal para estudiantes universitarios",
        "Perfecto para tomar apuntes en clase",
        "Excelente para reuniones de trabajo",
        "Útil para planificación y organización",
      ],
      reseñas: [
        {
          id: 1,
          usuario: "María González",
          rating: 5,
          fecha: "2024-01-10",
          comentario: "Excelente calidad de papel, no se traspasa la tinta. El espiral es muy resistente.",
          util: 12,
          verificado: true,
        },
        {
          id: 2,
          usuario: "Carlos Rodríguez",
          rating: 4,
          fecha: "2024-01-08",
          comentario: "Buen cuaderno, aunque el precio podría ser un poco mejor. La calidad es buena.",
          util: 8,
          verificado: true,
        },
        {
          id: 3,
          usuario: "Ana Martínez",
          rating: 5,
          fecha: "2024-01-05",
          comentario: "Lo uso para la universidad y es perfecto. Las hojas no se rompen fácilmente.",
          util: 15,
          verificado: false,
        },
      ],
    },
    {
      id: 2,
      nombre: "Set de Colores 24 unidades",
      categoria: "Material de Arte",
      precioOriginal: 8.75,
      precioOferta: 6.99,
      descuento: 20,
      enOferta: true,
      descripcion: "Set de colores de madera con 24 tonalidades diferentes",
      descripcionDetallada:
        "Set completo de 24 colores de madera con pigmentos vibrantes y duraderos. Cada lápiz está fabricado con madera de cedro y mina de alta calidad que proporciona colores intensos y uniformes. Incluye estuche organizador para mantener los colores ordenados y protegidos.",
      rating: 4.3,
      totalReseñas: 89,
      stock: 45,
      icon: Palette,
      tipoOferta: "Liquidación",
      fechaVencimiento: "2024-02-20",
      especificaciones: [
        "24 colores diferentes",
        "Madera de cedro premium",
        "Mina de 3.3mm de diámetro",
        "Pigmentos no tóxicos certificados",
        "Incluye estuche organizador de cartón",
        "Longitud: 17.5 cm cada lápiz",
        "Forma hexagonal antideslizante",
      ],
      marca: "Prismacolor",
      modelo: "Scholar 24",
      codigoProducto: "PRI-024-SCH",
      garantia: "60 días por defectos de fabricación",
      pesoProducto: "180g",
      dimensiones: "19 x 10 x 1.5 cm (estuche)",
      imagenes: [
        "/placeholder.svg?height=400&width=400&text=Set+Colores+Cerrado",
        "/placeholder.svg?height=400&width=400&text=Set+Colores+Abierto",
        "/placeholder.svg?height=400&width=400&text=Colores+Individuales",
        "/placeholder.svg?height=400&width=400&text=Muestra+Colores",
      ],
      caracteristicas: [
        "Pigmentos de alta calidad para colores vibrantes",
        "Madera de cedro que no se astilla",
        "Mina resistente que no se rompe fácilmente",
        "Estuche organizador incluido",
        "Colores mezclables para crear nuevos tonos",
      ],
      usos: [
        "Ideal para proyectos escolares",
        "Perfecto para arte y manualidades",
        "Excelente para colorear libros",
        "Útil para diseño y bocetos",
      ],
      reseñas: [
        {
          id: 1,
          usuario: "Laura Pérez",
          rating: 4,
          fecha: "2024-01-12",
          comentario: "Buenos colores, aunque algunos son un poco claros. El estuche está bien.",
          util: 6,
          verificado: true,
        },
        {
          id: 2,
          usuario: "Roberto Silva",
          rating: 5,
          fecha: "2024-01-09",
          comentario: "Excelente para mis hijos, los colores son vibrantes y duran mucho.",
          util: 11,
          verificado: true,
        },
      ],
    },
    {
      id: 3,
      nombre: "Grapadora Metálica",
      categoria: "Oficina",
      precioOriginal: 12.0,
      precioOferta: 8.99,
      descuento: 25,
      enOferta: true,
      descripcion: "Grapadora metálica resistente para uso profesional",
      descripcionDetallada:
        "Grapadora metálica de uso pesado, ideal para oficinas y uso profesional. Construida completamente en metal con mecanismo de precisión que garantiza un grapado perfecto. Capacidad para grapar hasta 25 hojas simultáneamente con grapas estándar.",
      rating: 4.6,
      totalReseñas: 156,
      stock: 25,
      icon: Package,
      tipoOferta: "Temporada",
      fechaVencimiento: "2024-02-10",
      especificaciones: [
        "Construcción 100% metálica",
        "Capacidad: hasta 25 hojas",
        "Usa grapas estándar 26/6 y 24/6",
        "Base antideslizante de goma",
        "Mecanismo de precisión ajustable",
        "Palanca ergonómica",
        "Cargador de grapas de fácil acceso",
      ],
      marca: "Swingline",
      modelo: "Heavy Duty 747",
      codigoProducto: "SWI-747-HD",
      garantia: "1 año por defectos de fabricación",
      pesoProducto: "850g",
      dimensiones: "22 x 10 x 6 cm",
      imagenes: [
        "/placeholder.svg?height=400&width=400&text=Grapadora+Vista+Frontal",
        "/placeholder.svg?height=400&width=400&text=Grapadora+Lateral",
        "/placeholder.svg?height=400&width=400&text=Grapadora+Abierta",
        "/placeholder.svg?height=400&width=400&text=Grapadora+En+Uso",
      ],
      caracteristicas: [
        "Construcción robusta para uso intensivo",
        "Mecanismo de precisión para grapado perfecto",
        "Base antideslizante para mayor estabilidad",
        "Carga fácil de grapas",
        "Diseño ergonómico para uso prolongado",
      ],
      usos: [
        "Ideal para oficinas corporativas",
        "Perfecto para uso doméstico intensivo",
        "Excelente para centros de copiado",
        "Útil para proyectos de encuadernación",
      ],
      reseñas: [
        {
          id: 1,
          usuario: "Patricia López",
          rating: 5,
          fecha: "2024-01-11",
          comentario: "Excelente grapadora, muy resistente. La uso todos los días en la oficina.",
          util: 18,
          verificado: true,
        },
        {
          id: 2,
          usuario: "Miguel Torres",
          rating: 4,
          fecha: "2024-01-07",
          comentario: "Buena calidad, aunque es un poco pesada. Funciona muy bien.",
          util: 9,
          verificado: true,
        },
      ],
    },
  ]

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      const productoEncontrado = productosDB.find((p) => p.id === Number.parseInt(params.id))
      setProducto(productoEncontrado)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [params.id])

  const aumentarCantidad = () => {
    if (cantidad < producto?.stock) {
      setCantidad(cantidad + 1)
    }
  }

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1)
    }
  }

  const calcularPrecioTotal = () => {
    if (!producto) return 0
    const precio = producto.enOferta ? producto.precioOferta : producto.precioOriginal
    return precio * cantidad
  }

  const calcularAhorroTotal = () => {
    if (!producto || !producto.enOferta) return 0
    return (producto.precioOriginal - producto.precioOferta) * cantidad
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Producto no encontrado</h2>
          <p className="text-gray-600 mb-6">El producto que buscas no existe o ha sido removido.</p>
          <Button asChild className="bg-gray-900 text-white hover:bg-gray-800">
            <Link to="/ofertas">Volver a Ofertas</Link>
          </Button>
        </div>
      </div>
    )
  }

  const IconComponent = producto.icon

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/ofertas" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-5 w-5" />
              <span>Volver a Ofertas</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-900 rounded">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-medium text-gray-900">BAZAR DOÑA MARLENE</h1>
          </div>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent" asChild>
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-900">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link to="/ofertas" className="hover:text-gray-900">
              Ofertas
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{producto.nombre}</span>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <IconComponent className="h-32 w-32 text-gray-700" />
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-4 gap-2">
              {producto.imagenes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setImagenActiva(index)}
                  className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 transition-colors ${
                    imagenActiva === index ? "border-gray-900" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <IconComponent className="h-8 w-8 text-gray-700" />
                </button>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            {/* Badge de oferta */}
            {producto.enOferta && (
              <div className="flex items-center space-x-2">
                <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Tag className="h-4 w-4 mr-1" />-{producto.descuento}% OFF
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{producto.tipoOferta}</span>
              </div>
            )}

            {/* Título y rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{producto.nombre}</h1>
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(producto.rating) ? "fill-gray-400 text-gray-400" : "fill-gray-300 text-gray-300"}`}
                    />
                  ))}
                  <span className="text-lg font-medium text-gray-900 ml-2">{producto.rating}</span>
                </div>
                <span className="text-gray-600">({producto.totalReseñas} reseñas)</span>
              </div>
              <p className="text-gray-600 mb-4">{producto.descripcion}</p>
            </div>

            {/* Precio */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-4 mb-2">
                {producto.enOferta ? (
                  <>
                    <span className="text-4xl font-bold text-gray-900">${producto.precioOferta.toFixed(2)}</span>
                    <span className="text-2xl text-gray-500 line-through">${producto.precioOriginal.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-gray-900">${producto.precioOriginal.toFixed(2)}</span>
                )}
              </div>
              {producto.enOferta && (
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-green-600 font-medium">
                    Ahorras: ${(producto.precioOriginal - producto.precioOferta).toFixed(2)}
                  </span>
                  <span className="text-gray-600 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Válida hasta: {producto.fechaVencimiento}
                  </span>
                </div>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Stock disponible:</span>
              <span className={`font-medium ${producto.stock > 10 ? "text-green-600" : "text-orange-600"}`}>
                {producto.stock} unidades
              </span>
            </div>

            {/* Selector de cantidad */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-gray-700 font-medium">Cantidad:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={disminuirCantidad}
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 p-0 border-gray-300 bg-transparent"
                    disabled={cantidad <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-16 text-center font-medium text-lg">{cantidad}</span>
                  <Button
                    onClick={aumentarCantidad}
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 p-0 border-gray-300 bg-transparent"
                    disabled={cantidad >= producto.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">Total:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">${calcularPrecioTotal().toFixed(2)}</span>
                    {producto.enOferta && calcularAhorroTotal() > 0 && (
                      <div className="text-sm text-green-600">Ahorras: ${calcularAhorroTotal().toFixed(2)}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-gray-900 text-white hover:bg-gray-800 py-3 text-lg"
                  disabled={producto.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Añadir al Carrito
                </Button>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Favoritos
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>{producto.garantia}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck className="h-4 w-4" />
                <span>Envío gratis en compras mayores a $25</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <RotateCcw className="h-4 w-4" />
                <span>Devoluciones dentro de 7 días</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de información */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex space-x-8 mb-8">
            {[
              { id: "descripcion", label: "Descripción" },
              { id: "especificaciones", label: "Especificaciones" },
              { id: "reseñas", label: `Reseñas (${producto.totalReseñas})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTabActiva(tab.id)}
                className={`pb-2 border-b-2 transition-colors ${
                  tabActiva === tab.id
                    ? "border-gray-900 text-gray-900 font-medium"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenido de tabs */}
          <div className="min-h-[300px]">
            {tabActiva === "descripcion" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Descripción del Producto</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{producto.descripcionDetallada}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Características Principales</h4>
                  <ul className="space-y-2">
                    {producto.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Usos Recomendados</h4>
                  <ul className="space-y-2">
                    {producto.usos.map((uso, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{uso}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tabActiva === "especificaciones" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Especificaciones Técnicas</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-900">Marca:</span>
                      <span className="ml-2 text-gray-700">{producto.marca}</span>
                    </div>
                    <div className="border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-900">Modelo:</span>
                      <span className="ml-2 text-gray-700">{producto.modelo}</span>
                    </div>
                    <div className="border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-900">Código:</span>
                      <span className="ml-2 text-gray-700">{producto.codigoProducto}</span>
                    </div>
                    <div className="border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-900">Peso:</span>
                      <span className="ml-2 text-gray-700">{producto.pesoProducto}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-900">Dimensiones:</span>
                      <span className="ml-2 text-gray-700">{producto.dimensiones}</span>
                    </div>
                    <div className="border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-900">Categoría:</span>
                      <span className="ml-2 text-gray-700">{producto.categoria}</span>
                    </div>
                    <div className="border-b border-gray-200 pb-2">
                      <span className="font-medium text-gray-900">Garantía:</span>
                      <span className="ml-2 text-gray-700">{producto.garantia}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Especificaciones Detalladas</h4>
                  <ul className="space-y-2">
                    {producto.especificaciones.map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tabActiva === "reseñas" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Reseñas de Clientes</h3>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Escribir Reseña
                  </Button>
                </div>

                {/* Resumen de ratings */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">{producto.rating}</div>
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(producto.rating) ? "fill-gray-400 text-gray-400" : "fill-gray-300 text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{producto.totalReseñas} reseñas</div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center space-x-2 mb-1">
                          <span className="text-sm text-gray-600 w-8">{stars}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gray-400 h-2 rounded-full"
                              style={{ width: `${Math.random() * 80 + 10}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lista de reseñas */}
                <div className="space-y-6">
                  {producto.reseñas.map((reseña) => (
                    <div key={reseña.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {reseña.usuario
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{reseña.usuario}</span>
                              {reseña.verificado && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                  Compra verificada
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < reseña.rating ? "fill-gray-400 text-gray-400" : "fill-gray-300 text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{reseña.fecha}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{reseña.comentario}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Útil ({reseña.util})</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                          <ThumbsDown className="h-4 w-4" />
                          <span>No útil</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-16 mt-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gray-900 rounded">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-medium text-gray-900">Bazar Doña Marlene</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tu papelería de confianza desde hace más de 20 años
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Contacto</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Teléfono: (555) 123-4567</p>
                <p>Email: info@bazarmarlene.com</p>
                <p>Dirección: Av. Principal 123</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Horarios</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Lun - Vie: 8:00 AM - 7:00 PM</p>
                <p>Sábado: 9:00 AM - 5:00 PM</p>
                <p>Domingo: Cerrado</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-500 text-sm">© 2024 Bazar Doña Marlene. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
