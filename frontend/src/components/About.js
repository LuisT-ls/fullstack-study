import React from 'react'
import styles from '../styles/About.module.css'

function About() {
  return (
    <div className={styles.aboutContainer}>
      <h2 className={styles.aboutTitle}>Sobre este Projeto</h2>
      <p className={styles.aboutDescription}>
        Este projeto foi criado para fins de estudo e desenvolvimento fullstack.
        Ele integra frontend e backend para oferecer uma experiência completa.
      </p>
    </div>
  )
}

export default About
