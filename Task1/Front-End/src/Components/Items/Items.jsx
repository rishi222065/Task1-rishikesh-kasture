import React, { useContext } from 'react'
import '../Items/Items.css';
import {Link} from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
const Item = (props) => {
  const {product}=props;
  const {addtoCart} =useContext(ShopContext);
  return (
    <div className='item'>
       <Link to={`/product/${props.id}`}><img src={props.image} alt=""/> </Link> 
        <p>{props.name}</p>
        <div className='discription'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, consequuntur?
        </div>
        <div className="item-prices">
            <div className="item-price-new">
                ${props.new_price}
            </div>
            <div className="item-price-old">
                ${props.old_price}
            </div>
            <button onClick={()=>{addtoCart(props.id)}}>Add To Cart</button>
        </div>
    </div>
  )
}

export default Item