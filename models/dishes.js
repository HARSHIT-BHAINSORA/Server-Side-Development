const { model } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// new type is load in the mongoose
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },

    image: {
      type: String,
    },
    category: {
      type: String,
    },
    label: {
      type: String,
      default: "",
    },
    price: {
      type: Currency,

      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

// Models provides the interface bet the database and the Schema. -> Connection

var Dishes = mongoose.model("Dish", dishSchema);

module.exports = Dishes;
