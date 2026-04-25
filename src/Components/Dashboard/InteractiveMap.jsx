import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// 1. IMPORTA TU CONFIGURACIÓN DE AXIOS
import api from '../../Services/axiosConfig'; 

const InteractiveMap = () => {
  const [predios, setPredios] = useState([]);
  const [loading, setLoading] = useState(true);

  const centerChihuahua = [28.6850292, -106.0765387]; // Coordenadas de tus predios en SQL

  useEffect(() => {
    const fetchPredios = async () => {
      setLoading(true);
      try {
        // 2. USA 'api.get' EN LUGAR DE 'fetch'
        // El interceptor pegará el Token solo
        const response = await api.get('/predios/'); 
        
        if (Array.isArray(response.data)) {
          setPredios(response.data);
        }
      } catch (err) {
        console.error("Error al conectar con FastAPI:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredios();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Cargando mapa satelital...</div>;

  return (
    <div style={{ height: '600px', width: '100%', borderRadius: '15px', overflow: 'hidden', border: '1px solid #ccc' }}>
      <MapContainer center={centerChihuahua} zoom={17} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS'
        />

        {predios.map((predio) => (
          <React.Fragment key={predio.id_predio}>
            {/* 3. OJO: En tu SQL guardamos 'coordenadas' como string "lat,lng" 
               Si tu backend no lo separó, aquí hay que hacer un split o usar los campos de 'areas' */}
            
            {predio.areas && predio.areas.map((area) => (
              <CircleMarker
                key={area.id_areariego}
                center={[area.latitud, area.longitud]}
                radius={10}
                pathOptions={{ 
                  fillColor: 'white', 
                  color: '#2ecc71', 
                  weight: 3, 
                  fillOpacity: 1 
                }}
              >
                <Popup>
                  <strong>Cultivo: {area.tipo_cultivo}</strong>
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