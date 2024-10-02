import React from 'react'
import styles from '../styles/Home.module.css' // Importando como módulo

function Home({ weather }) {
  return (
    <div className={styles.homeContainer}>
      <h2 className={styles.homeTitle}>Bem-vindo ao My App</h2>
      <p className={styles.homeDescription}>
        Este é um projeto fullstack com frontend e backend.
      </p>

      {weather ? (
        <div className={styles.weatherInfo}>
          <h3>Clima Atual</h3>
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

export default Home
