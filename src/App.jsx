import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import './App.css'
import EarthquakeMap from './EarthquakeMap'
import EarthquakeList from './EarthquakeList'

function App() {
  const [earthquakes, setEarthquakes] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCoords, setActiveCoords] = useState([20, 0])

  const USGS_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson'

  useEffect(() => {
    fetch(USGS_URL)
      .then(res => res.json())
      .then(data => {
        setEarthquakes(data.features || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="app-container"><h1>Earthquake Dashboard</h1><p>Loading...</p></div>

  return (
    <div className="app-container">
      <h1>Earthquake Dashboard</h1>
      <h2>Significant earthquakes from the past week</h2>
      <p><em>Source: <a href="https://earthquake.usgs.gov/" target="_blank" rel="noopener noreferrer">USGS</a></em></p>
      
      <EarthquakeList
        earthquakes={earthquakes}
        setActiveCoords={setActiveCoords}
      />
      
      <EarthquakeMap
        earthquakes={earthquakes}
        activeCoords={activeCoords}
      />
    </div>
  )
}

export default App