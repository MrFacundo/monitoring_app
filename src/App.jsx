import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import './App.css'

import EarthquakeMap from './EarthquakeMap'
import EarthquakeList from './EarthquakeList'

function App() {
  const [earthquakes, setEarthquakes] = useState([])
  const [loading, setLoading] = useState(true)
  const USGS_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson'
  const [activeId, setActiveId] = useState(null)
  const [activeCoords, setActiveCoords] = useState([20, 0])

  useEffect(() => {
    fetch(USGS_URL)
      .then(res => res.json())
      .then(data => {
        setEarthquakes(data.features || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])


  return (
    <div className="app-container">
      <h1>Earthquake Dashboard</h1>
      {loading ? <p>Loading...</p> : (
        <>
          <EarthquakeList
            earthquakes={earthquakes}
            activeId={activeId}
            setActiveId={setActiveId}
            setActiveCoords={setActiveCoords}
          />
          <EarthquakeMap
            earthquakes={earthquakes}
            activeId={activeId}
            activeCoords={activeCoords}
          />
        </>
      )}
    </div>
  )
}

export default App
