import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambia useHistory por useNavigate
import './PlaceOrder.css'; // Asegúrate de que el archivo CSS esté en el mismo directorio

const PaginaDePago = () => {
  const [opcionEnvio, setOpcionEnvio] = useState('mesa'); // Por defecto, 'mesa'
  const [formData, setFormData] = useState({
    nombreDestinatario: '',
    numeroMesa: ''
  });
  const [numeroOrden, setNumeroOrden] = useState(null);

  const navigate = useNavigate(); // Usa useNavigate para la navegación

  const handleOpcionEnvioChange = (e) => {
    const nuevaOpcion = e.target.value;
    setOpcionEnvio(nuevaOpcion);
    
    // Generar número de orden si la opción es "recoger"
    if (nuevaOpcion === 'recoger') {
      const orden = Math.floor(Math.random() * 100000); // Genera un número aleatorio entre 0 y 99999
      setNumeroOrden(orden);
    } else {
      setNumeroOrden(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePago = () => {
    console.log('Datos del formulario:', formData);
    // Implementar el proceso de pago aquí
  };

  const handleVolverAlCarrito = () => {
    // Redirige al carrito
    navigate('/cart');
  };

  return (
    <div className="paymentContainer">
      <h2 id="shipping-options-title">Opciones de Pedido</h2>
      <div className="shippingOptions" id="shipping-options">
        <label htmlFor="recoger-option">
          <input
            type="radio"
            id="recoger-option"
            name="opcionEnvio"
            value="recoger"
            checked={opcionEnvio === 'recoger'}
            onChange={handleOpcionEnvioChange}
          />
          Recoger en local
        </label>
        <label htmlFor="mesa-option">
          <input
            type="radio"
            id="mesa-option"
            name="opcionEnvio"
            value="mesa"
            checked={opcionEnvio === 'mesa'}
            onChange={handleOpcionEnvioChange}
          />
          Llevar a la mesa
        </label>
      </div>
      
      {opcionEnvio === 'recoger' && (
        <div className="pickupInfo" id="pickup-info">
          <h3 id="pickup-info-title">Número de Atención</h3>
          {numeroOrden ? (
            <p id="pickup-number">Tu número de atención es: {numeroOrden}</p>
          ) : (
            <p id="pickup-number">Generando número de atención...</p>
          )}
        </div>
      )}
      
      {opcionEnvio === 'mesa' && (
        <div className="tableInfo" id="table-info">
          <h3 id="table-info-title">Número de Mesa</h3>
          <input
            type="text"
            id="numero-mesa"
            name="numeroMesa"
            value={formData.numeroMesa}
            onChange={handleInputChange}
            placeholder="Número de mesa"
            className="inputField"
          />
        </div>
      )}
      
      <button onClick={handlePago} className="paymentButton" id="payment-button">Pagar</button>
      <button onClick={handleVolverAlCarrito} className="backToCartButton" id="back-to-cart-button">Volver al Carrito</button>
    </div>
  );
};

export default PaginaDePago;
