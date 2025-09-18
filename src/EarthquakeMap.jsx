import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

function EarthquakeMap({ earthquakes, activeId, activeCoords }) {
  return (
    <div style={{ width: '100%', maxWidth: '600px', height: '400px', margin: '2rem auto' }}>
      <MapContainer center={activeCoords} zoom={2} style={{ width: '100%', height: '400px' }}>
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
            {activeId === eq.id && (
              <Popup open>
                <strong>{eq.properties.place}</strong><br />
                Mag: {eq.properties.mag}<br />
                Time: {new Date(eq.properties.time).toLocaleString()}
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

function MapPanner({ coords }) {
  const map = useMap()
  React.useEffect(() => {
    map.setView(coords)
  }, [coords, map])
  return null
}

export default EarthquakeMap
