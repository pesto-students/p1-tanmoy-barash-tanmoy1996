import React from 'react'
import './style.css'

export default function Button(props) {
  return (
    <button 
      className='fab'
      disabled={props.disabled} 
      onClick={props.action}> 
        {props.children} 
    </button>
  )
}
