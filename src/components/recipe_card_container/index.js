import React from "react";
import "./index.css";

const RecipeCardContainer = ({ children, searchQueries }) => {
  console.log(children);
  console.log(searchQueries);

  // useContext for user search and filter queries to change the display message

  return (
    <div className="recipe-display">
      {searchQueries[0] === "random" ? (
        <h4>Need a little inspiration? Here is a random recipe:</h4>
      ) : (
        <h4>Showing results for: </h4>
      )}
      <section>{children}</section>
    </div>
  );
};

export default RecipeCardContainer;
