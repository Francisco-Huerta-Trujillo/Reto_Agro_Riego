import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './InteractiveMap.css'; // Asegúrate de crear este archivo para estilos adicionales
import ImagenMapa from '../../assets/ImagenMapa.png';

const InteractiveMap = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const markers = [
    { id: 1, x: 20, y: 30, type: 'green', details: { temperature: '26.1°C', humidity: '79%', status: 'Normal' } },
    { id: 2, x: 50, y: 50, type: 'yellow', details: { temperature: '28.3°C', humidity: '65%', status: 'Warning' } },
    { id: 3, x: 70, y: 80, type: 'red', details: { temperature: '30.5°C', humidity: '50%', status: 'Alert' } },
  ];

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleClosePopup = () => {
    setSelectedMarker(null);
  };

  return (
    <div className="interactive-map">
      <TransformWrapper>
        <TransformComponent>
          <div className="map-container">
            <img src={ImagenMapa} alt="Mapa de la granja" className="map-image" />
            {markers.map((marker) => (
              <div
                key={marker.id}
                className={`marker marker-${marker.type}`}
                style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                onClick={() => handleMarkerClick(marker)}
              />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>

      {selectedMarker && (
        <div className="popup" style={{ left: `${selectedMarker.x}%`, top: `${selectedMarker.y}%` }}>
          <div className="popup-content">
            <p>Temperatura: {selectedMarker.details.temperature}</p>
            <p>Humedad: {selectedMarker.details.humidity}</p>
            <p>
              Estado: <span className={`status-${selectedMarker.type}`}>{selectedMarker.details.status}</span>
            </p>
            <button className="close-popup" onClick={handleClosePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;