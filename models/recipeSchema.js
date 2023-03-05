const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    idMeal: {
      type: String,
      required: true,
      unique: true,
    },
    strMeal: {
      type: String,
      required: true,
    },
    strCategory: {
      type: String,
    },
    strArea: {
      type: String,
    },
    strIngredients: {
      type: [String],
    },
    strInstructions: {
      type: String,
    },
    strMealThumb: {
      type: String,
    },
    cuisine: {
      type: String,
    },
    strTags: {
      type: [String],
    },
    strYoutube: {
      type: String,
    },
    strMeasures: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = recipeSchema;
