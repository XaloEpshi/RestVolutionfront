import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MisDatos from './MisDatos/MisDatos';
import Administracion from './Administracion/Administracion';
import './AdminPage.css';

const AdminPage = ({ user }) => {
  const location = useLocation();
  
  return (
    <div className="admin-page">
      <nav className="admin-nav">
        <a href="/admin/mis-datos" className={location.pathname === '/admin/mis-datos' ? 'active' : ''}>
          Mis Datos
        </a>
        <a href="/admin/administracion" className={location.pathname === '/admin/administracion' ? 'active' : ''}>
          Administración
        </a>
      </nav>
      <div className="admin-header">
        {user && <h1>Bienvenido, {user.nombre}!</h1>} {/* Mostrar el nombre del administrador */}
      </div>
      <div className="admin-content">
        <Routes>
          <Route path="mis-datos" element={<MisDatos />} />
          <Route path="administracion" element={<Administracion />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
