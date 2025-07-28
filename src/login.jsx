import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Package, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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

    // Simular delay de autenticación
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Validar credenciales quemadas
    if (usuario === "admin" && contraseña === "1234") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "admin");
      navigate("/admin");
    } else if (usuario === "cliente" && contraseña === "1234") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "cliente");
      navigate("/cliente");
    } else {
      setError("Usuario o contraseña incorrectos");
    }

    setLoading(false);
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
