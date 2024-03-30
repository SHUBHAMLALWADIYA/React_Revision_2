import React from 'react'
import {Routes,Route} from "react-router-dom"
import Login from '../page/Login'
import Home from '../page/Home'
import Products from '../page/Products'
import ProductDetailPage from '../page/ProductDetailPage'
function Allroutes() {
  return (
    <>
    <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/login" element={<Login/>} />
<Route path="/Products" element={<Products/>}/>
<Route path="/product/:productId" element={<ProductDetailPage/>} />

    </Routes>
    </>
  )
}

export default Allroutes