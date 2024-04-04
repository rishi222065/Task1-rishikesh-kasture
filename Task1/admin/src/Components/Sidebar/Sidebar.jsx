import React from 'react'
import "../Sidebar/Sidebar.css"
import {Link} from "react-router-dom"
import add_product_icon from "../../assets/admin-cart-icon.png"
import list_product_icon from "../../assets/file-solid.svg"

const Sidebar = () => {
  return (
    <div className='Sidebar'>
<Link to={"/addproduct"} style={{textDecoration:"none"}}>
    <div className="sidebar-item">
        <img src={add_product_icon} alt="" />
        <p>Add Product</p>

    </div>
</Link>
<Link to={"/listproduct"} style={{textDecoration:"none"}}>
    <div className="sidebar-item">
        <img src={list_product_icon} alt="" style={{width:"25px"}}/>
        <p>Add Product</p>
        
    </div>
</Link>


    </div>
  )
}

export default Sidebar