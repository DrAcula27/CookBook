import axios from "axios";
import React, { useState } from "react";
import RecipeCardContainer from "../../components/recipe_card_container";
import RecipeCard from "../../components/recipe_card";
import SearchAndFilter from "../../components/search_and_filter";

const ViewRecipes = () => {
  // const [recipeArray, setRecipeArray] = useState([]);

  // const makeServerCall = async () => {
  //   const serverResponse = await axios.get(`/get_recipes/`);
  //   console.log(serverResponse);

  //   // const results = serverResponse.data.results;

  //   // setRecipeArray(results);
  // };
  // makeServerCall();

  return (
    <div className="grid-area-main">
      <SearchAndFilter />
      <RecipeCardContainer>
        {/* {recipeArray.map((recipe, i) => {
          return (
            <RecipeCard
              key={i}
              recipeTitle={recipe.strMeal}
              recipeImage={recipe.strMealThumb}
            />
          );
        })} */}
      </RecipeCardContainer>
    </div>
  );
};

export default ViewRecipes;
