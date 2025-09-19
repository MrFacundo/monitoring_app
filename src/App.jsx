import React, { useEffect, useState, useRef, useCallback } from 'react'
import 'leaflet/dist/leaflet.css'
import './leaflet-fix'
import './App.css'
import EarthquakeMap from './EarthquakeMap'
import EarthquakeList from './EarthquakeList'
import TimeSelector from './TimeSelector'

const MemoEarthquakeList = React.memo(EarthquakeList)
const MemoTimeSelector = React.memo(TimeSelector)
const MemoEarthquakeMap = React.memo(EarthquakeMap)

function App() {
  const [earthquakes, setEarthquakes] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCoords, setActiveCoords] = useState([20, 0])
  const [timeRange, setTimeRange] = useState('week')

  const memoizedSetActiveCoords = useCallback((coords) => {
    setActiveCoords(coords)
  }, [])

  const getUSGSUrl = (range) =>
    `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_${range}.geojson`

  const fetchTimeout = useRef(null)

  useEffect(() => {
    if (fetchTimeout.current) clearTimeout(fetchTimeout.current)
    fetchTimeout.current = setTimeout(() => {
      setLoading(true)
      fetch(getUSGSUrl(timeRange))
        .then(res => res.json())
        .then(data => {
          setEarthquakes((data.features || []).slice(0, 5))
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }, 300)

    return () => clearTimeout(fetchTimeout.current)
  }, [timeRange])

  return (
    <div className="app-container">
      <h1>Earthquake Dashboard</h1>
      <h2>Significant earthquakes</h2>
      <p className="desc-source">
        <em>
          Source: <a href="https://earthquake.usgs.gov/" target="_blank" rel="noopener noreferrer">USGS</a>
        </em>
      </p>
      <MemoTimeSelector timeRange={timeRange} setTimeRange={setTimeRange} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="dashboard-layout">
          <div className="left-panel">
            <MemoEarthquakeList
              earthquakes={earthquakes}
              setActiveCoords={memoizedSetActiveCoords}
            />
          </div>

          <div className="right-panel">
            <MemoEarthquakeMap
              earthquakes={earthquakes}
              activeCoords={activeCoords}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App