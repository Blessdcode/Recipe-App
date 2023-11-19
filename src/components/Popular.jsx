import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


const Popular = () => {

  const [popular, setPopular] = useState([])

  useEffect(() => {
    getPopular()
  }, [])

  const getPopular = async () => {

    const check = localStorage.getItem("popular")

    if (check) {
      setPopular(JSON.parse(check))
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`)

      const data = await api.json()

      localStorage.setItem("popular", JSON.stringify(data.recipes))
      setPopular(data.recipes)
      console.log(data);
    }



  }
  return (
    <Wrapper >
      <h3>Popular Food</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "2rem"
        }}>
        {popular.map((recipes) => {
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
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`

export default Popular