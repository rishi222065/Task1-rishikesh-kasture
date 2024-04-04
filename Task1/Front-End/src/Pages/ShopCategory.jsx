import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Contex/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Items/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  // Filter products based on the category passed as a prop
  const filteredProducts = all_product.filter(item => item.category === props.category);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className='shopCategory-indexSort'>
        <p>
          <span>Showing 1-{filteredProducts.length}</span>out of {filteredProducts.length} products
        </p>
        <div className='shopcategory-sort'>
          sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className='shopcategory-products'>
        {filteredProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      <div className='shopcategory-loadmore'>Load More</div>
    </div>
  );
};

export default ShopCategory;