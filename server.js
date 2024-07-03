const express= require('express')
const mongoose= require('mongoose')
const Product = require('./models/productModels')
const app= express()
const cors = require('cors');
//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors())

//routes

app.get('/',(req,res)=>{
    res.send ('Hello NODE API')
})


app.get('/blog',(req,res)=>{
    res.send ('Hello blog')
})

//using model to save data in the mongoDB
app.post('/products', async(req,res)=>{
   try {
    const product = await Product.create(req.body)
    res.status(200).json(product);
   } catch(error){
    console.log(error.message);
    res.status(500).json({message:error.message})
   }
})

//getting all the  data from the database
app.get('/products', async(req, res)=>{
    try{
        const products = await Product.find({});  //empty brackets means get all products
        res.status(200).json(products);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//getting one product 
app.get('/products/:id', async(req, res)=>{
    try{
        const {id}= req.params;
        const product = await Product.findById(id);  //empty brackets means get all products
        res.status(200).json(product);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//update or editting data in databse
app.put('/products/:id', async(req,res)=>{
    try {
        const{id}=req.params;
        const product = await Product.findByIdAndUpdate(id, req.body );
        //can not find any product in database
        if(!product){
            return res.status(404).json({message:`cannot find any product with id ${id}` })
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//delete the product
app.delete('/products/:id', async(req, res)=>{
    try{
        const {id}= req.params;
        const product = await Product.findByIdAndDelete(id); 
        if(!product){
            return res.status(404).json({message:`cannot find any product with id ${id}` })
        }
        res.status(200).json(product);

    } catch(error){
        res.status(500).json({message: error.message})
    }
})


mongoose.connect('mongodb+srv://Pretam:Pretam2003$@pretamapi.ldbxr1j.mongodb.net/Node-API?retryWrites=true&w=majority&appName=PretamAPI')
.then(()=>{
    console.log('connected to MongoDB')
    app.listen(3000, ()=>{
        console.log('Node API running')
    });
}).catch((error)=>{
    console.log(error)
})
