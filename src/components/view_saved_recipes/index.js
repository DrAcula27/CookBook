import React, { useContext } from "react";
import { AppContext } from "../../contexts/app_context";
import RecipeCard from "../../components/recipe_card";
import "./index.css";

const ViewSavedRecipes = () => {
  let { user } = useContext(AppContext);

  console.log(user.savedRecipes);

  const showRecipeDetails = () => {
    // redirect to /recipe/show
  };

  const removeSavedRecipe = () => {
    // remove recipe from users savedRecipes array in mongodb
  };

  const savedRecipesJSX = user.savedRecipes.map((savedRecipe, i) => {
    return (
      <div key={i} onClick={showRecipeDetails} className="saved-recipe">
        <RecipeCard
          recipeTitle={savedRecipe.strMeal || "Recipe Title"}
          recipeImage={
            savedRecipe.strMealThumb ||
            "https://dummyimage.com/200x200/f6ece2/111311.png&text=recipe+image"
          }
        />
        <button onClick={removeSavedRecipe} className="remove-recipe-btn">
          Remove from saved recipes
        </button>
      </div>
    );
  });

  return (
    <div className="user-recipes">
      {user.savedRecipes.length < 1 ? (
        <aside>
          <h4>You haven't created or saved any recipes yet.</h4>
          <p>
            Click the <code>SEARCH RECIPES</code> button above to find delicious
            recipes to save!
          </p>
          <p>
            Or, you can click the <code>ADD A RECIPE</code> button above to
            create your very own recipe!
          </p>
          <em>
            You can return to your profile any time to view recipes you add or
            save.
          </em>
        </aside>
      ) : (
        <>
          <h4>Viewing your saved recipes</h4>
          <section>{savedRecipesJSX}</section>
        </>
      )}
    </div>
  );
};

export default ViewSavedRecipes;
