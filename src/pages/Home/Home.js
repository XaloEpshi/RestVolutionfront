import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    const fetchDestacados = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/destacados-activos"
        );
        setDestacados(response.data);
      } catch (error) {
        console.error("Error fetching destacados:", error);
      }
    };

    fetchDestacados();
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="/image/brooke-lark-oaz0raysASk-unsplash.jpg"
              alt="Interior del restaurante"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="/image/jay-wennington-N_Y88TWmGwA-unsplash.jpg"
              alt="Interior del restaurante"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="/image/jason-leung-poI7DelFiVA-unsplash.jpg"
              alt="Interior del restaurante"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="/image/taylor-harding-8QRJoeYfyd8-unsplash.jpg"
              alt="Interior del restaurante"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="/image/pexels-fariphotography-905847.jpg"
              alt="Interior del restaurante"
            />
          </Carousel.Item>
        </Carousel>
        <br />
        <h1>Bienvenido a RestVolucion</h1> <br />
        <h3>¡Descubre nuestro menú, inicia sesión y pide como quieras!</h3>
      </header>
      <br />
      <section className="about-section">
        <h2>Acerca de Nosotros</h2>
        <p>
          En RestVolucion, ofrecemos una experiencia culinaria única con los
          mejores ingredientes y un ambiente acogedor. La idea es poder
          brindarte una manera distinta en la atención, puedes pedir como
          quieras y pagarlo a tu manera. Inicia sesión en nuestra página
          descubre ofertas y descuentos exclusivos de acuerdo a tus gustos,
          puedes pedir en la mesa y pagar con tu celular. La idea es que la
          atención sea lo más expedita para que te guste volver.
        </p>
        <div className="highlighted-text">
          <strong>
            RECUERDA INICIA SESIÓN Y AHORRATE EL TIEMPO DE ESPERA TANTO EN PEDIR
            COMO EN PAGAR.
          </strong>
        </div>
      </section>

      <br />
      <section className="menu-section">
        <h2>Nuestros Destacados de la Semana</h2>
        <div className="menu-items">
          {destacados.length > 0 ? (
            destacados.map((plato) => (
              <div key={plato.idPlato} className="menu-item">
                <h3>{plato.nombre}</h3>
                <img
                  src={`http://localhost:3001/upload/${plato.imagen}`}
                  alt={plato.nombre}
                />
                <p>{plato.descripcion}</p>
              </div>
            ))
          ) : (
            <p>No hay platos destacados en este momento.</p>
          )}
        </div>
      </section>
      <section className="testimonials-section">
        <br />
        <h2>Testimonios</h2>
        <p>"¡La mejor comida que he probado!" - Cliente Satisfecho</p>
        <p>"Un lugar increíble para cenar." - Cliente Feliz</p>
      </section>
    </div>
  );
};

export default Home; //Actualziado 19/072024 22:20
