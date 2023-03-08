import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { AppContext } from "../../contexts/app_context";
import RecipeCard from "../recipe_card";
import axios from "axios";

const RecipeCardContainer = ({ searchQueries }) => {
  const navigate = useNavigate();
  const { mealsArray, setMeal } = useContext(AppContext);

  console.log("mealsArray from RecipeCardContainer ", mealsArray);
  console.log("searchQueries from RecipeCardContainer ", searchQueries[0]);

  const searchQueriesJSX = searchQueries[0].map((query, i, { length }) => {
    if (!query) {
      return "";
    } else if (i + 1 === length) {
      return `${query}`;
    } else {
      return `${query}, `;
    }
  });
  console.log("searchQueriesJSX: ", searchQueriesJSX);

  const handleClick = async (id) => {
    console.log("show-single-recipe mealId: ", id);

    const config = { params: { i: id } };
    console.log("show-single-recipe config: ", config);

    const serverResponse = await axios.get(`/get_recipe_details/`, config);
    console.log(
      "show-single-recipe serverResponse: ",
      serverResponse.data.meals[0]
    );

    setMeal(serverResponse.data.meals[0]);
    navigate("/recipe/show");
  };

  let mealsArrayJSX = null;
  if (mealsArray !== null) {
    mealsArrayJSX = mealsArray.map((recipe) => {
      return (
        <div key={recipe.idMeal} onClick={() => handleClick(recipe.idMeal)}>
          <RecipeCard
            recipeTitle={recipe.strMeal}
            recipeImage={recipe.strMealThumb}
          />
        </div>
      );
    });
  }

  if (mealsArrayJSX === null) {
    mealsArrayJSX = (
      <p>It looks like there are no meals that meet your search criteria.</p>
    );
  }

  console.log("mealsArrayJSX: ", mealsArrayJSX);

  return (
    <div className="recipe-display">
      {searchQueries[0].includes("random") ? (
        <h4>Need a little inspiration? Here is a random recipe:</h4>
      ) : (
        <h4>Showing results for: {searchQueriesJSX}</h4>
      )}
      <section>{mealsArrayJSX}</section>
    </div>
  );
};

export default RecipeCardContainer;
