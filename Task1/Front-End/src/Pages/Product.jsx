import React,{useContext} from 'react'
import { ShopContext } from '../Contex/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrun'
import ProductDisplay from '../Components/Product-display/ProductDisplay';

const Product = () => {

  const{all_product} =useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e) => e.id === Number(productId));



  return (
    <div>
      <Breadcrum  product = {product} />

      <ProductDisplay product={product}/>
    
    
    </div>
    
  )
}
export default Product;