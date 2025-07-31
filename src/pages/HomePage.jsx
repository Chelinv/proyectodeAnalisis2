import { Button } from "../components/ui/button";
import { BookOpen, Phone, HelpCircle, Star, Package, Scissors, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import "../index.css";

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-logo">
            <div className="logo-icon">
              <Package className="icon" />
            </div>
            <h1 className="logo-text">BAZAR DOÑA MARLENE</h1>
          </div>
          <Button variant="outline" className="login-button bg-transparent">
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-container">
          <h2 className="hero-title">Bienvenidos a su papelería de confianza</h2>
          <p className="hero-subtitle">Todo lo que necesitas para tu oficina, escuela y hogar</p>
        </div>
      </section>

      {/* Navigation */}
      <section className="navigation-section">
        <div className="navigation-container">
          <div className="navigation-buttons">
            {/* ===================== MODIFICACIÓN ASISTENTE: BOTÓN CATÁLOGO COMO LINK ===================== */}
            <Link to="/catalogo" className="nav-button login-button flex items-center gap-2">
              <BookOpen className="nav-icon" />
              Ver Catálogo
            </Link>
            {/* ===================== FIN MODIFICACIÓN ASISTENTE ===================== */}
            {/* ===================== MODIFICACIÓN ASISTENTE: BOTÓN CONTACTO COMO LINK ===================== */}
            <Link to="/contacto" className="nav-button login-button flex items-center gap-2">
              <Phone className="nav-icon" />
              Contacto
            </Link>
            {/* ===================== FIN MODIFICACIÓN ASISTENTE ===================== */}
            {/* ===================== MODIFICACIÓN ASISTENTE: BOTÓN AYUDA COMO LINK ===================== */}
            <Link to="/ayuda" className="nav-button login-button flex items-center gap-2">
              <HelpCircle className="nav-icon" />
              Ayuda
            </Link>
            {/* ===================== FIN MODIFICACIÓN ASISTENTE ===================== */}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="products-section">
        <div className="products-container">
          <div className="products-header">
            <h3 className="products-title">Productos</h3>
            <div className="products-divider"></div>
          </div>

          <div className="products-grid">
            {/* Producto 1 */}
            <div className="product-card">
              <div className="product-icon-container">
                <BookOpen className="product-icon" />
              </div>
              <h4 className="product-name">Cuadernos</h4>
              <p className="product-description">Variedad de cuadernos para todas las edades</p>
              <div className="product-rating">
                <Star className="star filled" />
                <Star className="star filled" />
                <Star className="star filled" />
                <Star className="star filled" />
                <Star className="star empty" />
              </div>
              <p className="product-price">Desde $2.50</p>
            </div>

            {/* Producto 2 */}
            <div className="product-card">
              <div className="product-icon-container">
                <Scissors className="product-icon" />
              </div>
              <h4 className="product-name">Útiles Escolares</h4>
              <p className="product-description">Todo para el regreso a clases</p>
              <div className="product-rating">
                <Star className="star filled" />
                <Star className="star filled" />
                <Star className="star filled" />
                <Star className="star filled" />
                <Star className="star filled" />
              </div>
              <p className="product-price">Desde $1.00</p>
            </div>

            {/* Producto 3 */}
            <div className="product-card">
              <div className="product-icon-container">
                <Palette className="product-icon" />
              </div>
              <h4 className="product-name">Material de Arte</h4>
              <p className="product-description">Colores, pinceles y más</p>
              <div className="product-rating">
                <Star className="star filled" />
                <Star className="star filled" />
                <Star className="star filled" />
                <Star className="star filled" />
                <Star className="star empty" />
              </div>
              <p className="product-price">Desde $3.75</p>
            </div>

            {/* Producto 4 */}
            <div className="product-card">
              <div className="product-icon-container">
                <Package className="product-icon" />
              </div>
              <h4 className="product-name">Oficina</h4>
              <p className="product-description">Artículos para tu espacio de trabajo</p>
              <div className="product-rating">
                <Star className="star filled" />
                <Star className="star filled" />
                <Star className="star filled" />
                <Star className="star filled" />
                <Star className="star empty" />
              </div>
              <p className="product-price">Desde $5.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ofertas */}
      <section className="offers-section">
        <div className="offers-container">
          <h3 className="offers-title">Ofertas Especiales</h3>
          <p className="offers-subtitle">Aprovecha nuestras promociones especiales en productos seleccionados</p>
          {/* ===================== MODIFICACIÓN ASISTENTE: BOTÓN OFERTAS COMO LINK ===================== */}
          <Link to="/ofertas" className="offers-button login-button">Ver Ofertas</Link>
          {/* ===================== FIN MODIFICACIÓN ASISTENTE ===================== */}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <Package className="icon" />
                </div>
                <h4 className="footer-logo-text">Bazar Doña Marlene</h4>
              </div>
              <p className="footer-description">Tu papelería de confianza desde hace más de 20 años</p>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">Contacto</h4>
              <div className="footer-info">
                <p>Teléfono: (555) 123-4567</p>
                <p>Email: info@bazarmarlene.com</p>
                <p>Dirección: Av. Principal 123</p>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="footer-section-title">Horarios</h4>
              <div className="footer-info">
                <p>Lun - Vie: 8:00 AM - 7:00 PM</p>
                <p>Sábado: 9:00 AM - 5:00 PM</p>
                <p>Domingo: Cerrado</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">© 2024 Bazar Doña Marlene. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}