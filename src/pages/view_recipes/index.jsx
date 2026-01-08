import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import RecipeCardContainer from "../../components/recipe_card_container";
import RecipeCard from "../../components/recipe_card";
import FilterRecipes from "../../components/filter_recipes";
import { AppContext } from "../../contexts/app_context";
import SearchRecipes from "../../components/search_recipes";

const ViewRecipes = () => {
  const { mealsArray, setMealsArray, searchQueries, setSearchQueries } =
    useContext(AppContext);

  const showRandomRecipe = async () => {
    const serverResponse = await axios.get(`/get_random_recipe`);

    const recipe = serverResponse.data.meals;

    setSearchQueries(["random"]);
    setMealsArray(recipe);
  };

  let isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
      showRandomRecipe();
    }
    // eslint-disable-next-line
  }, []);

  let mealsArrayJSX = null;
  if (mealsArray) {
    mealsArrayJSX = mealsArray.map((recipe) => {
      return (
        <RecipeCard
          key={recipe.idMeal}
          recipeTitle={recipe.strMeal}
          recipeImage={recipe.strMealThumb}
        />
      );
    });
  }

  return (
    <div className="grid-area-main">
      <SearchRecipes />
      <p style={{ margin: "0", fontWeight: "bold" }}>OR</p>
      <FilterRecipes />
      <h5 style={{ marginTop: "2rem", marginBottom: "0" }}>
        Don't know what to cook?
      </h5>
      <button onClick={showRandomRecipe}>Show me a random recipe!</button>
      <RecipeCardContainer searchQueries={[searchQueries]}>
        {mealsArrayJSX}
      </RecipeCardContainer>
    </div>
  );
};

export default ViewRecipes;
