import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; // Corrección en la importación
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Contact from "./pages/Contact/Contact";
import AppDownload from "./components/AppDownload/AppDownload";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/cart/cart";
import PlatosCRUD from "./components/PlatosCRUD/PlatosCRUD";
import PaginaDePago from "./pages/PlaceOrder/PlaceOrder";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ClientPage from "./pages/ClientePage/ClientPage";
import RegistraAdmin from "./pages/RegistrarAdmin/RegistrarAdmin";
import "./App.css";


function App() {
  //Estados para manejar la visibilidad del inicio de sesión, el carrito, la categoria, y la autenticacion
  const [showLogin, setShowLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [category, setCategory] = useState("Todos");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  // Efecto para verificar el token al cargar la aplicacion.
  useEffect(() => {
    const token = localStorage.getItem("token");//Obtiene el token de almacenamiento local
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decodifica el token para obtener informacion
        setIsAuthenticated(true);
        setIsAdmin(decodedToken.role === 'admin'); // Verifica si el usuario es un administrador.
      } catch (error) {
        console.error('Token decoding failed:', error);//Maneja errores de la decodificacion.
      }
    }
  }, []);
  

  //Funcion para manejar el cierre de la sesion.
  const handleLogout = () => {
    localStorage.removeItem('token');//Elimina el token de almacenamiento local.
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  //Funcion para agregar un plato al carrito.
  const handleAddToCart = (plato) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.idPlato === plato.idPlato);
      if (existingItem) {
        return prevItems.map((item) =>
          item.idPlato === plato.idPlato
            ? { ...item, cantidad: item.cantidad + 1 }//Incrementa la cantidad si el plato ya esta en el carrito.
            : item
        );
      } else {
        return [...prevItems, { ...plato, cantidad: 1 }];//Agrega el plato al carrito si no esta presente. 
      }
    });
  };


  //Funcion para eliminar el plato del carrito
  const handleRemoveFromCart = (plato) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.idPlato === plato.idPlato);
      if (existingItem.cantidad === 1) {
        return prevItems.filter((item) => item.idPlato !== plato.idPlato);//Elimina el plato si la cantidad es uno.
      } else {
        return prevItems.map((item) =>
          item.idPlato === plato.idPlato
            ? { ...item, cantidad: item.cantidad - 1 }//Decrementa la cantidad si el plato esta en el carrito.
            : item
        );
      }
    });
  };

  return (
    <Router>
      {/* Muestra el componente de inicio de sesión si `showLogin` es verdadero */}
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          setIsAuthenticated={setIsAuthenticated}
          setIsAdmin={setIsAdmin}
        />
      )}
      <div className="app">
         {/* Componente de navegación */}
        <Navbar
          cartItems={cartItems}
          setShowLogin={setShowLogin}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          handleLogout={handleLogout}
        />
        {/* Configuración de rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/menu"
            element={
              <Menu
                category={category}
                setCategory={setCategory}
                onAddToCart={handleAddToCart}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="/contactanos" element={<Contact />} />
          <Route path="/app-download" element={<AppDownload />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            }
          />
          <Route path="/pago" element={<PaginaDePago />} />
          <Route path="/platos-crud" element={<PlatosCRUD />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Home />} />
          <Route path="/cliente/*" element={<ClientPage />} />
          <Route path="/register-admin" element={<RegistraAdmin />} />
        </Routes>
        {/* Pie de página */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
