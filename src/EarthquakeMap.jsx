import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
function EarthquakeMap({ earthquakes, activeCoords }) {
  return (
    <div className="earthquake-map-container">
      <MapContainer center={activeCoords} zoom={2} className="map-container">
        <MapPanner coords={activeCoords} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {earthquakes.map(eq => (
          <Marker
            key={eq.id}
            position={[eq.geometry.coordinates[1], eq.geometry.coordinates[0]]}
          >
            <Popup>
              <strong>{eq.properties.place}</strong><br />
              Mag: {eq.properties.mag}<br />
              Time: {new Date(eq.properties.time).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function MapPanner({ coords }) {
  const map = useMap()
  React.useEffect(() => {
    map.setView(coords)
  }, [coords, map])
  return null
}

export default EarthquakeMap
