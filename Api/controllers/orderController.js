const { Product } = require("../models/product.model");
const { Order } = require("../models/order.model");


const { errorHandler } = require("../Helpers/errorHandler");


const intent = async (req, res,next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const product = await Product.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    productId: product._id,
    img: product.cover,
    title: product.title,
    buyerId: req.userId,
    sellerId: product.userId,
    price: product.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
  };

  const getOrders = async (req, res, next) => {
    try {
      const orders = await Order.find({
        ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
        isCompleted: true,
      });
  
      res.status(200).send(orders);
    } catch (err) {
      next(err);
    }
  };

  const confirm = async (req, res, next) => {
    try {
      const orders = await Order.findOneAndUpdate(
        {
          payment_intent: req.body.payment_intent,
        },
        {
          $set: {
            isCompleted: true,
          },
        }
      );
  
      res.status(200).send("Order has been confirmed.");
    } catch (err) {
      next(err);
    }
  };

  module.exports = {
    intent,
    getOrders,
    confirm

  };