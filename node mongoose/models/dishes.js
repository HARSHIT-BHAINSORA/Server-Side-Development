const { model } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    reqiured: true,
  },
  timestamps: true,
});

var Dishes = mongoose.model("Dish", dishSchema);

model.exports = Dishes;
