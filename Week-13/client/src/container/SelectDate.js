import React from 'react'

export default function SelectDate(props) {
  return (
    <input type='date' onInput={(e)=>props.filterByDate(e.target.value)}/>
  )
}
