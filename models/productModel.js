const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name : {
        type: String
       
    },
    category: {
        type: String,
      
        enum: {
            values: [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                 'Furniture Items',
                 'Bike',
                 'car',
                 'Vehicle',
                'Sports Items',
                 'Musical   '
               
            ],
          
        }
    },

    rentalRatePerMonth : {
        type: Number,
        required: true,
        default: 0.0
    },

    location : {
        type: String
    },

    specification: {
        type: String
      
    },

    images :[
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    description: {
        type: String
      
    }, 

    available :{
        type : String
    },

    availabileDate :{
        type: Date,
        default: Date.now()
    },
    user : {
        type :mongoose.Schema.Types.ObjectId
    }

})

let schema = mongoose.model('Product', productSchema)

module.exports = schema;