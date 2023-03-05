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
    { label: "Vegitarian", value: "vegitarian" },
    { label: "Vegan", value: "vegan" },
    { label: "Gluten Free", value: "glutenFree" },
    { label: "Dairy Free", value: "dairyFree" },
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
