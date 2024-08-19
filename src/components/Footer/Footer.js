import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import "./Footer.css";
import { assets } from "../../assets/assets.js";

const MyDocument = () => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Esta es la carta.</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo2} alt="Logo2" />
          <li>
              <PDFDownloadLink document={<MyDocument />} fileName="carta.pdf">
                {({ blob, url, loading, error }) =>
                  loading ? "Cargando documento..." : "Carta version Descargable"
                }
              </PDFDownloadLink>
            </li>
          <ul>
            <li>
              <a href="/trabaja-con-nosotros">Trabaja con nosotros!</a>
            </li>
            <li>
              <a href="/terminos-y-condiciones">Términos y condiciones</a>
            </li>
            <li>
              <a href="/canal-de-denuncia">Canal de Denuncia</a>
            </li>
            <li>
              <a href="/informacion-legal">Información legal</a>
            </li>
            <li>
              <a href="/terminos-y-condiciones-de-uso">
                Términos y condiciones de uso
              </a>
            </li>
            
          </ul>
          <div className="footer-social-icon">
            <img id="facebook-icon" src={assets.facebook_icon} alt="Facebook" />
            <img id="twitter-icon" src={assets.twitter_icon} alt="Twitter" />
            <img id="linkedin-icon" src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPAÑÍA</h2>
          <ul>
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="/acerca">Acerca</a>
            </li>
            <li>
              <a href="/envios">Envíos</a>
            </li>
            <li>
              <a href="/politicas-de-privacidad">Políticas de Privacidad</a>
            </li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>CONTÁCTANOS</h2>
          <ul>
            <li>+569-67699066</li>
            <li>
              <a href="mailto:contact@gonzalo.mellao.com">
                contact@gonzalo.mellao.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright © 2024 - Todos los derechos reservados. Ninguna parte de este
        material puede ser reproducida, almacenada en un sistema de recuperación
        o transmitida de ninguna manera sin el permiso previo por escrito del
        autor.
      </p>
    </div>
  );
};

export default Footer;
