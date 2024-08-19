import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const Navbar = ({ cartItems, setShowLogin, isAuthenticated, isAdmin, handleLogout }) => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (menuName) => {
    if (menu !== menuName) {
      setMenu(menuName);
    }
    setIsOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setIsOpen(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="navbar">
      <nav className="navbar restaurant-navbar">
        <Link to="/">
          <img src={assets.logo2} alt="Logo" className="logo restaurant-logo" />
        </Link>
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul
          className={`navbar-menu restaurant-menu ${isOpen ? "open" : "closed"}`}
        >
          <li>
            <Link
              to="/"
              onClick={() => handleMenuClick("home")}
              className={menu === "home" ? "active restaurant-active" : ""}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              onClick={() => handleMenuClick("menu")}
              className={menu === "menu" ? "active restaurant-active" : ""}
            >
              Menú
            </Link>
          </li>
          <li>
            <Link
              to="/app-download"
              onClick={() => handleMenuClick("mobile-app")}
              className={menu === "mobile-app" ? "active restaurant-active" : ""}
            >
              App
            </Link>
          </li>
          <li>
            <Link
              to="/contactanos"
              onClick={() => handleMenuClick("contact-us")}
              className={menu === "contact-us" ? "active restaurant-active" : ""}
            >
              Reserva
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                to="/admin"
                onClick={() => handleMenuClick("admin")}
                className={menu === "admin" ? "active restaurant-active" : ""}
              >
                Administración
              </Link>
            </li>
          )}
        </ul>
        <div className="navbar-right restaurant-navbar-right">
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img
                src={assets.basket_icon}
                alt="Cart"
                className="icon restaurant-icon"
              />
              {cartItems.length > 0 && (
                <div className="dot restaurant-dot"></div>
              )}
            </Link>
          </div>
          {!isAuthenticated ? (
            <button
              onClick={() => setShowLogin(true)}
              className="sign-in-btn restaurant-sign-in-btn"
            >
              <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" /> Iniciar Sesión
            </button>
          ) : (
            <div className="user-menu-container">
              <FontAwesomeIcon 
                icon={faUserCircle} 
                size="2x" 
                className="user-icon" 
                onClick={toggleUserMenu} 
              />
              {userMenuOpen && (
                <div className="user-menu-dropdown">
                  {isAdmin ? (
                    <>
                      <Link to="/admin/mis-datos" className="user-menu-item">Mis Datos</Link>
                      <Link to="/admin/administracion" className="user-menu-item">Administración</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/cliente/mis-datos" className="user-menu-item">Mis Datos</Link>
                      <Link to="/cliente/mis-cupones" className="user-menu-item">Mis Cupones</Link>
                      <Link to="/cliente/actividad" className="user-menu-item">Actividad</Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="sign-out-btn restaurant-sign-out-btn"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
