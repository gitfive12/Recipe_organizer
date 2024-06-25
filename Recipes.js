// src/components/Recipes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
    axios.get(`http://localhost:3001/api/recipes?userId=${userId}`)
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the recipes!', error);
      });
  }, [userId, navigate]);

  const handleDelete = (recipeId) => {
    axios.delete(`http://localhost:3001/api/recipes/${recipeId}`)
      .then(() => {
        setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
      })
      .catch(error => {
        console.error('There was an error deleting the recipe!', error);
      });
  };

  return (
    <div>
      <h2>My Recipes</h2>
      <Link to="/add-recipe">Add New Recipe</Link>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.instructions}</p>
            <button onClick={() => handleDelete(recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recipes;

