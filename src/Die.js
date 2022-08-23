import React from 'react'
import './Die.css'

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld && "#59E391" 
  }

  return (
    <div className='dice' style={styles} onClick={props.handleClick}>
        <p className='dice--value'>{props.value}</p>
    </div>
  )
}
