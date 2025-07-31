import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { BookOpen, Star, Package, Scissors, Palette, Search, ArrowLeft, X, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./catalogo.css";

export default function CatalogoPage() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  
  // Cargar productos desde la API
  useEffect(() => {
    const cargarProductos = async () => {
      setCargando(true);
      setError("");
      
      try {
        const response = await axios.get('/api/productos');
        setProductos(response.data);
        setProductosFiltrados(response.data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("Error al cargar los productos. Por favor, intente nuevamente.");
        // Si hay error, usar los productos de ejemplo
        setProductos(productosEjemplo);
        setProductosFiltrados(productosEjemplo);
      } finally {
        setCargando(false);
      }
    };
    
    cargarProductos();
  }, []);
  
  // Mapeo de iconos para productos
  const getIconComponent = (categoria) => {
    switch (categoria.toLowerCase()) {
      case "papelería":
        return BookOpen;
      case "material de arte":
        return Palette;
      case "útiles escolares":
        return Scissors;
      default:
        return Package;
    }
  };
  
  // Productos de ejemplo para fallback si la API falla
  const productosEjemplo = [
    {
      id: 1,
      nombre: "Cuaderno Universitario 100 hojas",
      categoria: "Papelería",
      precio: 2.5,
      descripcion: "Cuaderno universitario de 100 hojas rayadas, tapa dura",
      descripcionDetallada:
        "Cuaderno universitario profesional con 100 hojas de papel bond de alta calidad. Cuenta con tapa dura resistente, espiral metálico y hojas rayadas perfectas para tomar apuntes. Ideal para estudiantes universitarios y profesionales.",
      rating: 4.5,
      stock: 150,
      icon: BookOpen,
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
      garantia: "30 días por defectos de fabricación",
    },
    {
      id: 2,
      nombre: "Lápiz HB Faber-Castell",
      categoria: "Papelería",
      precio: 0.5,
      descripcion: "Lápiz de grafito HB de alta calidad",
      descripcionDetallada:
        "Lápiz de grafito HB de la reconocida marca Faber-Castell. Fabricado con madera de cedro de alta calidad y grafito uniforme que garantiza un trazo suave y preciso. Perfecto para escritura y dibujo técnico.",
      rating: 4.8,
      stock: 300,
      icon: BookOpen,
      especificaciones: [
        "Grafito HB de alta calidad",
        "Madera de cedro",
        "Longitud: 17.5 cm",
        "Hexagonal antideslizante",
        "Punta resistente a la rotura",
      ],
      marca: "Faber-Castell",
      garantia: "Garantía de calidad del fabricante",
    },
    {
      id: 3,
      nombre: "Set de Colores 24 unidades",
      categoria: "Material de Arte",
      precio: 8.75,
      descripcion: "Set de colores de madera con 24 tonalidades diferentes",
      descripcionDetallada:
        "Set completo de 24 colores de madera con pigmentos vibrantes y duraderos. Cada lápiz está fabricado con madera de cedro y mina de alta calidad que proporciona colores intensos y uniformes. Incluye estuche organizador.",
      rating: 4.3,
      stock: 45,
      icon: Palette,
      especificaciones: [
        "24 colores diferentes",
        "Madera de cedro premium",
        "Mina de 3.3mm",
        "Pigmentos no tóxicos",
        "Incluye estuche organizador",
      ],
      marca: "Prismacolor",
      garantia: "60 días por defectos de fabricación",
    },
    {
      id: 4,
      nombre: "Grapadora Metálica",
      categoria: "Oficina",
      precio: 12.0,
      descripcion: "Grapadora metálica resistente para uso profesional",
      descripcionDetallada:
        "Grapadora metálica de uso pesado, ideal para oficinas y uso profesional. Construida completamente en metal con mecanismo de precisión que garantiza un grapado perfecto. Capacidad para grapar hasta 25 hojas simultáneamente.",
      rating: 4.6,
      stock: 25,
      icon: Package,
      especificaciones: [
        "Construcción 100% metálica",
        "Capacidad: 25 hojas",
        "Usa grapas estándar 26/6",
        "Base antideslizante",
        "Mecanismo de precisión",
      ],
      marca: "Swingline",
      garantia: "1 año por defectos de fabricación",
    },
    {
      id: 5,
      nombre: "Borrador Blanco Pelikan",
      categoria: "Papelería",
      precio: 0.75,
      descripcion: "Borrador blanco suave que no daña el papel",
      descripcionDetallada:
        "Borrador de goma blanca de alta calidad que borra limpiamente sin dañar el papel. Su fórmula especial no deja residuos y es ideal para uso en papel bond, cuadernos y documentos importantes.",
      rating: 4.2,
      stock: 200,
      icon: BookOpen,
      especificaciones: [
        "Goma blanca de alta calidad",
        "No deja residuos",
        "Suave con el papel",
        "Tamaño: 6 x 2 x 1 cm",
        "Libre de PVC",
      ],
      marca: "Pelikan",
      garantia: "Garantía de calidad del fabricante",
    },
    {
      id: 6,
      nombre: "Agenda 2024 Ejecutiva",
      categoria: "Oficina",
      precio: 15.5,
      descripcion: "Agenda ejecutiva con calendario y notas",
      descripcionDetallada:
        "Agenda ejecutiva 2024 con diseño profesional. Incluye calendario mensual y semanal, sección de contactos, notas y planificación anual. Tapa dura con acabado elegante y cierre elástico.",
      rating: 4.7,
      stock: 30,
      icon: Package,
      especificaciones: [
        "Calendario completo 2024",
        "Vista semanal y mensual",
        "Sección de contactos",
        "Tapa dura con cierre elástico",
        "Papel de 80g de alta calidad",
      ],
      marca: "Moleskine",
      garantia: "30 días por defectos de fabricación",
    },
    {
      id: 7,
      nombre: "Calculadora Científica",
      categoria: "Oficina",
      precio: 25.0,
      descripcion: "Calculadora científica con funciones avanzadas",
      descripcionDetallada:
        "Calculadora científica con más de 240 funciones matemáticas. Pantalla de 2 líneas, ideal para estudiantes de ingeniería, matemáticas y ciencias. Incluye funciones trigonométricas, logarítmicas y estadísticas.",
      rating: 4.4,
      stock: 15,
      icon: Package,
      especificaciones: [
        "Más de 240 funciones",
        "Pantalla de 2 líneas",
        "Funciones trigonométricas",
        "Memoria de 9 variables",
        "Alimentación solar y batería",
      ],
      marca: "Casio",
      garantia: "2 años por defectos de fabricación",
    },
    {
      id: 8,
      nombre: "Marcadores Permanentes x6",
      categoria: "Oficina",
      precio: 6.25,
      descripcion: "Set de 6 marcadores permanentes de colores básicos",
      descripcionDetallada:
        "Set de 6 marcadores permanentes con tinta indeleble de secado rápido. Incluye colores básicos: negro, azul, rojo, verde, amarillo y naranja. Punta redonda de 2mm, ideal para marcar en múltiples superficies.",
      rating: 4.1,
      stock: 80,
      icon: Package,
      especificaciones: [
        "6 colores básicos",
        "Tinta permanente de secado rápido",
        "Punta redonda 2mm",
        "Resistente al agua",
        "Funciona en múltiples superficies",
      ],
      marca: "Sharpie",
      garantia: "Garantía de calidad del fabricante",
    },
    {
      id: 9,
      nombre: "Tijeras Escolares",
      categoria: "Útiles Escolares",
      precio: 3.25,
      descripcion: "Tijeras de punta roma para uso escolar",
      descripcionDetallada:
        "Tijeras escolares con punta roma diseñadas especialmente para niños. Hojas de acero inoxidable con filo duradero y mango ergonómico antideslizante. Seguras y fáciles de usar para proyectos escolares.",
      rating: 4.0,
      stock: 120,
      icon: Scissors,
      especificaciones: [
        "Punta roma para seguridad",
        "Hojas de acero inoxidable",
        "Mango ergonómico",
        "Antideslizante",
        "Longitud: 13 cm",
      ],
      marca: "Maped",
      garantia: "6 meses por defectos de fabricación",
    },
    {
      id: 10,
      nombre: "Pegamento en Barra",
      categoria: "Útiles Escolares",
      precio: 1.75,
      descripcion: "Pegamento en barra lavable y no tóxico",
      descripcionDetallada:
        "Pegamento en barra de 21g, lavable y no tóxico. Fórmula especial que se desliza suavemente y seca transparente. Ideal para papel, cartón y proyectos escolares. Se lava fácilmente con agua.",
      rating: 4.3,
      stock: 180,
      icon: BookOpen,
      especificaciones: [
        "21g de pegamento",
        "Fórmula lavable",
        "No tóxico",
        "Seca transparente",
        "Aplicación suave y uniforme",
      ],
      marca: "Pritt",
      garantia: "Garantía de calidad del fabricante",
    },
    {
      id: 11,
      nombre: "Regla de 30cm",
      categoria: "Útiles Escolares",
      precio: 2.0,
      descripcion: "Regla transparente con medidas en cm y pulgadas",
      descripcionDetallada:
        "Regla transparente de 30cm fabricada en acrílico resistente. Graduación precisa en centímetros y pulgadas con números claros y legibles. Bordes rectos perfectos para trazado técnico.",
      rating: 4.1,
      stock: 90,
      icon: BookOpen,
      especificaciones: [
        "30 cm de longitud",
        "Material: acrílico transparente",
        "Graduación en cm y pulgadas",
        "Números claros y legibles",
        "Bordes perfectamente rectos",
      ],
      marca: "Staedtler",
      garantia: "Garantía de calidad del fabricante",
    },
    {
      id: 12,
      nombre: "Pinceles Set x5",
      categoria: "Material de Arte",
      precio: 7.5,
      descripcion: "Set de 5 pinceles de diferentes tamaños para pintura",
      descripcionDetallada:
        "Set de 5 pinceles profesionales con cerdas sintéticas de alta calidad. Incluye tamaños 2, 4, 6, 8 y 10. Mango de madera lacada con virola de aluminio. Ideales para acuarela, acrílico y témpera.",
      rating: 4.4,
      stock: 35,
      icon: Palette,
      especificaciones: [
        "5 pinceles tamaños 2, 4, 6, 8, 10",
        "Cerdas sintéticas de alta calidad",
        "Mango de madera lacada",
        "Virola de aluminio",
        "Compatibles con múltiples técnicas",
      ],
      marca: "Winsor & Newton",
      garantia: "90 días por defectos de fabricación",
    },
    {
      id: 13,
      nombre: "Compás Escolar",
      categoria: "Útiles Escolares",
      precio: 4.5,
      descripcion: "Compás metálico para dibujo técnico escolar",
      descripcionDetallada:
        "Compás escolar de metal con punta fina y portaminas integrado. Ideal para dibujo técnico y geométrico. Incluye mina de repuesto y viene en estuche protector.",
      rating: 4.2,
      stock: 65,
      icon: Scissors,
      especificaciones: [
        "Construcción metálica resistente",
        "Punta fina de precisión",
        "Portaminas integrado",
        "Incluye mina de repuesto",
        "Estuche protector incluido",
      ],
      marca: "Staedtler",
      garantia: "1 año por defectos de fabricación",
    },
    {
      id: 14,
      nombre: "Acuarelas Set x12",
      categoria: "Material de Arte",
      precio: 12.0,
      descripcion: "Set de 12 acuarelas en pastilla con pincel",
      descripcionDetallada:
        "Set completo de 12 acuarelas en pastilla con colores vibrantes y alta pigmentación. Incluye pincel de pelo sintético y paleta mezcladora. Ideal para artistas principiantes y estudiantes.",
      rating: 4.5,
      stock: 28,
      icon: Palette,
      especificaciones: [
        "12 colores en pastilla",
        "Alta pigmentación",
        "Incluye pincel sintético",
        "Paleta mezcladora integrada",
        "Colores mezclables",
      ],
      marca: "Winsor & Newton",
      garantia: "60 días por defectos de fabricación",
    },
    {
      id: 15,
      nombre: "Archivador A4",
      categoria: "Oficina",
      precio: 8.5,
      descripcion: "Archivador de palanca tamaño A4",
      descripcionDetallada:
        "Archivador de palanca con mecanismo de alta calidad. Capacidad para 350 hojas aproximadamente. Forrado en papel plastificado resistente con etiqueta identificadora.",
      rating: 4.3,
      stock: 42,
      icon: Package,
      especificaciones: [
        "Tamaño A4 estándar",
        "Capacidad: 350 hojas aprox.",
        "Mecanismo de palanca resistente",
        "Forrado plastificado",
        "Etiqueta identificadora",
      ],
      marca: "Leitz",
      garantia: "2 años por defectos de fabricación",
    },
  ];

  const categorias = ["Todas", "Papelería", "Oficina", "Material de Arte", "Útiles Escolares"];

  // Efecto para filtrar productos cuando cambia la categoría o búsqueda
  useEffect(() => {
    let productosFiltradosTemp = productos;

    // Filtrar por categoría
    if (categoriaActiva !== "Todas") {
      productosFiltradosTemp = productosFiltradosTemp.filter((producto) => producto.categoria === categoriaActiva);
    }

    // Filtrar por búsqueda
    if (busqueda.trim() !== "") {
      productosFiltradosTemp = productosFiltradosTemp.filter(
        (producto) =>
          producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          producto.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
          producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setProductosFiltrados(productosFiltradosTemp);
  }, [categoriaActiva, busqueda, productos]);
  
  // Si hay un error al cargar los productos, usar los productos de ejemplo
  useEffect(() => {
    if (error && productos.length === 0) {
      setProductos(productosEjemplo);
      setProductosFiltrados(productosEjemplo);
    }
  }, [error]);

  // Inicializar productos filtrados
  useEffect(() => {
    setProductosFiltrados(productos);
  }, []);

  const handleCategoriaChange = (categoria) => {
    setCategoriaActiva(categoria);
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setCantidad(1);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoSeleccionado(null);
    setCantidad(1);
  };

  const aumentarCantidad = () => {
    if (cantidad < productoSeleccionado?.stock) {
      setCantidad(cantidad + 1);
    }
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const renderModal = () => {
    if (!mostrarModal || !productoSeleccionado) return null;

    // ===================== MODIFICACIÓN ASISTENTE: ICONO MODAL SELECCIONADO POR CATEGORÍA =====================
    const IconComponent = getIconComponent(productoSeleccionado.categoria);
    const totalPrecio = productoSeleccionado.precio * cantidad;

    return (
      <div className="modal-overlay">
        <div className="modal-container">
          {/* Header del modal */}
          <div className="modal-header">
            <h3 className="modal-title">Detalles del Producto</h3>
            <Button variant="ghost" onClick={cerrarModal} className="modal-close">
              <X className="close-icon" />
            </Button>
          </div>

          {/* Contenido del modal */}
          <div className="modal-content">
            {/* Imagen y info básica */}
            <div className="modal-product-info">
              <div className="modal-product-image">
                <div className="product-image-container">
                  <IconComponent className="product-image-icon" />
                </div>
              </div>

              <div className="modal-product-details">
                <h4 className="modal-product-name">{productoSeleccionado.nombre}</h4>
                <p className="modal-product-description">{productoSeleccionado.descripcionDetallada}</p>

                <div className="modal-product-meta">
                  <div className="product-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`star ${i < Math.floor(productoSeleccionado.rating) ? "filled" : "empty"}`}
                      />
                    ))}
                    <span className="rating-number">{productoSeleccionado.rating}</span>
                  </div>
                  <span className="stock-info">Stock: {productoSeleccionado.stock}</span>
                </div>

                <div className="modal-product-pricing">
                  <span className="product-price">${productoSeleccionado.precio.toFixed(2)}</span>
                  <span className="product-category">{productoSeleccionado.categoria}</span>
                </div>
              </div>
            </div>

            {/* Especificaciones */}
            <div className="modal-specifications">
              <h5 className="specifications-title">Especificaciones</h5>
              <ul className="specifications-list">
                {productoSeleccionado.especificaciones.map((spec, index) => (
                  <li key={index} className="specification-item">
                    <div className="spec-bullet"></div>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Información adicional */}
            <div className="modal-additional-info">
              <div className="info-card">
                <h6 className="info-title">Marca</h6>
                <p className="info-content">{productoSeleccionado.marca}</p>
              </div>
              <div className="info-card">
                <h6 className="info-title">Garantía</h6>
                <p className="info-content">{productoSeleccionado.garantia}</p>
              </div>
            </div>

            {/* Selector de cantidad y precio total */}
            <div className="modal-quantity-section">
              <div className="quantity-controls">
                <div className="quantity-selector">
                  <span className="quantity-label">Cantidad:</span>
                  <div className="quantity-buttons">
                    <Button
                      onClick={disminuirCantidad}
                      variant="outline"
                      size="sm"
                      className="quantity-btn bg-transparent"
                      disabled={cantidad <= 1}
                    >
                      <Minus className="quantity-icon" />
                    </Button>
                    <span className="quantity-display">{cantidad}</span>
                    <Button
                      onClick={aumentarCantidad}
                      variant="outline"
                      size="sm"
                      className="quantity-btn bg-transparent"
                      disabled={cantidad >= productoSeleccionado.stock}
                    >
                      <Plus className="quantity-icon" />
                    </Button>
                  </div>
                </div>
                <div className="total-price">
                  <p className="total-label">Total:</p>
                  <p className="total-amount">${totalPrecio.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="modal-actions">
              <Button className="add-to-cart-btn" disabled={productoSeleccionado.stock === 0}>
                Añadir al Carrito
              </Button>
              <Button variant="outline" onClick={cerrarModal} className="close-modal-btn bg-transparent">
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="catalogo-page">
      {/* Header */}
      <header className="catalogo-header">
        <div className="header-container">
          <div className="header-back">
            <Link to="/" className="back-link">
              <ArrowLeft className="back-icon" />
              <span>Volver</span>
            </Link>
          </div>
          <div className="header-logo">
            <div className="logo-icon">
              <Package className="icon" />
            </div>
            <h1 className="logo-text">BAZAR DOÑA MARLENE</h1>
          </div>
          <Button variant="outline" className="login-button">
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-container">
          <h2 className="hero-title">Catálogo de Productos</h2>
          <p className="hero-subtitle">Encuentra todo lo que necesitas para tu oficina, escuela y hogar</p>

          {/* Barra de búsqueda */}
          <div className="search-container">
            <div className="search-input-container">
              <Search className="search-icon" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                className="search-input"
                value={busqueda}
                onChange={handleBusquedaChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filtros por categoría */}
      <section className="filters-section">
        <div className="filters-container">
          <div className="filters-buttons">
            {categorias.map((categoria) => (
              <Button
                key={categoria}
                onClick={() => handleCategoriaChange(categoria)}
                variant="outline"
                className={`filter-button ${categoriaActiva === categoria ? "active" : ""} bg-transparent`}
              >
                {categoria}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Información de filtros activos */}
      <section className="filter-info-section">
        <div className="filter-info-container">
          <div className="filter-info">
            <span className="filter-info-text">
              {categoriaActiva === "Todas"
                ? `Mostrando ${productosFiltrados.length} productos`
                : `Mostrando ${productosFiltrados.length} productos en "${categoriaActiva}"`}
              {busqueda && ` que coinciden con "${busqueda}"`}
            </span>
            {(categoriaActiva !== "Todas" || busqueda) && (
              <Button
                onClick={() => {
                  setCategoriaActiva("Todas");
                  setBusqueda("");
                }}
                variant="outline"
                className="clear-filters-btn bg-transparent"
              >
                Limpiar filtros
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="products-section">
        <div className="products-container">
          {productosFiltrados.length > 0 ? (
            <div className="products-grid">
              {productosFiltrados.map((producto) => {
                // ===================== MODIFICACIÓN ASISTENTE: ICONO SELECCIONADO POR CATEGORÍA =====================
                const IconComponent = getIconComponent(producto.categoria);
                return (
                  <div key={producto.id} className="product-card">
                    <div className="product-icon-container">
                      <IconComponent className="product-icon" />
                    </div>
                    <h3 className="product-name">{producto.nombre}</h3>
                    <p className="product-description">{producto.descripcion}</p>

                    <div className="product-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`star ${i < Math.floor(producto.rating) ? "filled" : "empty"}`} />
                      ))}
                      <span className="rating-number">{producto.rating}</span>
                    </div>

                    <div className="product-pricing">
                      <p className="product-price">${producto.precio.toFixed(2)}</p>
                      <p className="stock-info">Stock: {producto.stock}</p>
                      <p className="product-category">{producto.categoria}</p>
                    </div>

                    <Button onClick={() => abrirModal(producto)} className="details-button">
                      Ver Detalles
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-products">
              <Package className="no-products-icon" />
              <h3 className="no-products-title">No se encontraron productos</h3>
              <p className="no-products-text">
                {busqueda
                  ? `No hay productos que coincidan con "${busqueda}" en la categoría "${categoriaActiva}"`
                  : `No hay productos disponibles en la categoría "${categoriaActiva}"`}
              </p>
              <Button
                onClick={() => {
                  setCategoriaActiva("Todas");
                  setBusqueda("");
                }}
                className="reset-filters-btn"
              >
                Ver todos los productos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Modal de detalles */}
      {renderModal()}

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
