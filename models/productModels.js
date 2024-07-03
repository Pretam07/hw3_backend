const mongoose= require('mongoose')
//creating the model
const productSchema = mongoose.Schema(
 {
    name: {
        type: String,
        required:[true, "Please enter a product name"]
    },
    genre:{
        type:String,
        required: true,

    },
    description:{
        type:String,
        required: true,

    },
    price: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
        required: false
    }


 },
 {
    timestamps: true
 }
)

const Product = mongoose.model('Product', productSchema);

module.exports= Product;