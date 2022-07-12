import React from 'react'
import './style.css'

export default function Button(props) {
  return (
      <button className='resetButton' onClick={(e)=>props.filterBy("")}>
        Reset
      </button>
  )
}
