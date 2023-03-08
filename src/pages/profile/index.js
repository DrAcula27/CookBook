import React from "react";

// FUTURE WORK
// import ProfileButtons from "../../components/profile_buttons";

import ViewSavedRecipes from "../../components/view_saved_recipes";

const Profile = () => {
  return (
    <div className="profile grid-area-main">
      {/* FUTURE WORK
      <ProfileButtons /> */}
      <ViewSavedRecipes />
    </div>
  );
};

export default Profile;
