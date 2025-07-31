import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';

// Importación perezosa de componentes
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./login'));
const RegistroPage = lazy(() => import('./registro'));
const CatalogoPage = lazy(() => import('./catalogo'));
const ContactoPage = lazy(() => import('./contacto'));
const AyudaPage = lazy(() => import('./ayuda'));
const OfertasPage = lazy(() => import('./ofertas'));
const AdminPage = lazy(() => import('./admin'));
const ClientePage = lazy(() => import('./cliente'));
const ProductoPage = lazy(() => import('./producto'));
const CarritoPage = lazy(() => import('./pages/CarritoPage'));

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<div className="loading">Cargando...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/ayuda" element={<AyudaPage />} />
          <Route path="/ofertas" element={<OfertasPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/cliente" element={<ClientePage />} />
          <Route path="/producto/:id" element={<ProductoPage />} />
          <Route path="/carrito" element={<CarritoPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
