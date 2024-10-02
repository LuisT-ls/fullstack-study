import React, { useState, useEffect } from 'react'
import styles from '../styles/Weather.module.css'

function Weather() {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const simulatedWeatherData = {
      city: 'São Paulo',
      temperature: 25,
      condition: 'Ensolarado'
    }
    setWeather(simulatedWeatherData)
  }, [])

  return (
    <div className={styles.weatherContainer}>
      <h2 className={styles.weatherTitle}>Clima Atual</h2>
      {weather ? (
        <div className={styles.weatherDetails}>
          <p>
            <strong>Cidade:</strong> {weather.city}
          </p>
          <p>
            <strong>Temperatura:</strong> {weather.temperature}°C
          </p>
          <p>
            <strong>Condição:</strong> {weather.condition}
          </p>
        </div>
      ) : (
        <p>Carregando dados do clima...</p>
      )}
    </div>
  )
}

export default Weather
