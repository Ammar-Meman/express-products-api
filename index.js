const express = require("express");
const app = express();
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    stock: 25,
    rating: 4.3
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 40,
    rating: 4.5
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 999,
    stock: 30,
    rating: 4.2
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 12,
    rating: 4.4
  },
  {
    id: 5,
    name: "Backpack",
    category: "Fashion",
    price: 1599,
    stock: 50,
    rating: 4.1
  }
];

app.get("/products",(req,res)=>{
  res.status(200).json(products);
})


app.get("/products/:id",(req,res)=>{
  const id = parseInt(req.params.id);
  const product = products.find(p=>p.id === id);

  if(!product){
    return res.status(404).json({message:"Product not found"});
  }

  res.json(product);
})


app.get("/products/category/:categoryName",(req,res)=>{
  const categoryName = req.params.categoryName.toLowerCase();

  const filterProducts = products.filter(p=>p.category.toLowerCase() === categoryName);

  if(filterProducts.length === 0){
    return res.status(404).json({message:"Product not found"});
  }

  return res.json(filterProducts)
})


//Post
app.post("/products",(req,res)=>{
  console.log("body: ",req.body);
  const newProduct = {
    id: products.length + 1,
    ...req.body
  }

  products.push(newProduct);

  res.status(201).json({
    message: "Product Created",
    product: newProduct
  });
})


//PUT
app.put("/products/:id",(req,res)=>{

  console.log("body :",req.body);
  console.log("params:",req.params);

  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if(index === -1){
    return res.status(404).json({message:"Product not found"});
  }

  const updateProduct = {
    id: id,
    ...req.body
  }

  products[index] = updateProduct;

  res.status(200).json({
    message:"Product replaced successfully",
    product: updateProduct
  });
})


app.put("/products/:id/stock",(req,res)=>{
  const id = parseInt(req.params.id);
  const stock = req.body.stock;

  const index = products.findIndex(p=>p.id === id);

  if(index === -1){
    return res.status(404).json({message:"Product not found"});
  }

  products[index].stock = stock;

  res.json(products[index]);

  console.log(req.body);
})


app.put('/products/:id/price',(req,res)=>{
  const id = parseInt(req.params.id);
  const price = req.body.price;

  const index = products.findIndex(p=>p.id === id);

  if(index === -1){
    return res.status(404).json({message:"Product not found"});
  }

  products[index].price = price;

  res.json(products[index]);

  console.log(req.body);
})

app.listen(3000,()=>{
  console.log("Server started on port 3000");
})