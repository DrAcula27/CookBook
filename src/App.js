import "./App.css";
import { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import AddRecipePage from "./pages/add_recipe";
import ViewRecipesPage from "./pages/view_recipes";
import Nav from "./components/nav";
import { getUserFromSession } from "./utilities/user-functions";
import { AppContext } from "./contexts/app_context";
import Loader from "react-js-loader";
import Footer from "./components/footer";

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
                <Route path="/recipes/view" element={<ViewRecipesPage />} />
                <Route path="/recipes/add" element={<AddRecipePage />} />
                <Route path="/*" element={<Navigate to="/home" />} />
              </Routes>
            ) : (
              <HomePage />
            )}
            <Footer />
          </div>
        </>
      );
    } else {
      return <Loader />;
    }
  };

  return <div className="App">{returnPage()}</div>;
}

export default App;
