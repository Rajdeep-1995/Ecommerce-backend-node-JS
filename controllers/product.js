const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  //console.log(req.body);
  try {
    req.body.slug = slugify(req.body.title); //saving slugified title in incoming slug of req.body
    const newProduct = await new Product(req.body).save(); //saving the entire data in to the database
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      err: error.message,
    });
  }
};

exports.listAll = async (req, res) => {
  try {
    let products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate("subs")
      .populate("category")
      .sort([["createdAt", "desc"]])
      .exec();
    res.json(products);
  } catch (error) {
    res.json(error);
    console.log("err------>", error);
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deletedProduct);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Product delete failed");
  }
};

exports.read = async (req, res) => {
  try {
    let product = await Product.findOne({ slug: req.params.slug })
      .limit(parseInt(req.params.count))
      .populate("subs")
      .populate("category")
      .exec();
    res.json(product);
  } catch (error) {
    res.json(error);
    console.log("err------>", error);
  }
};

exports.update = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title); //saving slugified title in incoming slug of req.body
    const updateProduct = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    // console.log(updateProduct);
    res.json(updateProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      err: error.message,
    });
  }
};

// Without pagination
// exports.listDynemically = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]]) // sorted by created or updated and orderd by ascending or descending
//       .limit(limit)
//       .exec();
//     res.json(products);
//   } catch (error) {
//     console.log(error);
//   }
// };

// With pagination
exports.listDynemically = async (req, res) => {
  try {
    const { sort, order, page, limit } = req.body;
    const currentpage = page || 1;
    const perPageLimit = limit || 3;

    const products = await Product.find({})
      .skip((currentpage - 1) * perPageLimit) // to skip the per page items as reqested from client
      .populate("category")
      .populate("subs")
      .sort([[sort, order]]) // sorted by created or updated and orderd by ascending or descending
      .limit(perPageLimit)
      .exec();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

exports.productsCount = async (req, res) => {
  let totalCount = await Product.find({}).estimatedDocumentCount().exec();
  res.json(totalCount);
};
