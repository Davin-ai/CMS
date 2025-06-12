import React from 'react'
import ReactDOM from 'react-dom'
import "./DeleteModal.css"
import { toast } from 'react-toastify';



function DeleteModal({ submitAction, cancelAction, title }) {


  return ReactDOM.createPortal(
    <div className='modal-paren active'>
      <div className='delete-modal'>
        <h1>{title}</h1>
        <div className="delete-modal-btn">
          <button className='delete-btn delete-modal-accept-btn'
            onClick={() => {
              submitAction()
              toast.success("با موفقیت حذف شد!")
            }}>بله</button>        
          <button className='delete-btn delete-modal-reject-btn'
           onClick={() =>
            cancelAction()
            }>خیر</button>
        </div>
      </div>
    </div>, document.getElementById('modals-parent')
  )
}

export default DeleteModal