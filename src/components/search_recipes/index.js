import React, { useState, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { AppContext } from "../../contexts/app_context";
import "./index.css";

const SearchRecipes = () => {
  const { mealsArray, setMealsArray, setSearchQueries } =
    useContext(AppContext);

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    let propertyName = e.target.name;
    setSearch({
      ...search,
      [propertyName]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      params: {
        s: search.searchName,
      },
    };
    console.log("axios config from frontend: ", config);

    const serverResponse = await axios.get(`/search_recipes`, config);
    const meals = serverResponse.data.meals;

    if (mealsArray !== null) {
      try {
        setMealsArray(meals);
        setSearchQueries([search.searchName]);
      } catch (error) {
        console.error(error);
      }
    }
    // clear log when done testing
    console.log("meals array: ", mealsArray);
    console.log("axios config: ", config);
  };

  return (
    <div className="search-and-filter flex-ctr-ctr">
      <form id="find-recipes-form" autoComplete="off" onSubmit={handleSubmit}>
        <section className="search">
          <input
            type="search"
            name="searchName"
            value={search.searchName}
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
