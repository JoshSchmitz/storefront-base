import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

/* 
    @desc: Get product(s)
    @route: GET /api/product
    @access: public
*/
const getProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (productId) {
    const product = Product.findById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } else {
    const products = Product.find();
  }
});

/* 
    @desc: Create product
    @route: POST /api/product
    @access: public
*/
const createProduct = asyncHandler(async (req, res) => {});

/* 
    @desc: Update product
    @route: PUT /api/product
    @access: public
*/
const updateProduct = asyncHandler(async (req, res) => {});

/* 
    @desc: Delete product
    @route: DELETE /api/product
    @access: public
*/
const deleteProduct = asyncHandler(async (req, res) => {});

export { getProduct, createProduct, updateProduct, deleteProduct };
