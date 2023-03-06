import React, { useState } from "react";
import Select from "react-select";
import "./index.css";

const SearchAndFilter = () => {
  const [formState, setFormState] = useState({
    search: "",
    filter: "",
  });

  const handleChange = (e) => {
    let propertyName = e.target.name;
    setFormState({
      ...formState,
      [propertyName]: e.target.value,
    });
  };

  const filterChoices = [
    {
      label: "Categories",
      options: [
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
      ],
    },
    {
      label: "Areas",
      options: [
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
      ],
    },
  ];

  return (
    <div className="search-and-filter flex-ctr-ctr">
      <section className="search">
        <input
          type="search"
          name="search"
          value={formState.search}
          placeholder="recipe or ingredient(s)"
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </section>
      <section className="filter">
        <Select
          options={filterChoices}
          isMulti
          placeholder="Filter by..."
          onChange={(option) => console.log(option.label, option.value)}
        />
      </section>
    </div>
  );
};

export default SearchAndFilter;
