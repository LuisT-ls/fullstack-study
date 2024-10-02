import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="navbar">
          <div className="logo">
            <h1>My App</h1>
          </div>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">Sobre</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2024 My App - Todos os direitos reservados.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
