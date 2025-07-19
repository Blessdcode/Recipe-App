import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import { FaArrowLeft, FaClock, FaUsers, FaHeart } from 'react-icons/fa'

const Recipe = () => {
  const [active, setActive] = useState('instructions')
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const [details, setDetails] = useState({})
  const navigate = useNavigate()

  const fetchDetails = async () => {
    try {
      setIsLoading(true)
      const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
      const detailsData = await data.json()
      setDetails(detailsData)
    } catch (error) {
      console.error("Error fetching recipe details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [params.name])

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading delicious recipe...</LoadingText>
      </LoadingContainer>
    )
  }

  return (
    <Container>
      <BackButton onClick={() => navigate('/')}>
        <FaArrowLeft size={20} />
        <span>Back to Recipes</span>
      </BackButton>

      <RecipeHeader>
        <ImageSection>
          <RecipeImage src={details.image} alt={details.title} />
          <ImageOverlay>
            <LikeButton 
              onClick={() => setIsLiked(!isLiked)}
              $isLiked={isLiked}
            >
              <FaHeart />
            </LikeButton>
          </ImageOverlay>
        </ImageSection>
        
        <HeaderInfo>
          <RecipeTitle>{details.title}</RecipeTitle>
          <RecipeStats>
            {details.readyInMinutes && (
              <StatItem>
                <FaClock />
                <span>{details.readyInMinutes} mins</span>
              </StatItem>
            )}
            {details.servings && (
              <StatItem>
                <FaUsers />
                <span>{details.servings} servings</span>
              </StatItem>
            )}
          </RecipeStats>
        </HeaderInfo>
      </RecipeHeader>

      <ContentSection>
        <TabNavigation>
          <TabButton 
            $active={active === 'instructions'} 
            onClick={() => setActive('instructions')}
          >
            Instructions
          </TabButton>
          <TabButton 
            $active={active === 'ingredients'} 
            onClick={() => setActive('ingredients')}
          >
            Ingredients
          </TabButton>
          <TabIndicator $activeTab={active} />
        </TabNavigation>

        <ContentWrapper>
          {active === 'instructions' && (
            <InstructionsContent>
              {details.summary && (
                <SummaryCard>
                  <SectionTitle>About this recipe</SectionTitle>
                  <div dangerouslySetInnerHTML={{ __html: details.summary }} />
                </SummaryCard>
              )}
              
              {details.instructions && (
                <InstructionsCard>
                  <SectionTitle>How to make it</SectionTitle>
                  <div dangerouslySetInnerHTML={{ __html: details.instructions }} />
                </InstructionsCard>
              )}
            </InstructionsContent>
          )}
          
          {active === 'ingredients' && details.extendedIngredients && (
            <IngredientsContent>
              <SectionTitle>What you'll need</SectionTitle>
              <IngredientsList>
                {details.extendedIngredients.map((ingredient, index) => (
                  <IngredientItem key={ingredient.id} $delay={index * 0.1}>
                    <IngredientBullet />
                    <IngredientText>{ingredient.original}</IngredientText>
                  </IngredientItem>
                ))}
              </IngredientsList>
            </IngredientsContent>
          )}
        </ContentWrapper>
      </ContentSection>
    </Container>
  )
}

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  animation: ${fadeInUp} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
 
`

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

const LoadingText = styled.p`
  color: white;
  font-size: 1.2rem;
  margin-top: 1rem;
  font-weight: 300;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-bottom: 2rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-5px);
  }

  span {
    @media (max-width: 480px) {
      display: none;
    }
  }
`

const RecipeHeader = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const ImageSection = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`

const RecipeImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`

const ImageOverlay = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`

const LikeButton = styled.button`
  background: ${props => props.$isLiked ? '#e94057' : 'rgba(255, 255, 255, 0.2)'};
  backdrop-filter: blur(10px);
  border: none;
  color: ${props => props.$isLiked ? 'white' : 'white'};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.1);
    background: #e94057;
  }
`

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
`

const RecipeTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(
        135deg, 
        rgba(102, 126, 234, 0.8) 0%, 
        rgba(118, 75, 162, 0.8) 100%
    );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const RecipeStats = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  span {
    font-weight: 500;
  }
`

const ContentSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 1s ease-out 0.4s both;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const TabNavigation = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 16px;
`

const TabButton = styled.button`
  flex: 1;
  background: ${props => props.$active ? 'white' : 'transparent'};
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  color: ${props => props.$active ? '#333' : '#666'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$active ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none'};
  transform: ${props => props.$active ? 'translateY(-2px)' : 'none'};

  &:hover {
    color: #333;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
`

const TabIndicator = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: ${props => props.$activeTab === 'instructions' ? '0.5rem' : '50%'};
  width: calc(50% - 1rem);
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  transition: left 0.3s ease;
`

const ContentWrapper = styled.div`
  min-height: 300px;
`

const InstructionsContent = styled.div`
  animation: ${slideIn} 0.5s ease-out;
`

const IngredientsContent = styled.div`
  animation: ${slideIn} 0.5s ease-out;
`

const SummaryCard = styled.div`
 background: linear-gradient(35deg, #494949, #313131);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(240, 147, 251, 0.3);

  p {
    line-height: 1.7;
    margin: 0;
  }
`

const InstructionsCard = styled.div`
      background: rgba(255, 255, 255, 0.95);
  color: #333;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(79, 172, 254, 0.3);

  p {
    line-height: 1.7;
    margin: 0;
  }

  ol {
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 1rem;
      line-height: 1.6;
    }
  }
`

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const IngredientItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
  animation: ${slideIn} 0.5s ease-out ${props => props.$delay}s both;

  &:hover {
    background: #e9ecef;
    transform: translateX(10px);
  }
`

const IngredientBullet = styled.div`
  width: 8px;
  height: 8px;
 background: linear-gradient(35deg, #494949, #313131);
  border-radius: 50%;
  flex-shrink: 0;
`

const IngredientText = styled.span`
  font-size: 1.1rem;
  line-height: 1.5;
  color: #333;
  font-weight: 500;
`

export default Recipe
