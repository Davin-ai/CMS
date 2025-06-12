import React, { useEffect, useState } from 'react'
import AddNewProduct from '../AddNewProduct/AddNewProduct'
import ProductsTable from '../ProductsTable/ProductsTable'
import { ToastContainer } from 'react-toastify';


export default function Product() {

    const [allProdudct, setAllProdudct] = useState([])
  

  useEffect(() => {
    getAllProdudct()
  }, [])

  const getAllProdudct = () => {
    fetch('http://localhost:8000/api/products/').then(res => res.json()).then(products => setAllProdudct(products))
  }

  return (
    <div>
      <AddNewProduct getAllProdudct={getAllProdudct}/>
      <ProductsTable allProdudct={allProdudct} getAllProdudct={getAllProdudct} />
      <ToastContainer />
    </div>
  )
}
