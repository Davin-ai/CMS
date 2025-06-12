import React, { useEffect, useState } from 'react'
import Errorbox from '../Errorbox/Errorbox'
import './Users.css'
import DeleteModal from '../DeleteModal/DeleteModal'
import DetailsModal from '../DetailsModal/DetailsModal'
import EditModal from '../EditModal/EditModal'

export default function Users() {

  const [users, setUsers] = useState([])
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowDetailModal, setIsShowDetailModal] = useState(false)
  const [userID, setUserID] = useState(null)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [mainUserInfo, setMainUserInfo] = useState({})

  const [userNewFirstName, setUserNewFirstName] = useState('')
  const [userNewLastName, setUserNewLastName] = useState('')
  const [userNewUsername, setUserNewUsername] = useState('')
  const [userNewPassword, setUserNewPassword] = useState('')
  const [userNewPhone, setUserNewPhone] = useState(null)
  const [userNewCity, setUserNewCity] = useState('')
  const [userNewEmail, setUserNewEmail] = useState('')
  const [userNewAddress, setUserNewAddress] = useState('')
  const [userNewScore, setUserNewScore] = useState(null)
  const [userNewBuy, setUserNewBuy] = useState(null)

  useEffect(() => {
    getAllUsers()
  }, [])

  function getAllUsers() {
    fetch(`http://localhost:8000/api/users`).then(res => res.json()).then(users => setUsers(users))
  }

  const deleteModalsubmitAction = () => {
    fetch(`http://localhost:8000/api/users/${userID}`, { method: 'DELETE' }).then(res => res.json()).then(result => {
      setIsShowDeleteModal(false)
      getAllUsers()
    })
  }
  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false)
  }

  const editModalCencelAction = () => {
    setIsShowEditModal(false)
  }

  const updateUserInfos = (event) => {

    event.preventDefault()

    const usersNewInfos = {
      firsname: userNewFirstName,
      lastname: userNewLastName,
      username: userNewUsername,
      password: userNewPassword,
      phone: userNewPhone,
      city: userNewCity,
      email: userNewEmail,
      address: userNewAddress,
      score: userNewScore,
      buy: userNewBuy
    }

    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usersNewInfos)

    }).then(res => res.json())
      .then(result => {
        setIsShowEditModal(false)
        getAllUsers()
      })

  }

  const detailModalCencelAction = () => {
    setIsShowDetailModal(false)
  }



  return (
    <div>
      <div className='cms-main'>
        <h1 className='cms-title'>لیست کاربران</h1>
        {users.length ? (
          <table className='cms-table'>
            <thead>
              <tr>
                <th>نام و نام خانوادگی</th>
                <th>نام کاربری</th>
                <th>رمز عبور</th>
                <th>شماره تماس</th>
                <th>ایمیل</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firsname} {user.lastname}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => {
                      setIsShowDeleteModal(true)
                      setUserID(user.id)
                    }}>حذف</button>
                    <button onClick={() => {
                      setIsShowDetailModal(true)
                      setMainUserInfo(user)
                    }}>جزئیات</button>
                    <button onClick={() => {
                      setIsShowEditModal(true)
                      setUserNewFirstName(user.firsname)
                      setUserNewLastName(user.lastname)
                      setUserNewUsername(user.username)
                      setUserNewPassword(user.password)
                      setUserNewPhone(user.phone)
                      setUserNewCity(user.city)
                      setUserNewEmail(user.email)
                      setUserNewAddress(user.address)
                      setUserNewScore(user.score)
                      setUserNewBuy(user.buy)
                      setUserID(user.id)

                    }}>ویرایش</button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        ) : <Errorbox msg="هیچ کاربری یافت نشد" />
        }

        {
          isShowDeleteModal && <DeleteModal title={'ایا از حذف کاربر اطمینان دارید؟'} submitAction={deleteModalsubmitAction} cancelAction={deleteModalCancelAction}></DeleteModal>
        }
        {
          isShowEditModal && <EditModal onHide={editModalCencelAction} onSubmit={updateUserInfos}>
            <div className='edit-products-form-group'>
              <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-products-input' value={userNewFirstName} onChange={(event) => setUserNewFirstName(event.target.value)} />
            </div>
            <div className='edit-products-form-group'>
              <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-products-input' value={userNewLastName} onChange={(event) => setUserNewLastName(event.target.value)} />
            </div>
            <div className='edit-products-form-group'>
              <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-products-input' value={userNewUsername} onChange={(event) => setUserNewUsername(event.target.value)} />
            </div>
            <div className='edit-products-form-group'>
              <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-products-input' value={userNewPassword} onChange={(event) => setUserNewPassword(event.target.value)} />
            </div>
            <div className='edit-products-form-group'>
              <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-products-input' value={userNewPhone} onChange={(event) => setUserNewPhone(event.target.value)} />
            </div>
            <div className='edit-products-form-group'>
              <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-products-input' value={userNewCity} onChange={(event) => setUserNewCity(event.target.value)} />
            </div>
            <div className='edit-products-form-group'>
              <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-products-input' value={userNewEmail} onChange={(event) => setUserNewEmail(event.target.value)} />
            </div>
            <div className='edit-products-form-group'>
              <textarea type="text" placeholder='عنوان جدید را وارد کنید' className='edit-products-input' value={userNewAddress} onChange={(event) => setUserNewAddress(event.target.value)} />
            </div>
            <div className='edit-products-form-group'>
              <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-products-input' value={userNewScore} onChange={(event) => setUserNewScore(event.target.value)} />
            </div>
            <div className='edit-products-form-group'>
              <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-products-input' value={userNewBuy} onChange={(event) => setUserNewBuy(event.target.value)} />
            </div>

          </EditModal>
        }

        {
          isShowDetailModal && <DetailsModal onHide={detailModalCencelAction}>

            <table className='cms-table'>
              <thead>
                <tr>
                  <th>شهر</th>
                  <th>آدرس</th>
                  <th>امتیاز</th>
                  <th>میزان خرید</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{mainUserInfo.city}</th>
                  <th>{mainUserInfo.address}</th>
                  <th>{mainUserInfo.score}</th>
                  <th>{mainUserInfo.buy}</th>
                </tr>
              </tbody>
            </table>

          </DetailsModal>
        }

      </div>
    </div>
  )
}
