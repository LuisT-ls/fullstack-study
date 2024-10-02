import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import styles from './styles/Header.module.css'
import Home from './components/Home'
import About from './components/About'
import Dashboard from './components/Dashboard'
import Weather from './components/Weather'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <Router>
        <header className={styles.header}>
          <div className={styles.logo}>My App</div>
          <nav>
            <ul className={styles.navLinks}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">Sobre</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/weather">Clima</Link>
              </li>
            </ul>
          </nav>
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {darkMode ? 'Modo Claro' : 'Modo Escuro'}
          </button>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home weather={null} />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2024 My App - Todos os direitos reservados.</p>
        </footer>
      </Router>
    </div>
  )
}

export default App
