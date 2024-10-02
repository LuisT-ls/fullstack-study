import React, { useState, useEffect } from 'react'
import styles from '../styles/Weather.module.css'

const API_KEY = 'f980a0f052bc2ac4a7f0b9dcc220f35f'

function Weather() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError(null)

      try {
        const coords = await getLocation()
        const weatherData = await fetchWeatherData(
          coords.latitude,
          coords.longitude
        )
        setWeather(weatherData)
      } catch (err) {
        console.error('Erro ao buscar dados meteorológicos:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não é suportada pelo seu navegador.'))
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position.coords)
        },
        async err => {
          console.warn('Erro de geolocalização:', err)
          try {
            const ipData = await fetch('https://ipapi.co/json/').then(res =>
              res.json()
            )
            resolve({ latitude: ipData.latitude, longitude: ipData.longitude })
          } catch (ipError) {
            reject(new Error('Não foi possível determinar sua localização.'))
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    })
  }

  const fetchWeatherData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Erro ao obter dados meteorológicos: ${response.status}`)
    }

    const data = await response.json()
    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].description,
      icon: data.weather[0].icon,
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed * 3.6),
      rain: data.rain ? data.rain['1h'] : 0
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>Carregando dados meteorológicos...</div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Erro: {error}</p>
        <p>
          Por favor, verifique sua conexão e permissões de localização e tente
          novamente.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.weatherContainer}>
      {weather && (
        <>
          <h2 className={styles.weatherTitle}>Clima em {weather.city}</h2>
          <div className={styles.weatherInfo}>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.condition}
              className={styles.weatherIcon}
            />
            <p className={styles.temperature}>{weather.temperature}°C</p>
            <p className={styles.condition}>{weather.condition}</p>
          </div>
          <div className={styles.weatherDetails}>
            <p>Sensação térmica: {weather.feelsLike}°C</p>
            <p>Umidade: {weather.humidity}%</p>
            <p>Vento: {weather.wind} km/h</p>
            <p>Chuva na última hora: {weather.rain} mm</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather
