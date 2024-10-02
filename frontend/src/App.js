import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import styles from './styles/Header.module.css'
import footerStyles from './styles/Footer.module.css'
import Home from './components/Home'
import About from './components/About'
import Dashboard from './components/Dashboard'
import Weather from './components/Weather'
import './globals.css'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <Router>
      <div className={`App ${styles.app}`} data-theme={theme}>
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
            {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
          </button>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </main>

        <footer className={footerStyles.footer}>
          <div className={footerStyles.footerContent}>
            <div className={footerStyles.footerLeft}>
              <div className={footerStyles.footerLogo}>My App</div>
              <ul className={footerStyles.footerLinks}>
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
            </div>
            <div className={footerStyles.footerRight}>
              <div className={footerStyles.footerSocial}>
                <a
                  href="https://www.linkedin.com/in/luis-tei/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  href="https://github.com/luist-ls"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/luis.tei"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
              <div className={footerStyles.footerCopyright}>© 2024 My App</div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
