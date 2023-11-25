import { useEffect, useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import styled from "styled-components"
import {FaBackward} from 'react-icons/fa'

const Recipe = () => {
  const [active, setActive] = useState('instructions')
  const params = useParams()
  const [details, setDetails] = useState({})

  const check = localStorage.getItem('detail')

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
    const detailsData = await data.json()
    setDetails(detailsData)

  }

  useEffect(() => {
    fetchDetails()
  }, [params.name])

  const navigate= useNavigate()

  return (
    <DetailWrapper>
      <FaBackward onClick={()=> navigate('/')} size={32}/>
      <Wrapper>
        <div>
          <h2>{details.title}</h2>
          <ImgCon>
          <img src={details.image} alt={details.title} />
          </ImgCon>
        </div>
        <Info>
          
          <Button className={active === 'instructions' ? 'active' : ""} onClick={() => setActive('instructions')}>Instructions</Button>
          <Button className={active === 'ingredients' ? 'active' : ""} onClick={() => setActive('ingredients')}>Ingredients</Button>
          {active === 'instructions' && (
            <div>
              <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
              <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
            </div>
          )}
          
          {active === 'ingredients' && (
            <ul>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          )}
        </Info>
      </Wrapper>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  width: 100%;
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  .active {
    background: linear-gradient(to right, #f27121, #e94057);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
   
  }

  h3 {
    font-weight: 500;
    margin-bottom: 2rem;
    @media (max-width: 800px) {
   font-size: 1rem;
   line-height: 1.7rem;
  }
  }

  li {
    font-size: 1.2rem;
    line-height: 2rem;
    list-style: none;

  }

  ul {
    margin-top: 1.7rem;
  }

 
`;

const ImgCon = styled.div`
  width: 100%;
  img{
    width: 400px;
    border-radius: 10px;
    @media (max-width: 600px) {
      width: 100%;
      
  }
  }
`


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 3rem;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: white;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
  @media (max-width: 800px) {
    padding: .8rem 1rem;

  }
`;

const Info = styled.div`
  margin-top: 1rem;

  @media (max-width: 800px) {
    /* margin-left: 12px; */
  }
`;

export default Recipe;
