import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Menu.css";

const Menu = ({ onAddToCart, category, setCategory, isAuthenticated }) => {
  const [platos, setPlatos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/allPlatos");
        setPlatos(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlatos();
  }, []);

  const handleCategoriaChange = (categoria) => {
    setCategory(categoria);
  };

  const handleAddToCart = (plato) => {
    onAddToCart(plato);
    setMensaje(`${plato.nombre} agregado al carrito`);
    setTimeout(() => {
      setMensaje("");
    }, 1000); // Oculta el mensaje después de 1 segundo
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

  const platosFiltrados =
    category === "Todos"
      ? platos
      : platos.filter((plato) => plato.categoria === category);

  if (!isAuthenticated) {
    return (
      <div className="menu">
        <h1>Por favor, inicia sesión para ver el menú.</h1>
      </div>
    );
  }

  return (
    <div className="menu" style={{ marginTop: "80px" }}>
      <h1>Explora Nuestro Menú</h1>
      {mensaje && <div className="mensaje">{mensaje}</div>}
      <div className="categorias-menu-container">
        <div className="categorias-menu">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => handleCategoriaChange(categoria)}
              className={category === categoria ? "active" : ""}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      <br />
      <div className="platos-container">
        {platosFiltrados.map((plato) => (
          <div key={plato.idPlato} className="plato-card">
            <img
              src={`http://localhost:3001/upload/${plato.imagen}`}
              alt={plato.nombre}
              className="plato-image"
            />
            <div className="plato-info">
              <h3>{plato.nombre}</h3>
              <p>{plato.descripcion}</p>
              <p>
                <strong>Precio:</strong> ${plato.precio}
              </p>
              <button
                onClick={() => handleAddToCart(plato)}
                className="buy-button"
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
