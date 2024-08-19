import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const navigate = useNavigate(); // Obtén el objeto navigate
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // Memorizar calculateTotal para evitar re-renderizados innecesarios
  const calculateTotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  }, [cartItems]);

  useEffect(() => {
    setTotal(calculateTotal());
  }, [cartItems, calculateTotal]); // Ahora calculateTotal está incluido en las dependencias

  const handleApplyDiscount = () => {
    if (discountCode === "DESCUENTO10") {
      const totalBeforeDiscount = calculateTotal();
      const discount = totalBeforeDiscount * 0.1; // Aplicar un 10% de descuento
      setDiscountAmount(Math.round(discount));
      setTotal(Math.round(totalBeforeDiscount - discount));
      setDiscountApplied(true);
      setDiscountCode(""); // Limpiar el campo de entrada
    } else {
      alert("Código de descuento no válido");
    }
  };

  const handleProceedToCheckout = () => {
    navigate("/pago"); // Redirige a la página de pago
  };

  // Redondear un número a entero
  const formatPrice = (price) => Math.round(price);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Nombre</p>
          <p>Precio</p>
          <p>Cantidad</p>
          <p>Total</p>
          <p>Eliminar</p>
        </div>
        <hr />
        {cartItems.map((item) => {
          if (item.cantidad > 0) {
            return (
              <div key={item.idPlato} className="cart-item">
                <img
                  src={`http://localhost:3001/upload/${item.imagen}`}
                  alt={item.nombre}
                />
                <p>{item.nombre}</p>
                <p>${formatPrice(item.precio)}</p>
                <p>{item.cantidad}</p>
                <p>${formatPrice(item.precio * item.cantidad)}</p>
                <p onClick={() => onRemoveFromCart(item)} className="cross">
                  x
                </p>
              </div>
            );
          }
          return null; // Devolver null si item.cantidad <= 0
        })}
      </div>
      <div className="cart-bottom">
        <br />
        <div className="cart-promocode">
          <p>
            Si tienes un código de descuento, por favor ingrésalo antes de pagar
          </p>
          <div className="cart-promocode-input">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Introduce tu código aquí"
            />
            <button onClick={handleApplyDiscount}>Aplicar</button>
          </div>
        </div>
        <div className="cart-total">
          <br />
          <br />
          <h2>Total Carrito</h2>
          {discountApplied && (
            <p>Descuento aplicado: ${formatPrice(discountAmount)}</p>
          )}
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${formatPrice(total)}</p>{" "}
            {/* Muestra el total con descuento si se ha aplicado */}
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${formatPrice(total)}</b> {/* Total sin costo de envío */}
          </div>
          <button onClick={handleProceedToCheckout}>Proceder al pago</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
