import React from 'react'
import {Routes,Route} from "react-router-dom"
import Login from '../page/Login'
import Home from '../page/Home'
import Products from '../page/Products'
function Allroutes() {
  return (
    <>
    <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/login" element={<Login/>} />
<Route path="/Products" element={<Products/>}/>
    </Routes>
    </>
  )
}

export default Allroutes