import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Package, HelpCircle, Phone, Mail, MapPin, Search, ArrowLeft, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"

export default function AyudaPage() {
  const preguntasFrecuentes = [
    {
      id: 1,
      pregunta: "¿Cómo puedo realizar una compra?",
      respuesta:
        "Para realizar una compra, navega por nuestro catálogo, selecciona los productos que desees, añádelos a tu carrito y procede al checkout. Puedes pagar en efectivo, con tarjeta o transferencia bancaria.",
    },
    {
      id: 2,
      pregunta: "¿Cuáles son los métodos de pago disponibles?",
      respuesta:
        "Aceptamos efectivo, tarjetas de débito y crédito (Visa, MasterCard), transferencias bancarias y pagos móviles. Todos los pagos son procesados de forma segura.",
    },
    {
      id: 3,
      pregunta: "¿Hacen entregas a domicilio?",
      respuesta:
        "Sí, realizamos entregas a domicilio en toda la ciudad. El costo de envío varía según la distancia y el peso del pedido. Las entregas se realizan de lunes a sábado.",
    },
    {
      id: 4,
      pregunta: "¿Cuál es el tiempo de entrega?",
      respuesta:
        "Las entregas se realizan en un plazo de 24 a 48 horas hábiles. Para pedidos urgentes, ofrecemos servicio de entrega el mismo día con un costo adicional.",
    },
    {
      id: 5,
      pregunta: "¿Puedo devolver un producto?",
      respuesta:
        "Sí, aceptamos devoluciones dentro de los 7 días posteriores a la compra. El producto debe estar en perfectas condiciones y con su empaque original.",
    },
    {
      id: 6,
      pregunta: "¿Cómo puedo rastrear mi pedido?",
      respuesta:
        "Una vez realizada tu compra, recibirás un número de seguimiento. Puedes consultar el estado de tu pedido en la sección 'Mis Compras' o contactándonos directamente.",
    },
    {
      id: 7,
      pregunta: "¿Ofrecen descuentos por compras al por mayor?",
      respuesta:
        "Sí, ofrecemos descuentos especiales para compras al por mayor. Contacta con nuestro equipo de ventas para obtener una cotización personalizada.",
    },
    {
      id: 8,
      pregunta: "¿Tienen productos para empresas?",
      respuesta:
        "Sí, tenemos una amplia gama de productos para oficinas y empresas. Ofrecemos facturación empresarial y crédito para clientes corporativos.",
    },
  ]

  const categorias = [
    {
      titulo: "Compras y Pedidos",
      descripcion: "Todo sobre cómo realizar compras, métodos de pago y seguimiento de pedidos",
      icono: Package,
    },
    {
      titulo: "Entregas y Envíos",
      descripcion: "Información sobre tiempos de entrega, costos de envío y cobertura",
      icono: MapPin,
    },
    {
      titulo: "Devoluciones y Cambios",
      descripcion: "Políticas de devolución, cambios y garantías de productos",
      icono: HelpCircle,
    },
    {
      titulo: "Cuenta y Facturación",
      descripcion: "Gestión de cuenta, facturación y información de contacto",
      icono: Mail,
    },
  ]

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-5 w-5" />
              <span>Volver</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-900 rounded">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-medium text-gray-900">BAZAR DOÑA MARLENE</h1>
          </div>
          <Button variant="outline" className="login-button">
            <Link to="/login">Iniciar Sesión</Link>
          </Button>

        </div>
      </header>

      {/* Hero */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Centro de Ayuda</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Encuentra respuestas a tus preguntas o contacta con nuestro equipo de soporte
          </p>

          {/* Barra de búsqueda */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar en la ayuda..."
                className="pl-10 py-3 border-gray-300 focus:ring-gray-500 focus:border-gray-500 bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categorías de ayuda */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">¿En qué podemos ayudarte?</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categorias.map((categoria, index) => {
              const IconComponent = categoria.icono
              return (
                <div
                  key={index}
                  className="text-center p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200 cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-gray-700" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{categoria.titulo}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{categoria.descripcion}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">Preguntas Frecuentes</h3>

          <div className="max-w-3xl mx-auto space-y-4">
            {preguntasFrecuentes.map((faq) => (
              <div key={faq.id} className="bg-white border border-gray-200 rounded-lg">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
                  <span className="font-medium text-gray-900">{faq.pregunta}</span>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </button>
                <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">{faq.respuesta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Información de contacto */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">¿Necesitas más ayuda?</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Teléfono */}
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Phone className="h-8 w-8 text-gray-700" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Llámanos</h4>
              <p className="text-gray-600 mb-4">(555) 123-4567</p>
              <p className="text-sm text-gray-500 mb-4">Lun - Vie: 8:00 AM - 7:00 PM</p>
            </div>

            {/* Email */}
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Mail className="h-8 w-8 text-gray-700" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Escríbenos</h4>
              <p className="text-gray-600 mb-4">info@bazarmarlene.com</p>
              <p className="text-sm text-gray-500 mb-4">Respuesta en 24 horas</p>
            </div>

            {/* Visítanos */}
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-gray-700" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Visítanos</h4>
              <p className="text-gray-600 mb-4">Av. Principal 123</p>
              <p className="text-sm text-gray-500 mb-4">Centro de la ciudad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-16">
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
