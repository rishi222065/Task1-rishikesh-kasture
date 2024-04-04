import React, { useEffect, useState } from 'react'
import '../ListProduct/ListProduct.css'
import cross_icon from '../../assets/cart_cross_icon.png'

const ListProduct = () => {

const [allproducts,setAllProducts] =useState([])  //array of objects to store all


const fetchInfo =async ()=>{
  await fetch("http://localhost:4000/allproducts")
  .then((res)=>res.json())
  .then((data)=>{setAllProducts(data)})
}

useEffect(()=>{
  fetchInfo()

},[])

const remove_product =async(id)=>{
  await fetch('http://localhost:4000/removeproduct',{
    method: "POST",
    headers:{
      Accept: "application/json",
      "content-Type":'application/json',
    },
    body:JSON.stringify({id:id})
  }  
  )
  await fetchInfo();
}



  return (
    <div className='list-product'>
      <h1>All Products List </h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>title</p>
        <p>old price</p>
        <p>new price</p>
        <p>category</p>
        <p>remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return (<>
          <div key={index} className="listproduct-format-main">
            <img src={product.image} alt="" className='listproduct=product-icon' style={{width:"80%"}} />
            
          <p>{product.name}</p>
          <p>${product.old_price}</p>
          <p>${product.new_price}</p>
          <p>{product.category}</p>
        
          <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
          </div>
          <hr />
          </>
        )})}
        
        </div>        
    </div>
  )
}

export default ListProduct