const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  
  brand: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  price: { type: Number, required: true, min: 0 },
  discountPrice: { type: Number, min: 0 },
  currency: { type: String, default: 'USD' },

  variants: [
    {
      _id: false,
      size: { type: String, required: true },
      color: { type: String, required: true },
      stock: { type: Number, default: 0, min: 0 },
      price: { type: Number, required: true, min: 0 }
    }
  ],

  tags: [{ type: String }],

  status: { 
    type: String, 
    enum: ['draft', 'active', 'archived'], 
    default: 'draft' 
  },
  isDeleted: { type: Boolean, default: false },

  ratings: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0, min: 0 }
  }
}, 
{
  timestamps: true 
}

);



const Product = mongoose.model('Product', productSchema);
module.exports = Product;