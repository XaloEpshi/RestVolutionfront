import React, { useState } from "react";
import PlatosCRUD from "../../components/PlatosCRUD/PlatosCRUD";
import Ganancias from "../../components/Ganancias/Ganancias";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("platos");
  

  const handleReservasClick = () => {
    // URL para abrir Gmail directamente en la bandeja de entrada
    const gmailUrl = "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox";
    window.open(gmailUrl, "_blank");
  };

  return (
    <div className="admin-dashboard">
      <br />
      <h1>Administrador del Sistema</h1>
      <br />
      <div className="admin-buttons">
        <button
          onClick={() => setSelectedSection("platos")}
          className={selectedSection === "platos" ? "active" : ""}
        >
          Platos
        </button>
        <button
          onClick={() => setSelectedSection("ganancias")}
          className={selectedSection === "ganancias" ? "active" : ""}
        >
          Ganancias
        </button>
        <button
          onClick={handleReservasClick}
          className={selectedSection === "reservas" ? "active" : "notification"}
        >
          <span role="img" aria-label="bell">🔔</span> Reservas
        </button>
      </div>
      <div className="admin-section">
        {selectedSection === "platos" && (
          <div>
            <h2>Gestión de Platos</h2>
            <br />
            <PlatosCRUD />
          </div>
        )}
        {selectedSection === "ganancias" && (
          <div>
            <h2>Revisar Ganancias</h2>
            <Ganancias />
          </div>
        )}
        {/* Se elimina el componente Reservas ya que solo se abrirá el correo al hacer clic */}
      </div>
    </div>
  );
};

export default AdminDashboard;
