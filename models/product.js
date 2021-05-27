const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Catagory",
    },
    subs: [
      {
        type: ObjectId,
        ref: "SubCat",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "Blue", "Silver", "Brown", "White"],
    },
    brand: {
      type: String,
      enum: [
        "Apple",
        "Microsoft",
        "Samsung",
        "Lenovo",
        "ASUS",
        "HP",
        "Toshiba",
      ],
    },
    // ratings: [
    //   {
    //     type: Number,
    //     postedBy: {
    //       type: ObjectId,
    //       ref: "User",
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
