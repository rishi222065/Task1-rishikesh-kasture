import React, { useState } from 'react';
import '../AddProduct/AddProduct.css';
import upload_area from "../../assets/image-uploade.jpg";

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "",
        new_price: "",
        old_price: "",
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData = {}; // Initialize responseData
        let product = productDetails;
        let formData = new FormData();
        formData.append("product", image);

        // API call for adding the data to the database 
        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: "application/json",
            },
            body: formData,
        })
            .then((res) => res.json()) // Parse JSON response
            .then((data) => {
                responseData = data; // Assign response data to responseData
            });

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            // Second API call to add product data
            return fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(product)
            })
                .then((resp) => resp.json()) // Parse JSON response from second fetch
                .then((data) => {
                    if (data.success) {
                        alert("Product Added");
                    } else {
                        alert("Failed To add Product");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Failed To add Product");
                });
        } else {
            throw new Error("Failed to upload image");
        }
    };

    return (
        <div className='AddProduct'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type hear' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Old Price ' />
                </div>
                <div className="addproduct-itemfield">
                    <p> offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='New Price ' />
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} name="category" onChange={changeHandler} className='add-product-selector'>
                    <option value="men">MEN</option>
                    <option value="women">Women</option>
                    <option value="kid">kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                    <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='addProduct-thumbnail-img ' style={{ width: "150px" }} />
                    <p style={{ paddingTop: "0px" }}>Upload Image</p>
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <button onClick={() => Add_Product()} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default AddProduct;
