import React, { useState, useEffect } from 'react'
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import { useStopwatch } from 'react-timer-hook';

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const {
    seconds,
    minutes,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });
  const [timer, setTimer] = useState(start)


  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstDice = dice[0].value
    const allDice = dice.every(die => die.value === firstDice)

    if (allHeld && allDice) {
      setTenzies(prevState => !prevState)
      // setTimer(pause)
      console.log("You Won")
    }
  }, [dice])

  useEffect(() => {
    if (tenzies) {
      setTimer(pause)
    }
  }, [tenzies, pause])


  function createNewDice() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(createNewDice())
    }
    return newDice
  }


  function rollDice() {
    setRolls(rolls + 1)
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ?
        die :
        createNewDice()
    }))
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  function newGame() {
    setDice(allNewDice())
    setTenzies(false)
    setRolls(0)
    setTimer(reset)
  }

  const dieElements = dice.map(die => (
    <Die
      handleClick={() => holdDice(die.id)}
      isHeld={die.isHeld}
      key={die.id}
      value={die.value}
    />)
  )

  console.log(timer)

  return (
    <main>
      <div className='timer'>
        <span>{minutes}m</span>:<span>{seconds}s</span>
      </div>

      <div className='counter'><span className='counter--tag'>Counter:</span>{rolls}</div>
      {tenzies && <Confetti width="320px" height="320px" />}
      
      <div className='title'>
        {tenzies ? <h1>You Won!</h1> : <h1>Tenzies</h1>}
        <p>Roll until all dice are the same. Click each die to freeze it as its current value between rolls.</p>
      </div>

      <div className='dice--container'>
        {dieElements}
      </div>

      <button onClick={tenzies ? newGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
