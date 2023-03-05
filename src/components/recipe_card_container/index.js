import React from "react";
import "./index.css";

const RecipeCardContainer = ({ children }) => {
  return (
    <div className="recipe-display">
      <h4>Showing results for: </h4>
      <section>{children}</section>
    </div>
  );
};

export default RecipeCardContainer;
