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
    strMealThumb: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
