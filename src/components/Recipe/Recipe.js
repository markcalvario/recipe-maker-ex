import React, {useState} from 'react';
import "./recipe.css";


const Recipe =({title,calories,image,alt, ingredients})=>{
    const [open, setOpen]= useState(false);
    const toggleIngredients=(e)=>{
        setOpen(!open);
    }
    return(
    <div className="recipe">
        <h3 className="recipe-title">{title}</h3>
        <img className="recipe-image" src={image} alt={alt}/>
        <p className="recipe-calories">Calories: <span>{calories}</span></p>
        <button onClick={toggleIngredients}>Ingredients: </button>
        {open && (
            <ul className="recipe-ingredients">
                {/* {console.log(ingredients)} */}
                {ingredients.map((ingredient,index)=>(
                    <li key={index}>{ingredient.text}</li>
                ))}
            </ul>
        )}
        
    </div>

  )
}

export default Recipe;
