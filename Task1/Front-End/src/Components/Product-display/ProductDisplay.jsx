import React from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { useContext,useState } from 'react'
import { ShopContext } from '../../Contex/ShopContext'

const ProductDisplay = (props) => {
    const { product } = props;
    const {addToCart}=useContext(ShopContext)
    // const [quantity, setQuantity] = useState(1); 





    return (
        <div className='Productdisplay'>
            <div className='productdisplay-left'>
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="product" />
                    <img src={product.image} alt="product" />
                    <img src={product.image} alt="product" />
                    <img src={product.image} alt="product" />
                    <img src={product.image} alt="product" />
                </div>
                <div className='productdisplay-img'>
                    <img className='productdisplay-main-img' src={product.image} alt="product" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>


                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ${product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${product.new_price}
                    </div>
                </div>
                <div className="productdisplay-right-discription">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora asperiores, at neque maxime error non. Odio doloremque repudiandae minus quidem ab aliquid necessitatibus, sit accusantium maiores atque temporibus repellendus architecto placeat, hic consectetur asperiores repellat totam vitae doloribus eius. Ullam porro explicabo cupiditate nihil?

                </div>

                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                {/* <div className="productdisplay-right-quantity">
                    <label htmlFor="quantity">Quantity:</label>
                    <select id="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div> */}
                <button onClick={()=>{addToCart(product.id)}}>Add to Cart  </button>
                
            </div>

        </div>

    )
}

export default ProductDisplay