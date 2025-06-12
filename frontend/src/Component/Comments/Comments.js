import React, { useEffect, useState } from 'react'
import './Comments.css'
import Errorbox from '../Errorbox/Errorbox'
import DetailsModal from '../DetailsModal/DetailsModal'
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../EditModal/EditModal'

export default function Comments() {

  const [allComments, setAllComments] = useState([])
  const [mainComment, setMainComment] = useState('')
  const [isShowMainComment, setIsShowMainComment] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [commentID, setCommentID] = useState(null)
  const [showEditlModal, setShowEditlModal] = useState(false)
  const [newComment, setNewComment] = useState()
  const [showAproveMoadl, setShowAproveMoadl] = useState(false)

  useEffect(() => {
    getAllComments()
  }, [])


  function getAllComments() {
    fetch(" http://localhost:8000/api/comments").then(res => res.json()).then(comments => setAllComments(comments));
  }



  const closeDetailModal = () => {
    setIsShowMainComment(false)
  }

  const deleteModalsubmitAction = () => {


    fetch(`http://localhost:8000/api/comments/${commentID}`,
      { method: 'DELETE' }).then(res => res.json()).then(result => {
        setShowDeleteModal(false)
        getAllComments()
      })


  }

  const deleteModalCancelAction = () => {
    setShowDeleteModal(false)
  }

  const closeEditModal = () => {
    setShowEditlModal(false)
  }

  const updateComment = (event) => {
    event.preventDefault()
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: newComment })
    }).then(res => res.json())
      .then(result => {
        console.log(result);
        setShowEditlModal(false)
        getAllComments()

      })
  }

  const aproveModalsubmitAction = () => {
console.log('helooo');

    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: 'POST'
    }).then(res => res.json())
      .then(result => {
        console.log(result);
        setShowAproveMoadl(false)
        getAllComments()
      })

  }

  const aproveModalCancelAction = () => {
    setShowAproveMoadl(false)
  }


  return (
    <div className='cms-main'>


      {allComments.length ? (<table className='cms-table'>
        <h1 className='cms-title'>لیست کامنت ها</h1>

        <thead>
          <tr>
            <th>اسم کاربر</th>
            <th>محصول</th>
            <th>کامنت</th>
            <th>تاریخ</th>
            <th>ساعت</th>
          </tr>
        </thead>

        <tbody>
          {allComments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.userID}</td>
              <td>{comment.productID}</td>
              <td><button onClick={() => {
                setIsShowMainComment(true)
                setMainComment(comment.body)
              }}>دیدن متن</button></td>
              <td>{comment.date}</td>
              <td>{comment.hour}</td>
              <td>
                <button onClick={() => {
                  setShowAproveMoadl(true)
                  setCommentID(comment.id)
                }}>تایید</button>
                <button onClick={() => {
                  setShowDeleteModal(true)
                  setCommentID(comment.id)
                }}>حذف</button>
                <button onClick={() => {
                  setShowEditlModal(true)
                  setNewComment(comment.body)
                  setCommentID(comment.id)
                }}>ویرایش</button>
                <button>پاسخ</button>                
              </td>
            </tr>
            
          ))}

        </tbody>
      </table>) : (<Errorbox msg="هیچ کامنتی یافت نشد" />)}

      {
        isShowMainComment && (<DetailsModal onHide={closeDetailModal}>
          <p className='text-modal'>{mainComment}</p>
        </DetailsModal>)
      }

      {
        showDeleteModal && (
          <DeleteModal title={'ایا از حذف محصول اطمینان دارید؟'} submitAction={deleteModalsubmitAction} cancelAction={deleteModalCancelAction}></DeleteModal>
        )
      }

      {
        showEditlModal && (
          <EditModal onHide={closeEditModal} onSubmit={updateComment}>

            <textarea type="text" value={newComment} onChange={(event) => setNewComment(event.target.value)} />

          </EditModal>
        )
      }

      {
        showAproveMoadl && <DeleteModal title={'ایا از تایید محصول اطمینان دارید؟'} submitAction={aproveModalsubmitAction} cancelAction={aproveModalCancelAction}></DeleteModal>
      }


    </div>
  )
}
