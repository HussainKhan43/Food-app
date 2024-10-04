import React, { useEffect, useState } from 'react'
import Recipe from './Recipe';
import { NavLink,Route,Routes } from 'react-router-dom';
import Cards from './Cards';

const Food = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [msg, setMsg] = useState("Search and Get Recipes");

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const myFun = async () => {
    if (search === "") {
      setMsg("Please Enter Something");
    } else {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
        const jsonData = await response.json();
        if (jsonData.meals) {
          setData(jsonData.meals);
          setMsg("Your Search Results");
        } else {
          setData([]); // Clear data if no meals are found
          setMsg("No results found");
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setMsg("Error fetching data");
      }
    }
  };

  return (
    <>
      <h1 className="head">FOOD RECIPE APP</h1>
      <div className="container">
        <div className="searchBar">
          <input
            placeholder="Search Meals"
            type="text"
            onChange={handleInput}
            value={search}
          />
          <button onClick={myFun} disabled={search === ""}>
            Search
          </button>
        </div>
        <h2 className="msg">{msg}</h2>
        <div>
          <Cards detail={data} />
        </div>
      </div>
    </>
  );
};

export default Food;
