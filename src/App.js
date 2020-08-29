import React, {useEffect, useState} from 'react';
import './App.scss';
import {configRecipe} from "./config/config"; 

//components
import Recipe from "./components/Recipe/Recipe";

const App =(props)=>{

  const APP_ID = configRecipe.APP_ID;
  const APP_KEY = configRecipe.APP_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("")
  const [numberOfSearches, setNumberOfSearches]= useState(0);
  useEffect( ()=>{
    getRecipes();
  },[query])

  const getRecipes= async ()=>{
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data= await response.json();
    setRecipes(data.hits)
  }

  const updateSearch=(e)=>{
    setSearch(e.target.value)
  }

  const getSearch=(e)=>{
    e.preventDefault();
    setQuery(search);
    setNumberOfSearches(numberOfSearches+1);
    setSearch("")
  }
  return(
    <div>
      <div className="banner">
        <h1>Recipe Maker</h1>
        <form className="search-form" onSubmit={getSearch}>
          <input className="search-bar" 
          type="text" 
          value={search} 
          onChange={updateSearch}
          placeholder="Search for..."/>
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
      
      <div className="recipes">

            {numberOfSearches===0 ? <h3></h3>: recipes.length===0 ? <h3>{`No recipe was found for ${query}`} </h3> : recipes.map((recipe,index)=>(
              <Recipe key={index} 
              title={recipe.recipe.label} 
              calories={parseInt(`${recipe.recipe.calories}`)}   
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              alt={index}
              />
          )) }
        
      </div>
      
    </div>
  )
}

export default App;
