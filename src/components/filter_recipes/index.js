import React, { useState, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { AppContext } from "../../contexts/app_context";
import "./index.css";

const FilterRecipes = () => {
  const { mealsArray, setMealsArray, setSearchQueries } =
    useContext(AppContext);

  const [formState, setFormState] = useState({
    filterIngredient: "",
    filterCategory: "",
    filterArea: "",
  });

  const handleChange = (e) => {
    let propertyName = e.target.name;
    setFormState({
      ...formState,
      [propertyName]: e.target.value,
    });
  };

  const handleFilterCategories = (option) => {
    setFormState({
      ...formState,
      filterCategory: option,
    });
  };

  const handleFilterAreas = (option) => {
    setFormState({
      ...formState,
      filterArea: option,
    });
  };

  const filterCategories = [
    { label: "Beef", value: "Beef" },
    { label: "Breakfast", value: "Breakfast" },
    { label: "Chicken", value: "Chicken" },
    { label: "Dessert", value: "Dessert" },
    { label: "Goat", value: "Goat" },
    { label: "Lamb", value: "Lamb" },
    { label: "Miscellaneous", value: "Miscellaneous" },
    { label: "Pasta", value: "Pasta" },
    { label: "Pork", value: "Pork" },
    { label: "Seafood", value: "Seafood" },
    { label: "Side", value: "Side" },
    { label: "Starter", value: "Starter" },
    { label: "Vegan", value: "Vegan" },
    { label: "Vegitarian", value: "Vegitarian" },
  ];

  const filterAreas = [
    { label: "American", value: "American" },
    { label: "Canadian", value: "Canadian" },
    { label: "Chinese", value: "Chinese" },
    { label: "Croatian", value: "Croatian" },
    { label: "Dutch", value: "Dutch" },
    { label: "Egyptian", value: "Egyptian" },
    { label: "French", value: "French" },
    { label: "Greek", value: "Greek" },
    { label: "Indian", value: "Indian" },
    { label: "Irish", value: "Irish" },
    { label: "Italian", value: "Italian" },
    { label: "Jamaican", value: "Jamaican" },
    { label: "Japanese", value: "Japanese" },
    { label: "Kenyan", value: "Kenyan" },
    { label: "Malaysian", value: "Malaysian" },
    { label: "Mexican", value: "Mexican" },
    { label: "Moroccan", value: "Moroccan" },
    { label: "Polish", value: "Polish" },
    { label: "Portuguese", value: "Portuguese" },
    { label: "Russian", value: "Russian" },
    { label: "Spanish", value: "Spanish" },
    { label: "Thai", value: "Thai" },
    { label: "Tunisian", value: "Tunisian" },
    { label: "Turkish", value: "Turkish" },
    { label: "Unknown", value: "Unknown" },
    { label: "Vietnamese", value: "Vietnamese" },
  ];

  const handleClearCategory = () => {
    setFormState({
      ...formState,
      filterCategory: "",
    });
  };

  const handleClearArea = () => {
    setFormState({
      ...formState,
      filterArea: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      params: {
        i: formState.filterIngredient,
        c: formState.filterCategory.value,
        a: formState.filterArea.value,
      },
    };
    console.log("axios config from frontend: ", config);

    const serverResponse = await axios.get(`/filter_recipes`, config);
    const meals = serverResponse.data.meals;

    if (mealsArray !== null) {
      try {
        setMealsArray(meals);
        setSearchQueries([
          formState.filterIngredient,
          formState.filterCategory.value,
          formState.filterArea.value,
        ]);
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
            name="filterIngredient"
            value={formState.filterIngredient}
            placeholder="Ingredient"
            onChange={handleChange}
          />
        </section>
        <section className="filter">
          <Select
            options={filterCategories}
            // isMulti
            isClearable
            placeholder="Filter by Category"
            value={formState.filterCategory}
            onChange={(option) => handleFilterCategories(option)}
            components={{
              ClearIndicator: () => (
                <div onClick={handleClearCategory}>Clear</div>
              ),
            }}
          />
        </section>
        <section className="filter">
          <Select
            options={filterAreas}
            // isMulti
            isClearable
            placeholder="Filter by Area"
            value={formState.filterArea}
            onChange={(option) => handleFilterAreas(option)}
            components={{
              ClearIndicator: () => <div onClick={handleClearArea}>Clear</div>,
            }}
          />
        </section>
        <button type="submit">Filter</button>
      </form>
    </div>
  );
};

export default FilterRecipes;
