import Product from '../models/productModels.js';
import cloudinary from 'cloudinary'
import { fileSizeFormatter } from '../config/imageUpload.js';
import asyncHandler from 'express-async-handler';

//@desc Create new product
//@route POST /api/products
//@access Private
const createProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;

  try {
    // Validation
    if (!name || !category || !quantity || !price || !description) {
      console.log("Validation error: Please fill in all fields");
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    // Image upload Handler
    let fileData = {};
    if (req.file) {
      // Save image to cloudinary
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Prosperio",
          resource_type: "image",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500);
        throw new Error("Image could not be uploaded");
      }

      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }

    // Create new Product
    const product = await Product.create({
      user: req.user.id,
      name,
      category,
      quantity,
      price,
      description,
      image: fileData,
    });

    console.log("Product created successfully:", product);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    if (error.name === "ValidationError") {
      // Handle validation error
      res.status(400).json({ message: error.message });
    } else {
      // Handle other errors
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});


//@desc Get all products
//@route GET /api/products
//@access Private
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user.id }).sort('-createdAt');
    res.status(200).json(products)

})

//@desc Search single product
//@route GET /api/products/ :id
//@access Private
const getProductByID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    //checking if product exist
    if (!product) {
        res.status(404);
        throw new Error("Not Found");
    }
    //Matching the products to its user
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized to perfom this action");
    }
        res.status(200).json(product);
})

//@desc Update a product by ID
//@route PUT /api/products/:id
//@access Private 
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  // Check if the user is authorized to update this product
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to perform this action");
  }

  // Image Upload Handler
  let fileData = {};
  if (req.file) {
    // Save image to Cloudinary
    try {
      const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Prosperio",
        resource_type: "image",
      });
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500);
      throw new Error("Image could not be uploaded");
    }
  }

  const newValue = price * quantity

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      value: newValue,
      description,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedProduct) {
    console.log("Product updated successfully:", updatedProduct);
  } else {
    console.log("Product update failed.");
  }

  res.status(200).json(updatedProduct);
});

//@desc Delete product
//@route DELETE /api/products/:id
//@access Private
const deleteProduct = asyncHandler(async (req, res) => {
    
    const product = await Product.findById(req.params.id);
    //checking if product exist
    if (!product) {
        res.status(404);
        throw new Error("Not Found");
    }
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized to perfom this action");
    }
    await product.deleteOne()
    res.status(200).json({message:"Product deleted Successfully"})
})

export {
    createProduct,
    getProductByID,
    getProducts,
    updateProduct,
    deleteProduct,
}