
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
// const { BASE_URL } = require('./config/config');

// Get Products-  /api/v1/products
exports.getProducts =  catchAsyncError(async ( req, res, next) => {
  const products =  await Product.find();

//    await new Promise(resolve =>setTimeout(resolve,3000))

    res.status(200).json ({
        success : true,
        count: products.length,
        products
    })
})

// create Product = /api/v1/products/new
exports.newProduct =  catchAsyncError(async(req, res, next) => {
        let images = []
     console.log(req.body)
    if(req.files.length > 0) {
        req.files.forEach( file => {
            let url = `http://localhost:3001/uploads/product/${file.originalname}`;
            images.push({ image: url })
        })
    }
 
    req.body.images = images;
    // req.body.user = req.user.id;
   const product = await Product.create( req.body);
   res.status(201).json({
    success:true ,
    product
   })
})

//Get Single Product - api/v1/product/:id
exports.getSingleProduct = async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product not found', 400));
    }

    res.status(201).json({
        success: true,
        product
    })
}

//Update Product - api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
     
     //uploading images
     let images = []

     //if images not cleared we keep existing images
     if(req.body.imagesCleared === 'false' ) {
         images = product.images;
     }

    //  let BASE_URL = process.env.BACKEND_URL;
     if(process.env.NODE_ENV === "production"){
         BASE_URL = `${req.protocol}://${req.get('host')}`
     }
     
 
     if(req.files.length > 0) {
         req.files.forEach( file => {
             let url = `http://localhost:3001/uploads/product/${file.originalname}`;
             images.push({ image: url })
         })
     }
 
 
     req.body.images = images;

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })

}

//Delete Product - api/v1/product/:id

exports.deleteProduct = async (req, res, next) =>{
    const product = req.params.id;

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    const deletedProduct = await Product.findByIdAndDelete(product);

    if (!deletedProduct) {
        return res.send({ message: 'Product does not exist' });
    }


    res.status(200).json({
        success: true,
        message: "Product Deleted!"
    })

    // for search Product

}


exports.searchProduct = async (req, res) => {
    let key = req.params.key;
    console.log(key.toString());

     let data = await Product.find(
       {
         "$or":[
             {
                 name:{$regex:req.params.key,$options:'i'}
             },
             { 
                 category:{$regex:req.params.key,$options:'i'}
             },
             {
                 location:{$regex:req.params.key,$options:'i'}
             },
             {
                available:{$regex:req.params.key,$options:'i'}
             },
             {
                specification:{$regex:req.params.key,$options:'i'}
             }
             
         ]
       }
     );
     res.status(200).json({
         
         message: "Product search done",
         data
       
     })
 }

 // get admin products  - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) =>{
    const products = await Product.find();
    res.status(200).send({
        success: true,
        products
    })
});