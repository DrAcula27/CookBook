const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// const recipeSchema = require("./recipeSchema");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address.",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    // savedRecipes: [recipeSchema],

    // OR

    // savedRecipes: {
    //   type: [recipeSchema],
    //   index: {
    //     partialFilterExpression: { savedRecipes: { $type: [recipeSchema] } },
    //   },
    //   default: null,
    // },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const salts = 10;
    this.password = await bcrypt.hash(this.password, salts);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
