import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const InteractiveMap = () => {
  // 1. Inicializamos como array vacío para evitar el error ".map is not a function"
  const [predios, setPredios] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:8000/api/v1/predios'; // URL corregida con /v1
  const centerChihuahua = [28.6850292, -106.0765387]; // Tec de Monterrey

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: No se encontró la ruta`);
        return res.json();
      })
      .then((data) => {
        // Verificamos que los datos sean una lista antes de guardarlos
        if (Array.isArray(data)) {
          setPredios(data);
        } else {
          console.error("La API no devolvió una lista:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al conectar con FastAPI:", err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Cargando mapa satelital...</div>;

  return (
    <div style={{ height: '600px', width: '100%', borderRadius: '15px', overflow: 'hidden', border: '1px solid #ccc' }}>
      <MapContainer 
        center={centerChihuahua} 
        zoom={17} 
        style={{ height: '100%', width: '100%' }}
      >
        {/* Capa Satelital de Esri */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS'
        />

        {/* Renderizado de Predios y sus Áreas */}
        {predios.length > 0 && predios.map((predio) => (
          <React.Fragment key={predio.id_predio}>
            
            {/* Punto central del Predio */}
            <CircleMarker 
              center={[predio.lat, predio.lng]} 
              radius={6} 
              pathOptions={{ color: 'white', fillColor: 'white', fillOpacity: 1 }} 
            >
              <Popup>
                <strong>Predio Principal</strong><br />
                ID: {predio.id_predio.substring(0, 8)}...
              </Popup>
            </CircleMarker>

            {/* Áreas de Riego dentro de este Predio */}
            {predio.areas && predio.areas.map((area) => (
              <CircleMarker
                key={area.id_areariego}
                center={[area.latitud, area.longitud]}
                radius={12}
                pathOptions={{ 
                  fillColor: '#3498db', // Color azul por defecto
                  color: 'white', 
                  weight: 2, 
                  fillOpacity: 0.8 
                }}
              >
                <Popup>
                  <div style={{ textAlign: 'center' }}>
                    <strong>Área: {area.tipo_cultivo || 'Sin nombre'}</strong><br />
                    <small>Lat: {area.latitud.toFixed(4)}</small><br />
                    <small>Lng: {area.longitud.toFixed(4)}</small>
                    <hr />
                    <button onClick={() => console.log("Cargando detalles de", area.id_areariego)}>
                      Ver Telemetría
                    </button>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
            
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;