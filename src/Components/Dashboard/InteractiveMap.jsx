import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const InteractiveMap = () => {
  const [predios, setPredios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamada a tu API de FastAPI
    fetch('http://localhost:8000/api/predios') 
      .then(res => res.json())
      .then(data => {
        setPredios(data);
        setLoading(false);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  if (loading) return <p>Cargando mapa...</p>;

  return (
    <div style={{ height: '600px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
      <MapContainer 
        center={[28.6850292, -106.0765387]} // Centro inicial en el Tec
        zoom={18} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Esri &mdash; Source: Esri'
        />

        {predios.map((predio) => (
          <React.Fragment key={predio.id_predio}>
            {/* 1. Marcador del Predio (opcional, como referencia) */}
            <CircleMarker 
              center={[predio.lat, predio.lng]} 
              radius={5} 
              pathOptions={{ color: 'white', fillColor: 'white' }} 
            >
              <Popup>📍 Centro del Predio: {predio.id_predio}</Popup>
            </CircleMarker>

            {/* 2. MAPEADO ANIDADO: Dibujamos las áreas de este predio */}
            {predio.areas.map((area) => (
              <CircleMarker
                key={area.id_areariego}
                center={[area.latitud, area.longitud]} // Usando tus nombres de AreaSchema
                radius={12}
                pathOptions={{ 
                  fillColor: '#3498db', 
                  color: 'white', 
                  weight: 2, 
                  fillOpacity: 0.8 
                }}
              >
                <Popup>
                  <div style={{ textAlign: 'center' }}>
                    <strong>Área de Riego</strong><br />
                    <span>Cultivo: {area.tipo_cultivo || 'No especificado'}</span><br />
                    <hr />
                    <button onClick={() => alert(`Cargando datos de area: ${area.id_areariego}`)}>
                      Ver Humedad
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