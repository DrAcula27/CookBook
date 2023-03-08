import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../contexts/app_context";
import YouTube from "react-youtube";
import axios from "axios";
import "./index.css";

const ShowSingleRecipe = () => {
  const { meal, user } = useContext(AppContext);
  console.log("meal from show single recipe page: ", meal);
  // const { recipeId } = useParams();

  // setMealId(recipeId);

  const {
    idMeal,
    strMeal,
    strArea,
    strCategory,
    strMealThumb,
    strYoutube,
    strInstructions,
  } = meal;

  const getIngredients = (ingFromMeal) => {
    const ingredients = [];
    for (let i = 1; i <= 40; i++) {
      // assuming there are no more than 40 ingredients
      if (ingFromMeal[`strIngredient${i}`]) {
        const ingredient = `${ingFromMeal[`strMeasure${i}`]} - ${
          ingFromMeal[`strIngredient${i}`]
        }`;
        ingredients.push(ingredient.trim());
      }
    }
    return ingredients;
  };
  const ingredientsArray = getIngredients(meal);

  const ingredientsJSX = ingredientsArray.map((ingredient, i) => {
    return <li key={i}>{ingredient}</li>;
  });

  const extractVideoId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  const videoPlayer = () => {
    const videoId = extractVideoId(strYoutube);
    const options = {
      width: "300",
      height: "200",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    return <YouTube videoId={videoId} options={options} />;
  };

  // const [mealState, setMealState] = useState({ id: "", title: "", img: "" });
  // setMealState({ id: recipeId, title: strMeal, img: strMealThumb });

  const handleSaveRecipe = async (id, title, imgURL) => {
    let serverResponse = await axios({
      method: "POST",
      url: "/save_recipe",
      data: {
        idMeal: id,
        strMeal: title,
        strMealThumb: imgURL,
      },
    });
    console.log("serverResponse for saving recipe: ", serverResponse);
  };

  return (
    <div className="grid-area-main recipe-container">
      <h1>{strMeal || "Recipe Name"}</h1>
      <div className="area-category">
        <h5>
          Area: <em>{strArea || "Area"}</em>
        </h5>
        <h5>
          Category: <em>{strCategory || "Category"}</em>
        </h5>
      </div>
      <img
        src={
          strMealThumb ||
          "https://dummyimage.com/200x200/f6ece2/111311.png&text=recipe+image"
        }
        alt="Recipe Thumbnail"
      />
      {videoPlayer()}
      <h5>Ingredients</h5>
      <div className="ingredients-list">
        {ingredientsJSX || "ingredients list"}
      </div>
      <div className="ingredient-buttons">
        <button>Select All</button>
        <button>Delselect All</button>
        <button>Add to Cart</button>
      </div>
      <h5>Instructions</h5>
      <p>{strInstructions || "instructions"}</p>
      {user ? (
        <button onClick={() => handleSaveRecipe(idMeal, strMeal, strMealThumb)}>
          Save Recipe
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ShowSingleRecipe;
