import React, { useState, useEffect, useCallback } from 'react'
import styles from '../styles/Dashboard.module.css'

const Hourglass = ({ totalTime, currentTime }) => {
  const progress = (currentTime / totalTime) * 100
  const sandHeight = 80
  const topSandHeight = Math.min(sandHeight, sandHeight * (progress / 100))
  const bottomSandHeight = sandHeight - topSandHeight

  return (
    <svg
      width="120"
      height="160"
      viewBox="0 0 120 160"
      className={styles.hourglass}
    >
      {/* Hourglass outline */}
      <path
        d="M30,10 Q30,0 40,0 H80 Q90,0 90,10 V70 Q90,80 80,80 H40 Q30,80 30,70 V10 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M30,150 Q30,160 40,160 H80 Q90,160 90,150 V90 Q90,80 80,80 H40 Q30,80 30,90 V150 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />

      {/* Sand in top half */}
      <path
        d={`M35,10 Q35,5 40,5 H80 Q85,5 85,10 V${10 + topSandHeight} Q60,${
          15 + topSandHeight
        } 35,${10 + topSandHeight} Z`}
        fill="currentColor"
        opacity="0.7"
      />

      {/* Sand in bottom half */}
      <path
        d={`M35,150 Q35,155 40,155 H80 Q85,155 85,150 V${
          150 - bottomSandHeight
        } Q60,${145 - bottomSandHeight} 35,${150 - bottomSandHeight} Z`}
        fill="currentColor"
        opacity="0.7"
      />

      {/* Falling sand particles */}
      {progress < 100 && (
        <g className={styles.sandParticles}>
          {[...Array(5)].map((_, i) => (
            <circle
              key={i}
              cx="60"
              cy="80"
              r="1"
              fill="currentColor"
              opacity="0.7"
            >
              <animate
                attributeName="cy"
                dur={`${0.5 + i * 0.1}s`}
                repeatCount="indefinite"
                values="80; 140; 140"
                keyTimes="0; 0.8; 1"
              />
              <animate
                attributeName="opacity"
                dur={`${0.5 + i * 0.1}s`}
                repeatCount="indefinite"
                values="0.7; 0.7; 0"
                keyTimes="0; 0.8; 1"
              />
            </circle>
          ))}
        </g>
      )}
    </svg>
  )
}

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60)
  const [timer, setTimer] = useState(pomodoroTime)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [gameTime, setGameTime] = useState(10)
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [highScore, setHighScore] = useState(0)

  const runGameTimer = useCallback(() => {
    setGameTime(prevTime => {
      if (prevTime <= 1) {
        setIsGameRunning(false)
        setShowResult(true)
        if (clickCount > highScore) {
          setHighScore(clickCount)
        }
        return 0
      }
      return prevTime - 1
    })
  }, [clickCount, highScore])

  useEffect(() => {
    let interval
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsTimerRunning(false)
      alert('Pomodoro completo! Hora de uma pausa.')
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timer])

  useEffect(() => {
    let gameInterval
    if (isGameRunning) {
      gameInterval = setInterval(runGameTimer, 1000)
    }
    return () => clearInterval(gameInterval)
  }, [isGameRunning, runGameTimer])

  const addTask = e => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = index => {
    const newTasks = [...tasks]
    newTasks[index].completed = !newTasks[index].completed
    setTasks(newTasks)
  }

  const startStopTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const resetTimer = () => {
    setTimer(pomodoroTime)
    setIsTimerRunning(false)
  }

  const handlePomodoroTimeChange = e => {
    const newTime = parseInt(e.target.value, 10) * 60
    setPomodoroTime(newTime)
    setTimer(newTime)
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
    if (isEditing) {
      setTimer(pomodoroTime)
    }
  }

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  const startGame = () => {
    setClickCount(0)
    setGameTime(10)
    setIsGameRunning(true)
    setShowResult(false)
  }

  const handleGameClick = () => {
    if (isGameRunning) {
      setClickCount(prevCount => prevCount + 1)
    }
  }

  const getMotivationalMessage = score => {
    if (score >= highScore && score > 50)
      return 'Uau! Você é o mestre dos cliques!'
    if (score > 40) return 'Fantástico! Seus dedos são como raios!'
    if (score > 30) return 'Impressionante! Você tem dedos mágicos!'
    if (score > 20) return 'Ótimo trabalho! Continue praticando!'
    return 'Bom esforço! Tente novamente e supere seu recorde!'
  }

  const getResultEmoji = score => {
    if (score >= highScore && score > 50) return '🏆'
    if (score > 40) return '🚀'
    if (score > 30) return '✨'
    if (score > 20) return '👍'
    return '💪'
  }

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.dashboardTitle}>Dashboard de Produtividade</h2>

      <div className={styles.todoList}>
        <h3>Lista de Tarefas</h3>
        <form onSubmit={addTask}>
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Nova tarefa"
          />
          <button type="submit">Adicionar</button>
        </form>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              onClick={() => toggleTask(index)}
              className={task.completed ? styles.completed : ''}
            >
              {task.text}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.pomodoro}>
        <h3>Pomodoro Timer</h3>
        <div className={styles.pomodoroContent}>
          <Hourglass totalTime={pomodoroTime} currentTime={timer} />
          <div className={styles.timerDisplay}>
            {isEditing ? (
              <input
                type="number"
                value={pomodoroTime / 60}
                onChange={handlePomodoroTimeChange}
                min="1"
                max="60"
              />
            ) : (
              <span className={styles.time}>{formatTime(timer)}</span>
            )}
            <button onClick={toggleEdit} className={styles.editButton}>
              {isEditing ? 'Salvar' : 'Editar'}
            </button>
          </div>
        </div>
        <div className={styles.pomodoroControls}>
          <button onClick={startStopTimer} className={styles.controlButton}>
            {isTimerRunning ? 'Pausar' : 'Iniciar'}
          </button>
          <button onClick={resetTimer} className={styles.controlButton}>
            Resetar
          </button>
        </div>
      </div>

      <div className={styles.clickGame}>
        <h3>Jogo de Cliques</h3>
        <p>Clique o máximo que puder em 10 segundos!</p>
        {!isGameRunning && !showResult && (
          <button onClick={startGame} className={styles.gameButton}>
            Iniciar Jogo
          </button>
        )}
        {isGameRunning && (
          <div>
            <button onClick={handleGameClick} className={styles.gameButton}>
              Clique! ({clickCount})
            </button>
            <p>Tempo restante: {gameTime}s</p>
          </div>
        )}
        {showResult && (
          <div className={styles.gameResult}>
            <h4>Resultado Final {getResultEmoji(clickCount)}</h4>
            <p className={styles.finalScore}>
              Sua pontuação: {clickCount} cliques
            </p>
            <p className={styles.highScore}>Recorde: {highScore} cliques</p>
            <p className={styles.motivationalMessage}>
              {getMotivationalMessage(clickCount)}
            </p>
            <button onClick={startGame} className={styles.gameButton}>
              Jogar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
