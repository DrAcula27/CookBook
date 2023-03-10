import "./App.css";
import { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import Profile from "./pages/profile";
import ViewRecipes from "./pages/view_recipes";
import Nav from "./components/nav";
import Footer from "./components/footer";
import SignUpForm from "./components/signup_form";
import LogInForm from "./components/login_form";
import { getUserFromSession } from "./utilities/user-functions";
import { AppContext } from "./contexts/app_context";
import Loader from "react-js-loader";
import ShowSingleRecipe from "./pages/show_single_recipe";

function App() {
  const [callMade, setCallMade] = useState(false);
  let { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const getSession = async () => {
      let userResponse = await getUserFromSession();
      setUser(userResponse);
      setCallMade(true);
    };
    getSession();
    // eslint-disable-next-line
  }, []);

  const returnPage = () => {
    if (callMade) {
      return (
        <>
          <div className="page-wrapper">
            <Nav />
            {user ? (
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/users/signup" element={<SignUpForm />} />
                <Route path="/users/login" element={<LogInForm />} />
                <Route path="/recipes/view" element={<ViewRecipes />} />
                <Route path="/recipe/show" element={<ShowSingleRecipe />} />
                <Route path="/profile/" element={<Profile />} />
                <Route path="/*" element={<Navigate to="/home" />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/users/signup" element={<SignUpForm />} />
                <Route path="/users/login" element={<LogInForm />} />
                <Route path="/recipes/view" element={<ViewRecipes />} />
                <Route path="/recipe/show" element={<ShowSingleRecipe />} />
                <Route path="/*" element={<Navigate to="/home" />} />
              </Routes>
            )}
            <Footer />
          </div>
        </>
      );
    } else {
      return (
        <div className={"loader"}>
          <Loader type="bubble-scale" bgColor={"#e65a35"} size={100} />
        </div>
      );
    }
  };

  return <div className="App">{returnPage()}</div>;
}

export default App;
