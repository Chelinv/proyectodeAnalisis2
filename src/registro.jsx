import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Package, ArrowLeft, User, Phone, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    usuario: "",
    contraseña: "",
    confirmarContraseña: "",
  });
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validar campos requeridos
    if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es requerido";
    if (!formData.apellido.trim()) nuevosErrores.apellido = "El apellido es requerido";
    if (!formData.email.trim()) nuevosErrores.email = "El email es requerido";
    if (!formData.telefono.trim()) nuevosErrores.telefono = "El teléfono es requerido";
    if (!formData.usuario.trim()) nuevosErrores.usuario = "El usuario es requerido";
    if (!formData.contraseña.trim()) nuevosErrores.contraseña = "La contraseña es requerida";
    if (!formData.confirmarContraseña.trim()) nuevosErrores.confirmarContraseña = "Confirmar contraseña es requerido";

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      nuevosErrores.email = "Email inválido";
    }

    // Validar teléfono
    const telefonoRegex = /^[0-9\-\s+]+$/;
    if (formData.telefono && !telefonoRegex.test(formData.telefono)) {
      nuevosErrores.telefono = "Teléfono inválido";
    }

    // Validar contraseña
    if (formData.contraseña && formData.contraseña.length < 4) {
      nuevosErrores.contraseña = "La contraseña debe tener al menos 4 caracteres";
    }

    // Validar confirmación de contraseña
    if (formData.contraseña !== formData.confirmarContraseña) {
      nuevosErrores.confirmarContraseña = "Las contraseñas no coinciden";
    }

    // Validar usuario único (simulado)
    const usuariosExistentes = ["admin", "cliente", "vendedor", "cajero"];
    if (formData.usuario && usuariosExistentes.includes(formData.usuario.toLowerCase())) {
      nuevosErrores.usuario = "Este usuario ya existe";
    }

    // Validar email único (simulado)
    const emailsExistentes = ["admin@bazar.com", "cliente@bazar.com", "info@bazarmarlene.com"];
    if (formData.email && emailsExistentes.includes(formData.email.toLowerCase())) {
      nuevosErrores.email = "Este email ya está registrado";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    // Simular delay de registro
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simular registro exitoso
    // En una aplicación real, aquí se enviarían los datos al servidor
    console.log("Datos de registro:", formData);

    // Mostrar mensaje de éxito
    alert("¡Registro exitoso! Ahora puedes iniciar sesión con tus credenciales.");

    // Redirigir al login
    navigate("/login");

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al inicio</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-gray-900 p-2 rounded-md">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="font-medium text-gray-900">Bazar Doña Marlene</span>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Crear una cuenta</h1>
              <p className="text-gray-600 mt-2">Completa el formulario para registrarte</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Datos personales */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-700" />
                  Datos personales
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ingrese su nombre"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${errores.nombre ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errores.nombre && <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>}
                  </div>
                  <div>
                    <Label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                      Apellido
                    </Label>
                    <Input
                      id="apellido"
                      name="apellido"
                      type="text"
                      value={formData.apellido}
                      onChange={handleChange}
                      placeholder="Ingrese su apellido"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${errores.apellido ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errores.apellido && <p className="text-red-500 text-xs mt-1">{errores.apellido}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${errores.email ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errores.email && <p className="text-red-500 text-xs mt-1">{errores.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+123 456 7890"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${errores.telefono ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errores.telefono && <p className="text-red-500 text-xs mt-1">{errores.telefono}</p>}
                  </div>
                </div>
              </div>

              {/* Datos de cuenta */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-gray-700" />
                  Datos de cuenta
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">
                      Usuario
                    </Label>
                    <Input
                      id="usuario"
                      name="usuario"
                      type="text"
                      value={formData.usuario}
                      onChange={handleChange}
                      placeholder="Elija un nombre de usuario"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${errores.usuario ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errores.usuario && <p className="text-red-500 text-xs mt-1">{errores.usuario}</p>}
                  </div>
                  <div>
                    <Label htmlFor="contraseña" className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña
                    </Label>
                    <Input
                      id="contraseña"
                      name="contraseña"
                      type="password"
                      value={formData.contraseña}
                      onChange={handleChange}
                      placeholder="Mínimo 4 caracteres"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${errores.contraseña ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errores.contraseña && <p className="text-red-500 text-xs mt-1">{errores.contraseña}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="confirmarContraseña" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar contraseña
                    </Label>
                    <Input
                      id="confirmarContraseña"
                      name="confirmarContraseña"
                      type="password"
                      value={formData.confirmarContraseña}
                      onChange={handleChange}
                      placeholder="Repita su contraseña"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 ${errores.confirmarContraseña ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errores.confirmarContraseña && (
                      <p className="text-red-500 text-xs mt-1">{errores.confirmarContraseña}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Términos y condiciones */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terminos"
                  required
                  className="mt-1 h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                />
                <Label htmlFor="terminos" className="text-sm text-gray-600">
                  Acepto los{" "}
                  <a href="#" className="text-gray-800 hover:underline">
                    términos y condiciones
                  </a>{" "}
                  y la{" "}
                  <a href="#" className="text-gray-800 hover:underline">
                    política de privacidad
                  </a>
                </Label>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  {loading ? "Procesando..." : "Crear cuenta"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 bg-transparent"
                >
                  <Link to="/login">Ya tengo una cuenta</Link>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2024 Bazar Doña Marlene. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
