const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require('path');
const cors = require("cors");
const { Console } = require("console");

app.use(express.json());
app.use(cors());

// Database connection with mongodb 

mongoose.connect("mongodb+srv://Rishi:Rishi222065@cluster0.m86ir5a.mongodb.net/E-commerce")
app.get("/", (req, res) => {
  res.send("express app is running")
})
// image storage Engine 

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage: storage })


//End point for uploading the images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  })
})

//creating schema 
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  available: {
    type: Boolean,
    default: true,
  }
})
//end point to add product 
app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length === 0) {
    id = 1;
  } else {
    let last_product = products[products.length - 1];
    if (last_product) {
      id = last_product.id + 1;
    } else {
      id = 1; // Fallback in case the last product is undefined
    }
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    available: req.body.available,

  });
  console.log(product);
  await product.save();
  console.log('Product added successfully');
  res.json({
    success: true,
    name: req.body.name,
  })
})


//creating api to deleat product 
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("reomoved")
  res.json({
    success: true,
    name: req.body.name
  })
})


//creating api for getting all products 
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("all products are fetched ")
  res.send(products);
}
)

//  Shema creating for User model 
const Users = mongoose.model("Users", {
  name:
  {
    type: String,
  },
  email:
  {
    type: String,
    unique: true,
  },
  password:
  {
    type: String,
  },
  cartData:
  {
    type: Object,
  },
  date:
  {
    type: Date,
    default: Date.now,
  }
});

// creating end point for registerign the user 
app.post('/signup', async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, errors: "existing user found" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  })
  await user.save()

  const data = {
    user: {
      id: user.id,
    }
  }
  const token = jwt.sign(data, 'secret_ecom');//single incrypted layer 
  res.json({ success: true, token })

})

//creating endpoint for user iogin 
app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    }
    else {
      res.json({ sucess: false, errors: 'Invalid Password' })
    }
  }
  else {
    res.json({ success: false, errors: "Wrong emailid" })
  }


  // try {
  //   let user = await Users.findOne({ email: req.body.email });
  //   if (user) {
  //     const passCompare = req.body.password === user.password;
  //     if (passCompare) {
  //       const data = {
  //         "user": {
  //           "id": user.id
  //         }
  //       };
  //       const token = jwt.sign(data, 'secret_ecom');
  //       res.json({ "success": true, "token": token });
  //     } else {
  //       res.json({ "success": false, "errors": "Invalid Password" });
  //     }
  //   } else {
  //     res.json({ "success": false, "errors": "User not found!" });
  //   }
  // } catch (error) {
  //   console.error("Error in login endpoint:", error);
  //   res.status(500).json({ "success": false, "errors": "Internal Server Error" });
  // }
});

//creatign endpoints for cart data '
//creating middleware to fetch user 

const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ errors: "please auth usein valid tocken" })
  }
  else {
    try {
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "pleas  provide a valid token and try again" })
    }
  }
}
app.post('/addtocart', fetchUser, async (req, res) => {
  console.log("added",req.body.itemId)

let userData = await Users.findOne({ _id: req.user.id });
userData.cartData[req.body.itemId] +=1;
await Users.findOneAndUpdate({_id: req.user.id},{cartData:userData.cartData});
res.json({ success: true, message: "Item added to cart" });

})


// creating end point to remove the item from care databas 

app.post("/removefromcart",fetchUser ,async (req, res)=>{
  console.log("removed",req.body.itemId)
  let userData = await Users.findOne({ _id: req.user.id });
  if(userData.cartData[req.body.itemId]>0)
  userData.cartData[req.body.itemId] -=1;
  await Users.findOneAndUpdate({_id: req.user.id},{cartData:userData.cartData});
  res.json({ success: true, message: "Item removed from cart" });
  

})


// creating end point for retriving the data from the cart of a user 

app.post('/getcart',fetchUser,async(req,res)=>{
console.log("GetCart");
let userData=await Users.findOne({_id:req.user.id});
res.json(userData.cartData);

})



//API Creation 
app.listen(port, (error) => {
  if (!error) {
    console.log("server is running in Port" + port)
  }
  else {
    console.log("Erroe" + error);
  }
})
