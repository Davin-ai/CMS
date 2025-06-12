import React, { useEffect, useState } from 'react'
import "./ProductsTable.css"
import DeleteModal from '../DeleteModal/DeleteModal'
import DetailsModal from '../DetailsModal/DetailsModal'
import EditModal from '../EditModal/EditModal'
import { AiOutlineDollarCircle } from "react-icons/ai";
import Errorbox from '../Errorbox/Errorbox'


function ProductsTable({allProdudct, getAllProdudct}) {

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowDetailModal, setIsShowDetailModal] = useState(false)
  const [isShowEditModal, setIsShowEditlModal] = useState(false)
  const [productID, setProductID] = useState(null)
  const [mainProductInfo, setMainProductInfo] = useState({})

const [productNewTitle,setProductNewTitle] =useState("")
const [productNewPrice,setProductNewPrice] =useState("")
const [productNewCount,setProductNewCount] =useState("")
const [productNewImg,setProductNewImg] =useState("")
const [productNewPopularity,setProductNewPopularity] =useState("")
const [productNewSale,setProductNewSale] =useState("")
const [productNewColors,setProductNewColors] =useState("")



  const deleteModalsubmitAction = () => {

    fetch(`http://localhost:8000/api/products/${productID}`,
      { method: 'DELETE' }
    ).then(res => res.json())
      .then(result => {
        setIsShowDeleteModal(false)
        getAllProdudct()
      })

  }


  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false)

  }



  const detailModalCencelAction = () => {
    setIsShowDetailModal(false)
  }

  const editModalCencelAction = () => {
    setIsShowEditlModal(false)
  }

  const updateProductInfos = (event) => {
    event.preventDefault()

    const productsNewInfos = {
      title: productNewTitle,
      price: productNewPrice,
      count:productNewCount,
      img: productNewImg,
      popularity: productNewPopularity,
      sale: productNewSale,
      colors: productNewColors,
    }

    fetch(`http://localhost:8000/api/products/${productID}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productsNewInfos)
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      
      getAllProdudct()
      setIsShowEditlModal(false)
    })

  }


  return (
    <>
      {
        allProdudct.length ? (
          <table className='products-table'>
            <thead>
              <tr className='products-table-heading-tr'>
                <th>عکس</th>
                <th>اسم</th>
                <th>قیمت</th>
                <th>موجودی</th>
              </tr>
            </thead>

            <tbody>
              {
                allProdudct.map((product) => (
                  <tr className='products-table-tr' key={product.id}>
                    <td>
                      <img src={product.img} alt="image" className='product-table-img' />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.popularity}</td>
                    <td>
                      <button className='product-table-btn'
                        onClick={() => {
                          setIsShowDetailModal(true)
                          setMainProductInfo(product)
                        }}>جزییات</button>
                      <button
                        className='product-table-btn'
                        onClick={() => {
                          setIsShowDeleteModal(true)
                          setProductID(product.id)
                        }}>حذف</button>
                      <button className='product-table-btn' 
                      onClick={() => {
                        setIsShowEditlModal(true)
                        setProductID(product.id)
                        setProductNewTitle(product.title)
                        setProductNewPrice(product.price)
                        setProductNewCount(product.count)
                        setProductNewImg(product.img)
                        setProductNewPopularity(product.popularity)
                        setProductNewSale(product.sale)
                        setProductNewColors(product.colors)
                        }}>ویرایش</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : (<Errorbox msg="هیچ محصولی یافت نشد" />
        )
      }

      {isShowDeleteModal && <DeleteModal title={'ایا از حذف محصول اطمینان دارید؟'} submitAction={deleteModalsubmitAction} cancelAction={deleteModalCancelAction} />}
      {isShowDetailModal && <DetailsModal onHide={detailModalCencelAction}>
        <table className='cms-table'>
          <thead>
            <tr>
              <th>محبوبیت</th>
              <th>فروش</th>
              <th>رنگ بندی</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{mainProductInfo.popularity}%</td>
              <td>{Number(mainProductInfo.sale).toLocaleString('en-US')}</td>
              <td>{mainProductInfo.colors}</td>
            </tr>
          </tbody>
        </table>
      </DetailsModal>}
      {isShowEditModal && <EditModal onHide={editModalCencelAction} onSubmit={updateProductInfos}>
        <div className='edit-products-form-group'>
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-products-input' value={productNewTitle} onChange={(event) => setProductNewTitle(event.target.value)}/>
        </div>
        <div className='edit-products-form-group'>
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder='قیمت جدید را وارد کنید' className='edit-products-input' value={productNewPrice} onChange={(event) => setProductNewPrice(event.target.value)}/>
        </div>
        <div className='edit-products-form-group'>
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder='موجودی جدید را وارد کنید' className='edit-products-input' value={productNewCount} onChange={(event) => setProductNewCount(event.target.value)}/>
        </div>
        <div className='edit-products-form-group'>
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder='آدرس کاور جدید را وارد کنید' className='edit-products-input' value={productNewImg} onChange={(event) => setProductNewImg(event.target.value)}/>
        </div>
        <div className='edit-products-form-group'>
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder='محبوبیت جدید را وارد کنید' className='edit-products-input' value={productNewPopularity} onChange={(event) => setProductNewPopularity(event.target.value)}/>
        </div>
        <div className='edit-products-form-group'>
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder='میزان فروش جدید را وارد کنید' className='edit-products-input' value={productNewSale} onChange={(event) => setProductNewSale(event.target.value)}/>
        </div>
        <div className='edit-products-form-group'>
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder='تعداد رنگ بندی جدید را وارد کنید' className='edit-products-input' value={productNewColors} onChange={(event) => setProductNewColors(event.target.value)}/>
        </div>
      </EditModal>}
    </>
  )
}
export default ProductsTable