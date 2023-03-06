import React, { useContext } from "react";
import { AppContext } from "../../contexts/app_context";
import RecipeCard from "../../components/recipe_card";
import "./index.css";

const ViewSavedRecipes = () => {
  let { user } = useContext(AppContext);

  // remove the following line after testing
  user.savedRecipes = false;

  return (
    <div className="user-recipes">
      {!user.savedRecipes ? (
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
          <section>
            {/* change this to map through user's savedRecipes array */}
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </section>
        </>
      )}
    </div>
  );
};

export default ViewSavedRecipes;
