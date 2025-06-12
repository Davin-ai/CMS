import React, { useEffect } from 'react'
import './DetailsModal.css'

function DetailsModal({onHide,children}) {

  useEffect (() => {
    const checkKey = (event) => {
      if (event.keyCode === 27){
        onHide()
      }
    };
    window.addEventListener('keydown', checkKey)

    return () => window.removeEventListener('keydown', checkKey)
  })

  return (
    <div className='modal-paren active'>
    <div className='detail-modal'>
       {children}    
    </div>
    </div>
 
  )
}

export default DetailsModal