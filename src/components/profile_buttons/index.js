import React from "react";
import "./index.css";

const handleAddRecipe = () => {
  // TODO
  // when clicked, loads CRUD recipe component on user profile page
};

const handleViewCart = () => {
  // TODO
  // when clicked, pops up a modal with the users cart
  // they will be able to remove items, adjust qty of items, and email the list of items
};

const ProfileButtons = () => {
  return (
    <div className="profile-buttons">
      <button onClick={handleAddRecipe}>Add a Recipe</button>
      <button onClick={handleViewCart}>View Cart</button>
    </div>
  );
};

export default ProfileButtons;
