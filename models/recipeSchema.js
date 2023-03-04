const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    ingredients: {
      type: [String],
    },
    instructions: {
      type: String,
    },
    cuisine: {
      type: String,
    },
    tags: {
      type: [String],
    },
    youtubeLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = recipeSchema;
