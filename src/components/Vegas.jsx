import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


const Vegas = () => {

  const [veggie, setVeggie] = useState([])

  useEffect(() => {
    getVeggie()
  }, [])

  const getVeggie = async () => {

    const check = localStorage.getItem("veggie")

    if (check) {
      setVeggie(JSON.parse(check))
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=15&tags=vegetarian`)

      const data = await api.json()

      localStorage.setItem("veggie", JSON.stringify(data.recipes))
      setVeggie(data.recipes)
      console.log(data);
    }
  }



  return (
    <Wrapper >
      <h3>Vegetarian Food</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "2rem",
          breakpoints: {
            640: {
              perPage: 1,
            },
          }
        }}>
        {veggie.map((recipes) => {
          return (

            <SplideSlide key={recipes.id}>
              <Card>
                <p>{recipes.title}</p>
                <img src={recipes.image} alt={recipes.title} />
                <Gradient />
              </Card>
            </SplideSlide>
          )
        })}
      </Splide>
    </Wrapper>
    // <Wrapper>
    //   <h3>Vegetarian Food</h3>

    //   {veggie.map((food) => {
    //     return (
    //       <div key={food.id}>
    //         <SplideSlide>
    //           <Card>
    //             <p>{food.title}</p>
    //             <img src={food.image} alt={food.title} />
    //           </Card>
    //         </SplideSlide>
    //       </div>
    //     )
    //   })}
    // </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0;
`

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width:100%;
    height:100%;
    object-fit: cover;
    object-position: center;
  }
  p{
    position: absolute;
    z-index: 10;
    left: 59%;
    top:50%;
    transform: translate(-50%, -50%);
    color:white;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7));
`

export default Vegas
