import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";
import appVideo from "../../../src/assets/App Divina Cocina.mp4";

const AppDownload = () => {
  return (
    
    <div className="app-download" id="app-download"style={{ marginTop: '120px' }}>
      <h2>¡Descarga nuestra App y mejora tu experiencia!</h2>
      <p>
        Para una mejor experiencia, descarga nuestra App <br /> <strong>RestVolucion App</strong>
      </p>
      <div className="app-download-platforms">
        <a
          href="https://play.google.com/store/apps/details?id=com.restvolucion"
          className="download-button"
          aria-label="Download from Google Play Store"
        >
          <img src={assets.play_store} alt="Download from Google Play Store" />
        </a>
        <a
          href="https://apps.apple.com/app/id123456789"
          className="download-button"
          aria-label="Download from Apple App Store"
        >
          <img src={assets.app_store} alt="Download from Apple App Store" />
        </a>
      </div>
      <div className="app-demo-video">
        <video controls>
          <source src={appVideo} type="video/mp4" />
          Tu navegador no soporta la reproducción de videos.
        </video>
      </div>
    </div>
  );
};

export default AppDownload;
