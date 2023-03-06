import React, { useContext } from "react";
import { AppContext } from "../../contexts/app_context";
import "./index.css";

const ShowSingleRecipe = () => {
  //   const [recipeData] = useContext(AppContext);

  return (
    <div className="grid-area-main recipe-container">
      <h1>Recipe Title</h1>
      <div className="area-category">
        <h5>Area: </h5>
        <h5>Category: </h5>
      </div>
      <img
        src="https://dummyimage.com/200x200/f6ece2/111311.png&text=recipe+image"
        alt="Recipe Thumbnail"
      />
      <iframe
        style={{ display: "block" }}
        width="300"
        height="200"
        src="https://www.youtube.com/embed/HkywCtna9t0"
        title="Recipe Title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <h5>Ingredients</h5>
      <div className="ingredients-list">
        <ol>
          <li>ingredient</li>
          <li>list</li>
          <li>here</li>
        </ol>
      </div>
      <div className="ingredient-buttons">
        <button>Select All</button>
        <button>Delselect All</button>
        <button>Add to Cart</button>
      </div>
      <h5>Instructions</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  );
};

export default ShowSingleRecipe;
