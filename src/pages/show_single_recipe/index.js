import React, { useContext } from "react";
import { AppContext } from "../../contexts/app_context";
import YouTube from "react-youtube";
import axios from "axios";
import "./index.css";

const ShowSingleRecipe = () => {
  const { meal, user, setUser } = useContext(AppContext);
  console.log("meal from show single recipe page: ", meal);

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
    };
    return <YouTube videoId={videoId} opts={options} />;
  };

  const handleSaveRecipe = async (id, title, imgURL) => {
    const newRecipe = {
      idMeal: id,
      strMeal: title,
      strMealThumb: imgURL,
    };

    let serverResponse = await axios({
      method: "POST",
      url: "/save_recipe",
      data: newRecipe,
    });
    console.log("serverResponse for saving recipe: ", serverResponse);
    // map through current savedRecipes array and remove the recipe whose id matches the one passed
    let newSavedRecipes = [...user.savedRecipes];
    newSavedRecipes.push(newRecipe);

    // set some kind of state to update user's savedRecipes array
    setUser({
      ...user,
      savedRecipes: newSavedRecipes,
    });
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
      {/* FUTURE WORK
      <div className="ingredient-buttons">
        <button>Select All</button>
        <button>Delselect All</button>
        <button>Add to Cart</button>
      </div> */}
      <h5>Instructions</h5>
      <p>{strInstructions || "instructions"}</p>
      {user &&
      !user.savedRecipes.map((recipe) => recipe.idMeal).includes(idMeal) ? (
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
