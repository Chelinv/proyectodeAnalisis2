import { Button } from "@/components/ui/button"
import { Package, Phone, Mail, MapPin, Clock, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function ContactoPage() {
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
          <h2 className="text-4xl font-light text-gray-900 mb-4">Contáctanos</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Ponte en contacto con nosotros a través de cualquiera de estos medios
          </p>
        </div>
      </section>

      {/* Información de contacto */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Teléfono */}
            <div className="text-center p-8 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Phone className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Teléfono</h3>
              <p className="text-gray-600 mb-4">(555) 123-4567</p>
              <p className="text-sm text-gray-500">Lun - Vie: 8:00 AM - 7:00 PM</p>
            </div>

            {/* Email */}
            <div className="text-center p-8 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Mail className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">info@bazarmarlene.com</p>
              <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
            </div>

            {/* Dirección */}
            <div className="text-center p-8 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Dirección</h3>
              <p className="text-gray-600 mb-4">Av. Principal 123</p>
              <p className="text-sm text-gray-500">Centro de la ciudad</p>
            </div>

            {/* Horarios */}
            <div className="text-center p-8 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Horarios</h3>
              <div className="text-gray-600 text-sm space-y-1">
                <p>Lun - Vie: 8:00 AM - 7:00 PM</p>
                <p>Sáb: 9:00 AM - 5:00 PM</p>
                <p>Dom: Cerrado</p>
              </div>
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
