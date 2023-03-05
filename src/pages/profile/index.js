import React from "react";
import ProfileButtons from "../../components/profile_buttons";
import ViewSavedRecipes from "../../components/view_saved_recipes";

const Profile = () => {
  return (
    <div className="profile grid-area-main">
      <ProfileButtons />
      <ViewSavedRecipes />
    </div>
  );
};

export default Profile;
