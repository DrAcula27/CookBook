import axios from "axios";
import React, { useContext, useState } from "react";
import RecipeCardContainer from "../../components/recipe_card_container";
import RecipeCard from "../../components/recipe_card";
import SearchAndFilter from "../../components/search_and_filter";
import { useEffect } from "react";
import { useRef } from "react";
import { AppContext } from "../../contexts/app_context";

const ViewRecipes = () => {
  const [recipeArray, setRecipeArray] = useState([]);
  const [searchQueries, setSearchQueries] = useState([]);
  // const [recipeData, setRecipeData] = useContext(AppContext);

  let isFirstRender = useRef(true);

  const makeServerCall = async () => {
    const serverResponse = await axios.get(`/get_recipes`);

    const recipes = serverResponse.data.meals;

    setSearchQueries(["random"]);
    setRecipeArray(recipes);
  };

  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
      makeServerCall();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-area-main">
      <SearchAndFilter />
      <RecipeCardContainer searchQueries={searchQueries}>
        {recipeArray.map((recipe, i) => {
          return (
            <RecipeCard
              key={i}
              recipeTitle={recipe.strMeal}
              recipeImage={recipe.strMealThumb}
            />
          );
        })}
      </RecipeCardContainer>
    </div>
  );
};

export default ViewRecipes;
