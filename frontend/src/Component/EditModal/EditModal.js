import React, { useEffect } from 'react'
import './EditModal.css'

function EditModal({onHide ,onSubmit, children}) {

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
        <form className='edit-modal-form'>
            <h1>اطلاعات جدید را وارد نمایید</h1>
            {children}
            <button className='edit-form-submit' onClick={onSubmit}>ویرایش</button>
        </form>
    </div>
  )
}

export default EditModal