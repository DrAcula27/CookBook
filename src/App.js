import "./App.css";
import { useEffect, useState, useContext } from "react";
import HomePage from "./pages/home";
import Nav from "./components/nav";
import Footer from "./components/footer";
import { getUserFromSession } from "./utilities/user-functions";
import { AppContext } from "./contexts/app_context";
import Loader from "react-js-loader";

function App() {
  const [callMade, setCallMade] = useState(false);
  let { setUser } = useContext(AppContext);

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
            <HomePage />
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
