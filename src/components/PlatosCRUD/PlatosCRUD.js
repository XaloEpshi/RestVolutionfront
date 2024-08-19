import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PlatosCRUD.css";

const PlatosCRUD = () => {
  const [platos, setPlatos] = useState([]);
  const [newPlato, setNewPlato] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
    imagen: null, // Cambiar a null para inicializar el estado de la imagen
    estado: "activo",
    destacado: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [currentPlatoId, setCurrentPlatoId] = useState(null);
  const [filter, setFilter] = useState("activo");

  useEffect(() => {
    fetchPlatos(filter);
  }, [filter]);

  const fetchPlatos = async (estado) => {
    try {
      const endpoint = estado === "activo" ? "allPlatos" : "inPlatos";
      const response = await axios.get(`http://localhost:3001/api/${endpoint}`);
      setPlatos(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "destacado") {
      setNewPlato({
        ...newPlato,
        destacado: checked, // Directamente actualiza el estado basado en el checkbox
      });
    } else {
      setNewPlato({
        ...newPlato,
        [name]: e.target.value, // Maneja otros campos
      });
    }
  };

  const handleFileChange = (e) => {
    setNewPlato({
      ...newPlato,
      imagen: e.target.files[0], // Manejar archivos correctamente
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updatePlato();
    } else {
      await addPlato();
    }
  };

  const addPlato = async () => {
    try {
      const formData = new FormData();
      for (const key in newPlato) {
        formData.append(
          key,
          key === "destacado" ? (newPlato[key] ? 1 : 0) : newPlato[key]
        );
      }
      await axios.post("http://localhost:3001/api/addPlatos", formData);
      fetchPlatos(filter);
      resetForm();
    } catch (error) {
      console.error("Error adding plato:", error);
    }
  };

  const updatePlato = async () => {
    try {
      const formData = new FormData();
      for (const key in newPlato) {
        formData.append(
          key,
          key === "destacado" ? (newPlato[key] ? 1 : 0) : newPlato[key]
        );
      }
      await axios.put(
        `http://localhost:3001/api/eddPlatos/${currentPlatoId}`,
        formData
      );
      fetchPlatos(filter);
      resetForm();
    } catch (error) {
      console.error("Error updating plato:", error);
    }
  };

  const deletePlato = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/delPlatos/${id}`);
      fetchPlatos(filter);
    } catch (error) {
      console.error("Error deleting plato:", error);
    }
  };

  const activatePlato = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/activatePlato/${id}`);
      fetchPlatos(filter);
    } catch (error) {
      console.error("Error activating plato:", error);
    }
  };

  const handleEdit = (plato) => {
    setEditMode(true);
    setCurrentPlatoId(plato.idPlato);
    setNewPlato({
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      categoria: plato.categoria,
      precio: plato.precio,
      imagen: null, // No se debe copiar la URL de la imagen
      estado: plato.estado,
      destacado: plato.destacado,
    });
  };

  const resetForm = () => {
    setNewPlato({
      nombre: "",
      descripcion: "",
      categoria: "",
      precio: "",
      imagen: null,
      estado: "activo",
      destacado: false,
    });
    setEditMode(false);
    setCurrentPlatoId(null);
  };

  const categorias = [
    "Entradas",
    "Platos Principales",
    "Sopas y Ensaladas",
    "Especialidades de la Casa",
    "Desayunos",
    "Menú Infantil",
    "Postres",
    "Bebidas",
  ];

  return (
    <div className="platos-crud">
      <h1>Gestión de Platos</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newPlato.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={newPlato.descripcion}
          onChange={handleChange}
          required
        />
        <select
          name="categoria"
          value={newPlato.categoria}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={newPlato.precio}
          onChange={handleChange}
          required
        />
        <input type="file" name="imagen" onChange={handleFileChange} />
        <label>
          Destacado:
          <input
            type="checkbox"
            name="destacado"
            checked={newPlato.destacado}
            onChange={handleChange}
          />
        </label>

        <label>
          No Destacado:
          <input
            type="checkbox"
            name="noDestacado"
            checked={!newPlato.destacado}
            onChange={handleChange}
          />
        </label>

        <br />
        <button type="submit">
          {editMode ? "Actualizar Plato" : "Agregar Plato"}
        </button>
      </form>
      <div className="filter-buttons">
        <button onClick={() => setFilter("activo")}>Mostrar Activos</button>
        <button onClick={() => setFilter("inactivo")}>Mostrar Inactivos</button>
      </div>
      <table className="platos-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Destacado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {platos.map((plato) => (
            <tr key={plato.idPlato}>
              <td data-label="Imagen">
                <img
                  src={`http://localhost:3001/api/imaPlatos/${plato.idPlato}`}
                  alt={plato.nombre}
                  className="plato-image crud-image"
                />
              </td>
              <td data-label="Nombre">{plato.nombre}</td>
              <td data-label="Descripción">{plato.descripcion}</td>
              <td data-label="Categoría">{plato.categoria}</td>
              <td data-label="Precio">${plato.precio}</td>
              <td data-label="Estado">{plato.estado}</td>
              <td data-label="Destacado">{plato.destacado ? "Sí" : "No"}</td>
              <td data-label="Acciones">
                {plato.estado === "activo" ? (
                  <>
                    <button
                      className="crud-button"
                      onClick={() => handleEdit(plato)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="crud-button"
                      onClick={() => deletePlato(plato.idPlato)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </>
                ) : (
                  <button
                    className="crud-button"
                    onClick={() => activatePlato(plato.idPlato)}
                  >
                    <i className="fas fa-check"></i>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlatosCRUD; //Codigo final Funcional 19/07/2024 2:34 hrs
