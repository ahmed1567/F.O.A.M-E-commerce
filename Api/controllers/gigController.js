const { errorHandler } = require("../Helpers/errorHandler");
const { Gig } = require("../models/gig.model");

const creatGig = async (req, res ,next) => {
  if (!req.isSeller)
  return next(errorHandler(403, "Only sellers can create a gig!"));
console.log(req.userId)
console.log(req.body)
  const newGig = new Gig({
    ...req.body,
    userId: req.userId,
    
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};


const deleteGig = async (req, res ,next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return next(errorHandler(403, "You can delete only your gigs!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("gig has been deleted!");
  } catch (err) {
    next(err);
  }
};
const getGig = async (req, res ,next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    console.log(gig)
    if (!gig) next(errorHandler(404, "gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

const getGigs = async (req, res ,next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),//using spread operation (...)
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
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};


  module.exports = {
    creatGig,
    deleteGig,
    getGig,
    getGigs
  };