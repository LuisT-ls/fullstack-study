import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

function Home() {
  const [tipOfTheDay, setTipOfTheDay] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTipOfTheDay = async () => {
      setLoading(true)
      try {
        // Simulando uma chamada de API com um atraso
        await new Promise(resolve => setTimeout(resolve, 1000))
        const tips = [
          'Beba pelo menos 8 copos de água por dia para manter-se hidratado.',
          'Faça uma pausa de 5 minutos a cada hora de trabalho para descansar os olhos.',
          'Pratique 30 minutos de exercício moderado diariamente para melhorar sua saúde.',
          'Estabeleça uma rotina de sono regular para melhorar sua qualidade de vida.',
          'Aprenda algo novo todos os dias para estimular seu cérebro.',
          'Pratique a gratidão diariamente listando 3 coisas pelas quais você é grato.',
          'Reduza o tempo de tela antes de dormir para melhorar a qualidade do seu sono.'
        ]
        const randomTip = tips[Math.floor(Math.random() * tips.length)]
        setTipOfTheDay(randomTip)
      } catch (error) {
        console.error('Erro ao buscar a dica do dia:', error)
        setTipOfTheDay(
          'Não foi possível carregar a dica do dia. Tente novamente mais tarde.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchTipOfTheDay()
  }, [])

  return (
    <div className={styles.homeContainer}>
      <h2 className={styles.homeTitle}>Bem-vindo ao My App</h2>
      <p className={styles.homeDescription}>
        Este é um projeto fullstack com frontend e backend.
      </p>
      <div className={styles.tipContainer}>
        <h3 className={styles.tipTitle}>Dica do Dia</h3>
        {loading ? (
          <p className={styles.loading}>Carregando dica do dia...</p>
        ) : (
          <p className={styles.tipContent}>{tipOfTheDay}</p>
        )}
      </div>
    </div>
  )
}

export default Home
