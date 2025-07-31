import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Package, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

export default function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Obtener usuarios del servidor
      const response = await axios.get('/api/usuarios');
      
      // Verificar que la respuesta sea un array
      if (!Array.isArray(response.data)) {
        console.error("Error: La respuesta no es un array", response.data);
        setError("Error en el formato de datos del servidor");
        return;
      }
      
      const usuarios = response.data;
      
      // Buscar usuario que coincida con las credenciales
      const usuarioEncontrado = usuarios.find(
        u => u.usuario === usuario && u.contraseña === contraseña
      );
      
      if (usuarioEncontrado) {
        // ===================== MODIFICACIÓN ASISTENTE: LIMPIAR Y ACTUALIZAR LOCALSTORAGE =====================
        // Limpiar datos antiguos antes de guardar los nuevos
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("userRole")
        localStorage.removeItem("userId")
        localStorage.removeItem("userName")
        
        // Guardar información de autenticación
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", usuarioEncontrado.rol.toLowerCase());
        localStorage.setItem("userId", usuarioEncontrado.id);
        localStorage.setItem("userName", usuarioEncontrado.nombre);
        // ===================== FIN MODIFICACIÓN ASISTENTE =====================
        
        // Actualizar último acceso
        const usuariosActualizados = usuarios.map(u => 
          u.id === usuarioEncontrado.id 
            ? { ...u, ultimoAcceso: new Date().toISOString().split('T')[0] } 
            : u
        );
        
        // Guardar la actualización
        await axios.post('/api/usuarios', usuariosActualizados);
        
        // Redirigir según el rol
        if (usuarioEncontrado.rol.toLowerCase() === "administrador") {
          navigate("/admin");
        } else {
          navigate("/cliente");
        }
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al conectar con el servidor. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Header con logo */}
        <div className="login-header">
          <Link to="/" className="back-link">
            <ArrowLeft className="back-icon" />
            <span>Volver al inicio</span>
          </Link>
        </div>

        {/* Formulario de login */}
        <div className="login-form-container">
          {/* Logo y título */}
          <div className="login-logo-section">
            <div className="login-logo">
              <Package className="logo-icon" />
            </div>
            <h1 className="login-title">Iniciar Sesión</h1>
            <p className="login-subtitle">Bazar Doña Marlene</p>
          </div>

          {/* Mensaje de error */}
          {error && <div className="error-message">{error}</div>}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Campo Usuario */}
            <div className="form-group">
              <Label htmlFor="usuario" className="form-label">
                Usuario:
              </Label>
              <Input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingrese su usuario"
                className="form-input"
                required
              />
            </div>

            {/* Campo Contraseña */}
            <div className="form-group">
              <Label htmlFor="contraseña" className="form-label">
                Contraseña:
              </Label>
              <Input
                id="contraseña"
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Ingrese su contraseña"
                className="form-input"
                required
              />
            </div>

            {/* Botones */}
            <div className="form-buttons">
              <Button type="submit" disabled={loading} className="submit-button">
                {loading ? "Ingresando..." : "Ingresar"}
              </Button>
              <Button type="button" variant="outline" className="cancel-button bg-transparent">
                <Link to="/">Cancelar</Link>
              </Button>
            </div>
          </form>

          {/* Credenciales de prueba */}
          <div className="test-credentials">
            <p className="test-credentials-text">
              <strong>Credenciales de prueba:</strong>
              <br />
              Admin: admin / 1234
              <br />
              Cliente: cliente / 1234
            </p>
          </div>

          {/* Enlace a registro */}
          <div className="register-link-section">
            <p className="register-text">
              ¿No tienes una cuenta?{" "}
              <Link to="/registro" className="register-link">
                Crear cuenta
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p>© 2024 Bazar Doña Marlene</p>
        </div>
      </div>
    </div>
  );
}
