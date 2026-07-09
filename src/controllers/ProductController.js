const Product = require('../models/ProductModel');
const StatusCode = require('../utils/StatusCode');

class ProductController {
  
  // 3.1 Create Product
  async createProduct(req, res) {
    try {
      
      if (req.body.variants) {
        req.body.variants = req.body.variants.map(v => ({
          ...v,
          price: v.price !== undefined ? v.price : req.body.price
        }));
      }

      const newProduct = await Product.create(req.body);
      res.status(StatusCode.CREATED).json({ success: true, data: newProduct });
    } catch (error) {
      res.status(StatusCode.BAD_REQUEST).json({ success: false, error: error.message });
    }
  }

 
  async getAllProducts(req, res) {
    try {
      
      const query = { isDeleted: false, ...req.query };
      
      const products = await Product.find(query);
      res.status(StatusCode.OK).json({ success: true, count: products.length, data: products });
    } catch (error) {
      res.status(StatusCode.SERVER_ERROR).json({ success: false, error: error.message });
    }
  }

  // 3.3 Get Product by ID (Ensures it is not soft-deleted)
  async getProductById(req, res) {
    try {
      const product = await Product.findOne({ _id: req.params.id, isDeleted: false });
      
      if (!product) {
        return res.status(StatusCode.NOT_FOUND).json({ success: false, message: 'Product not found' });
      }
      res.status(StatusCode.OK).json({ success: true, data: product });
    } catch (error) {
      res.status(StatusCode.SERVER_ERROR).json({ success: false, error: error.message });
    }
  }

  // 3.4 Update Product
  async updateProduct(req, res) {
    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(StatusCode.NOT_FOUND).json({ success: false, message: 'Product not found or has been deleted' });
      }
      res.status(StatusCode.OK).json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(StatusCode.BAD_REQUEST).json({ success: false, error: error.message });
    }
  }

  // 3.5 Soft Delete Product (Sets isDeleted = true)
  async softDeleteProduct(req, res) {
    try {
      const deletedProduct = await Product.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        { isDeleted: true },
        { new: true }
      );

      if (!deletedProduct) {
        return res.status(StatusCode.NOT_FOUND).json({ success: false, message: 'Product not found or already deleted' });
      }
      res.status(StatusCode.OK).json({ success: true, message: 'Product deleted successfully (Soft Delete)' });
    } catch (error) {
      res.status(StatusCode.SERVER_ERROR).json({ success: false, error: error.message });
    }
  }

  // 3.6 Hard Delete Product (Permanent removal)
  async hardDeleteProduct(req, res) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);

      if (!deletedProduct) {
        return res.status(StatusCode.NOT_FOUND).json({ success: false, message: 'Product not found' });
      }

      res.status(StatusCode.OK).json({ success: true, message: 'Product deleted permanently' });
    } catch (error) {
      res.status(StatusCode.SERVER_ERROR).json({ success: false, error: error.message });
    }
  }
}


module.exports = new ProductController();