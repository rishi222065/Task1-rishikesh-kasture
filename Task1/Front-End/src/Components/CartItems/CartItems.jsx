import React, { useContext,useState } from 'react'
import "./CartItems.css"
import { ShopContext } from '../../Contex/ShopContext'
import remove_icon from "../Assets/cart_cross_icon.png"



const CartItems = () => {

const { getTotalCartAmount, all_product, cartItems, removeFromCart,addToCart} = useContext(ShopContext)


const handleQuantityChange = (itemId, newQuantity) => {
        const diff = newQuantity - cartItems[itemId];
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                addToCart(itemId);
            }
        } else if (diff < 0) {
            for (let i = 0; i < -diff; i++) {
                removeFromCart(itemId);
            }
        }
    };
 
    
    
    return (
        <div className='CartItems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>title</p>
                <p>price</p>
                <p>quantity</p>
                <p>Total</p>
                <p>remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return <div key={e.id}>
                        <div className='cartitems-format cartitems-format-main'>
                            <img src={e.image} alt="" className='carticon-product-icon' />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                           
                            <select
                                    className='cartitems-quantity'
                                    value={cartItems[e.id]}
                                    onChange={(event) => handleQuantityChange(e.id, parseInt(event.target.value))}
                                >
                                    {[...Array(10)].map((_, index) => (
                                        <option key={index} value={index}>{index}</option>
                                    ))}
                                </select>
                                <p>{e.new_price * cartItems[e.id]}</p>
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" /> {/* Fixed function name here */}
                        </div>
                        <hr />
                    </div>
                }
                return null;
            })}
            <div className='cartitems-down'>
                    <div className='cartitems-total'>
                        <h1>cart Totals</h1>
                        <div className='cartitems-total-item'>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>

                        </div>
                        <hr />
                        <div className='cartitems-total-item '>
                            <p>Shipping</p>
                            <p>Free Shipping on orders over $99.</p>
                        </div>
                        <hr />
                        <div className='cartitems-total-item'>
                            <h3>total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                        <button >Checkout</button>
                    </div >
                    </div>
        </div>
    )
}

export default CartItems