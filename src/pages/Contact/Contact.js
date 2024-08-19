import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event: '',
    date: '',
    message: '',
  });

  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      event: formData.event,
      date: formData.date,
      message: formData.message,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/send-reservation', data);
      console.log('Reserva enviada con éxito:', response.data);
      // Mostrar mensaje de éxito
      setShowMessage(true);
      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      console.error('Error al enviar la reserva:', error);
      // Puedes manejar errores aquí, como mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="contact-container">
      <h1>¡Hablemos!</h1>
      <h2>Si quieres reservar con nosotros escríbenos</h2>
      <p>Para asegurar la calidad y optimización de nuestro servicio, por favor llena todos los campos que solicitamos. ¡Gracias!</p>
      <form onSubmit={handleSubmit} className="reservation-form">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo Electrónico" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Teléfono" required />
        <select name="event" value={formData.event} onChange={handleChange} required>
          <option value="">Seleccione un tipo de evento</option>
          <option value="Cumpleaños">Cumpleaños</option>
          <option value="Aniversario">Aniversario</option>
          <option value="Reunión de Negocios">Reunión de Negocios</option>
          <option value="Otro">Otro</option>
        </select>
        <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="Fecha DD/MM/AA" required />
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Mensaje" required></textarea>
        <button type="submit">Enviar Reserva</button>
      </form>
      {showMessage && (
        <div className="floating-message">
          Tu mensaje fue enviado, pronto nos pondremos en contacto contigo.
        </div>
      )}
    </div>
  );
};

export default Contact;
