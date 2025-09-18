import React from 'react'

function EarthquakeList({ earthquakes, activeId, setActiveId, setActiveCoords }) {
  return (
    <ul className="earthquake-list">
      {earthquakes.map(eq => (
        <li
          key={eq.id}
          className={activeId === eq.id ? 'earthquake-item active' : 'earthquake-item'}
          onClick={() => {
            setActiveId(eq.id)
            setActiveCoords([eq.geometry.coordinates[1], eq.geometry.coordinates[0]])
          }}
        >
          <strong>{eq.properties.place}</strong> | Mag: {eq.properties.mag} | Time: {new Date(eq.properties.time).toLocaleString()}
        </li>
      ))}
    </ul>
  )
}

export default EarthquakeList
