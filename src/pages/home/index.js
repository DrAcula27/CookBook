import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faMagnifyingGlass,
  faBookmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import image from "../../logo.svg";

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="welcome">
        <h1>
          Welcome to <span className="app-title">My Cook Book</span>!
        </h1>
        <p>Browse for and create delicious recipes!</p>
        <img src={image} alt="cookbook" />
        <button>Let's Cook!</button>
      </section>
      <section className="features">
        <h2>
          What can I do with <span className="app-title">My Cook Book</span>?
        </h2>
        <div className="possibilities">
          <div className="possibility-item">
            <h3>Discover</h3>
            <FontAwesomeIcon
              icon={faGlobe}
              size="5x"
              color="var(--accent-color)"
            />
            <p>
              Not sure what to cook? Browse recipes from around the world, and
              find something that fits your fancy.
            </p>
          </div>
          <div className="possibility-item">
            <h3>Search</h3>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="5x"
              color="var(--accent-color)"
            />
            <p>
              Got a specific recipe in mind? You can search for recipes by name
              or one (or more) ingredients. You can also filter recipes by
              category or cuisine type. Give it a try!
            </p>
          </div>
          <div className="possibility-item">
            <h3>Save</h3> {/* or maybe Bookmark, or Favorite? */}
            <FontAwesomeIcon
              icon={faBookmark}
              size="5x"
              color="var(--accent-color)"
            />
            <p>
              Once you log in, you can save your favorite recipes to your
              profile, add ingredients to your cart, and email that list of
              ingredients.
            </p>
          </div>
          <div className="possibility-item">
            <h3>Create</h3>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
