const { errorHandler } = require("../Helpers/errorHandler");
const { Product } = require("../models/product.model");

const creatProduct = async (req, res, next) => {
  if (!req.isSeller)
    return next(errorHandler(403, "Only sellers can create a product!"));
  console.log(req.userId);
  const newProduct = new Product({
    ...req.body,
    userId: req.userId,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.userId !== req.userId)
      return next(errorHandler(403, "You can delete only your products!"));

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("product has been deleted!");
  } catch (err) {
    next(err);
  }
};
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);
    if (!product) next(errorHandler(404, "product not found!"));
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }), //using spread operation (...)
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const products = await Product.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(products);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  creatProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
