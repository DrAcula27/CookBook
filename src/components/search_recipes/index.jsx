import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../contexts/app_context";
import "./index.css";

const SearchRecipes = () => {
  const { mealsArray, setMealsArray, setSearchQueries } =
    useContext(AppContext);

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      params: {
        s: search,
      },
    };
    console.log("axios config from frontend: ", config);

    if (config.params.s) {
      const serverResponse = await axios.get(`/search_recipes`, config);
      const meals = serverResponse.data.meals;

      setMealsArray(meals);

      if (mealsArray) {
        try {
          setMealsArray(meals);
          setSearchQueries([search]);
        } catch (error) {
          console.error(error);
        }
      }
      console.log("meals array: ", mealsArray);
      console.log("axios config: ", config);
    }
    setSearch("");
  };

  return (
    <div className="search-container flex-ctr-ctr">
      <form id="search-recipes-form" autoComplete="off" onSubmit={handleSubmit}>
        <section className="search">
          <input
            type="search"
            name="searchName"
            value={search}
            placeholder="Search meal by name"
            onChange={handleChange}
          />
        </section>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchRecipes;
