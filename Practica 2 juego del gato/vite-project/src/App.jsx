import './App.css'
import './index.css'
import confetti from 'canvas-confetti'
import { useState } from 'react'

// Constantes que representan los turnos del juego
const TURNS = {
  X: 'X',
  O: 'O'
}

// Componente que representa una casilla del tablero
const Square = ({ children, isSelected, updateBoard, index }) => {

  // Clase dinámica para resaltar el turno actual
  const className = `square ${isSelected ? 'is-selected' : ''}`

  // Maneja el click enviando la posición seleccionada
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

// Combinaciones posibles para ganar
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {

  // Estado del tablero con persistencia en localStorage
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  // Estado del turno con persistencia en localStorage
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // Estado que almacena al ganador (null = juego activo)
  const [winner, setWinner] = useState(null)

  // Función que verifica si existe un ganador
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {

      const [a, b, c] = combo

      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }

    return null
  }

  // Reinicia el juego y limpia los estados
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    // Limpia almacenamiento local
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  // Actualiza el tablero cuando se selecciona una casilla
  const updateBoard = (index) => {

    // Si la casilla está ocupada o el juego terminó, no hacer nada
    if (board[index] || winner) return

    // Copia inmutable del tablero
    const newBoard = [...board]

    // Coloca la jugada actual
    newBoard[index] = turn

    // Actualiza estado del tablero
    setBoard(newBoard)

    // Cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Guarda en localStorage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // Verifica si hay ganador
    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      setWinner(newWinner)
      for(let i = 0; i < 20; i++) {
      confetti() // Lanza animación si hay ganador
      }
      
    } else if (!newBoard.includes(null)) {
      setWinner(false) // Indica empate
    }
  }

  return (
    <main className='board'>

      {/* Botón para reiniciar el juego */}
      <button onClick={resetGame}>
        Reiniciar Juego
      </button>

      <h1>Juego del Gato</h1>

      {/* Sección del tablero */}
      <section className="game">
        {
          board.map((_, index) => (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          ))
        }
      </section>

      {/* Indicador visual del turno actual */}
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {/* Sección que muestra ganador o empate */}
      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {winner === false ? 'Empate' : 'Ganó: '}
                {winner}
              </h2>

              <button onClick={resetGame}>
                Empezar de nuevo
              </button>
            </div>
          </section>
        )
      }

    </main>
  )
}

export default App