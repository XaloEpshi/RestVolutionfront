import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './RegistrarAdmin.css';

const RegistraAdmin = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contraseña !== confirmarContraseña) {
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/admin/register', {
        nombre,
        correo,
        contraseña,
      });

      if (response.status === 201) {
        setMensaje('Administrador registrado con éxito');
        setNombre('');
        setCorreo('');
        setContraseña('');
        setConfirmarContraseña('');
        
        // Limpia el mensaje después de 3 segundos
        setTimeout(() => {
          setMensaje('');
        }, 3000);
      } else {
        setMensaje('Error al registrar administrador');
      }
    } catch (error) {
      console.error('Error registrando administrador:', error);
      setMensaje('Error al registrar administrador');
    }
  };

  return (
    <div className="registrar-admin">
      <h1>Registrar Administrador</h1>
      {mensaje && <div className="mensaje">{mensaje}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="form-group password-group">
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type={mostrarContraseña ? 'text' : 'password'}
            id="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setMostrarContraseña(!mostrarContraseña)}
          >
            <FontAwesomeIcon icon={mostrarContraseña ? faEyeSlash : faEye} />
          </span>
        </div>
        <div className="form-group password-group">
          <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
          <input
            type={mostrarConfirmarContraseña ? 'text' : 'password'}
            id="confirmarContraseña"
            value={confirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setMostrarConfirmarContraseña(!mostrarConfirmarContraseña)}
          >
            <FontAwesomeIcon icon={mostrarConfirmarContraseña ? faEyeSlash : faEye} />
          </span>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistraAdmin;
