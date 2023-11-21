import React from 'react'

const Searched = () => {

    const getSearched = async (name)=>{
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`)
        const recipes = await data.json()
        setCuisine(recipes.results)
    }

  return (
    <div>
      hello
    </div>
  )
}

export default Searched
