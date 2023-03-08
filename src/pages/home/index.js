import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faMagnifyingGlass,
  faBookmark,
  // faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import image from "../../logo.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="welcome">
        <h1>
          Welcome to <span className="app-title">My Cook Book</span>!
        </h1>
        <p>Browse for and create delicious recipes!</p>
        <img src={image} alt="cookbook" />
        <Link to="/recipes/view">
          <button>Let's Cook!</button>
        </Link>
      </section>
      <section className="features">
        <h2>
          What can I do with <span className="app-title">My Cook Book</span>?
        </h2>
        <div className="possibilities">
          <div className="possibility-item">
            <h3 className="box-outline">Discover</h3>
            <FontAwesomeIcon
              icon={faGlobe}
              size="5x"
              color="var(--accent-color)"
            />
            <p>
              Not sure what to cook? Browse recipes from around the world, and
              find something that whets your appitite.
            </p>
          </div>
          <div className="possibility-item">
            <h3 className="box-outline">Search</h3>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="5x"
              color="var(--accent-color)"
            />
            <p>
              Got a specific recipe in mind? You can search for recipes by name.
              You can also filter recipes by ingredient, category, or location.
            </p>
          </div>
          <div className="possibility-item">
            <h3 className="box-outline">Save</h3>
            <FontAwesomeIcon
              icon={faBookmark}
              size="5x"
              color="var(--accent-color)"
            />
            <p>
              Once you log in, you can save your favorite recipes to your
              profile! Give it a try!
              {/* FUTURE WORK
              add ingredients to your cart, and email that list of
              ingredients. */}
            </p>
          </div>
          {/* FUTURE WORK
          <div className="possibility-item">
            <h3 className="box-outline">Create</h3>
            <FontAwesomeIcon
              icon={faPenToSquare}
              size="5x"
              color="var(--accent-color)"
            />
            <p>
              Have a special recipe in mind that you'd like to save? Once you
              log in, you also gain the ability to create your very own recipes
              and add them to your profile! Of course, you can also modify or
              delete them, too.
            </p>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
