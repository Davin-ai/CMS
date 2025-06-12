import React from 'react'
import './Errorbox.css'

function Errorbox({msg}) {
  return (
    <div className='cms-empty-err'>
        <h1>{msg}</h1>
    </div>
  )
}

export default Errorbox