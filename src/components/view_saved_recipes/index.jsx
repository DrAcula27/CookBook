import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/app_context";
import RecipeCard from "../../components/recipe_card";
import axios from "axios";
import "./index.css";

const ViewSavedRecipes = () => {
  const navigate = useNavigate();
  let { user, setUser, setMeal } = useContext(AppContext);

  console.log("user.savedRecipes: ", user.savedRecipes);

  const showRecipeDetails = async (id) => {
    console.log("recipe id from ViewSavedRecipes: ", id);

    const config = { params: { i: id } };
    console.log("config from ViewSavedRecipes: ", config);

    const serverResponse = await axios.get(`/get_recipe_details`, config);
    console.log(
      "serverResponse from ViewSavedRecipes: ",
      serverResponse.data.meals[0]
    );

    setMeal(serverResponse.data.meals[0]);
    navigate("/recipe/show");
  };

  const removeSavedRecipe = async (id) => {
    // remove recipe from users savedRecipes array in mongodb
    console.log("recipe _id from ViewSavedRecipes: ", id);

    let serverResponse = await axios({
      method: "DELETE",
      url: `/remove_saved_recipe`,
      data: { id },
    });
    console.log("serverResponse from ViewSavedRecipes: ", serverResponse);

    // map through current savedRecipes array and remove the recipe whose id matches the one passed
    let newSavedRecipes = user.savedRecipes.filter(
      (savedRecipe) => savedRecipe._id !== id
    );

    // set some kind of state to update user's savedRecipes array
    setUser({
      ...user,
      savedRecipes: newSavedRecipes,
    });
  };

  const savedRecipesJSX = user.savedRecipes.map((savedRecipe, i) => {
    return (
      <div key={i}>
        <div
          onClick={() => showRecipeDetails(savedRecipe.idMeal)}
          className="saved-recipe"
        >
          <RecipeCard
            recipeTitle={savedRecipe.strMeal || "Recipe Title"}
            recipeImage={
              savedRecipe.strMealThumb ||
              "https://dummyimage.com/200x200/f6ece2/111311.png&text=recipe+image"
            }
          />
        </div>
        <button
          onClick={() => removeSavedRecipe(savedRecipe._id)}
          className="remove-recipe-btn"
        >
          Remove from saved recipes
        </button>
      </div>
    );
  });

  return (
    <div className="user-recipes">
      {user.savedRecipes.length < 1 ? (
        <aside>
          <h4>You haven't saved any recipes yet.</h4>
          <p>
            Click the <code>SEARCH RECIPES</code> button above to find delicious
            recipes to save!
          </p>
          {/* FUTURE WORK
          <p>
            Or, you can click the <code>ADD A RECIPE</code> button above to
            create your very own recipe!
          </p> */}
          <em>
            You can return to your profile any time to view recipes you save.
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
