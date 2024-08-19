import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MisDatos from './MisDatos/MisDatos';
import MisCupones from './MisCupones/MisCupones';
import Actividad from './Actividad/Actividad';
import './ClientPage.css';

const ClientPage = ({ user }) => {
  const location = useLocation();
  
  return (
    <div className="client-page">
      <nav className="client-nav">
        <a href="/cliente/mis-datos" className={location.pathname === '/cliente/mis-datos' ? 'active' : ''}>
          Mis Datos
        </a>
        <a href="/cliente/mis-cupones" className={location.pathname === '/cliente/mis-cupones' ? 'active' : ''}>
          Mis Cupones
        </a>
        <a href="/cliente/actividad" className={location.pathname === '/cliente/actividad' ? 'active' : ''}>
          Actividad
        </a>
      </nav>
      <div className="client-header">
        {user && <h1>Bienvenido, {user.nombre}!</h1>} {/* Mostrar el nombre del cliente */}
      </div>
      <div className="client-content">
        <Routes>
          <Route path="mis-datos" element={<MisDatos />} />
          <Route path="mis-cupones" element={<MisCupones />} />
          <Route path="actividad" element={<Actividad />} />
        </Routes>
      </div>
    </div>
  );
};

export default ClientPage;
