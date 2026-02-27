import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaArrowLeft, FaClock, FaUsers, FaHeart } from "react-icons/fa";

const Recipe = () => {
  const [active, setActive] = useState("instructions");
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const [details, setDetails] = useState({});
  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${import.meta.env.VITE_API_KEY}`,
      );
      const detailsData = await data.json();
      setDetails(detailsData);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading delicious recipe...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => navigate("/")}>
        <FaArrowLeft size={16} />
        <span>Back to Recipes</span>
      </BackButton>

      <RecipeHeader>
        <ImageSection>
          <RecipeImage src={details.image} alt={details.title} />
          <ImageOverlay>
            <LikeButton onClick={() => setIsLiked(!isLiked)} $isLiked={isLiked}>
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
            $active={active === "instructions"}
            onClick={() => setActive("instructions")}
          >
            Instructions
          </TabButton>
          <TabButton
            $active={active === "ingredients"}
            onClick={() => setActive("ingredients")}
          >
            Ingredients
          </TabButton>
        </TabNavigation>

        <ContentWrapper>
          {active === "instructions" && (
            <TabContent>
              {details.summary && (
                <SummaryCard>
                  <SectionTitle>About this recipe</SectionTitle>
                  <SummaryText
                    dangerouslySetInnerHTML={{ __html: details.summary }}
                  />
                </SummaryCard>
              )}

              {details.instructions && (
                <InstructionsCard>
                  <SectionTitle>How to make it</SectionTitle>
                  <InstructionsBody
                    dangerouslySetInnerHTML={{ __html: details.instructions }}
                  />
                </InstructionsCard>
              )}
            </TabContent>
          )}

          {active === "ingredients" && details.extendedIngredients && (
            <TabContent>
              <SectionTitle>What you'll need</SectionTitle>
              <IngredientsList>
                {details.extendedIngredients.map((ingredient, index) => (
                  <IngredientItem key={ingredient.id} $delay={index * 0.05}>
                    <IngredientBullet />
                    <IngredientText>{ingredient.original}</IngredientText>
                  </IngredientItem>
                ))}
              </IngredientsList>
            </TabContent>
          )}
        </ContentWrapper>
      </ContentSection>
    </Container>
  );
};

/* Animations */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-15px); }
  to { opacity: 1; transform: translateX(0); }
`;

/* Styled Components */
const Container = styled.div`
  min-height: 80vh;
  padding: 1rem 0 3rem;
  animation: ${fadeInUp} 0.5s ease-out;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const LoadingSpinner = styled.div`
  width: 44px;
  height: 44px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid var(--accent-primary);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 400;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-glass);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-pill);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  transition: all var(--transition-normal);
  margin-bottom: 2rem;

  &:hover {
    background: var(--bg-glass-hover);
    color: var(--text-primary);
    transform: translateX(-4px);
  }

  span {
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

const RecipeHeader = styled.div`
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
  animation: ${fadeInUp} 0.6s ease-out 0.1s both;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform var(--transition-slow);

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    height: 240px;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const LikeButton = styled.button`
  background: ${(props) =>
    props.$isLiked ? "#ef4444" : "rgba(255, 255, 255, 0.15)"};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: scale(1.1);
    background: #ef4444;
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RecipeTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const RecipeStats = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-glass);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-pill);
  color: var(--text-secondary);
  font-size: 0.85rem;

  svg {
    color: var(--accent-primary);
  }

  span {
    font-weight: 500;
  }
`;

const ContentSection = styled.div`
  background: var(--bg-card);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-xl);
  padding: 2rem;
  animation: ${fadeInUp} 0.7s ease-out 0.2s both;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const TabNavigation = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: var(--bg-glass);
  padding: 0.35rem;
  border-radius: var(--radius-md);
`;

const TabButton = styled.button`
  flex: 1;
  background: ${(props) =>
    props.$active ? "var(--bg-secondary)" : "transparent"};
  border: ${(props) =>
    props.$active
      ? "1px solid rgba(255, 255, 255, 0.08)"
      : "1px solid transparent"};
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9rem;
  color: ${(props) =>
    props.$active ? "var(--text-primary)" : "var(--text-muted)"};
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    color: var(--text-primary);
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.82rem;
  }
`;

const ContentWrapper = styled.div`
  min-height: 250px;
`;

const TabContent = styled.div`
  animation: ${slideIn} 0.4s ease-out;
`;

const SummaryCard = styled.div`
  background: var(--accent-gradient-soft);
  border: 1px solid rgba(249, 115, 22, 0.15);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
`;

const SummaryText = styled.div`
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.92rem;

  a {
    color: var(--accent-primary);
    text-decoration: underline;
  }

  b,
  strong {
    color: var(--text-primary);
  }
`;

const InstructionsCard = styled.div`
  background: var(--bg-glass);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.92rem;

  ol {
    padding-left: 1.25rem;

    li {
      margin-bottom: 0.75rem;
      line-height: 1.6;
    }
  }

  p {
    margin-bottom: 0.5rem;
  }
`;

const InstructionsBody = styled.div`
  color: var(--text-secondary);
  line-height: 1.7;

  a {
    color: var(--accent-primary);
  }
`;

const SectionTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const IngredientItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  margin-bottom: 0.4rem;
  background: var(--bg-glass);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  animation: ${slideIn} 0.4s ease-out ${(props) => props.$delay}s both;

  &:hover {
    background: var(--bg-glass-hover);
    transform: translateX(6px);
    border-color: rgba(249, 115, 22, 0.15);
  }
`;

const IngredientBullet = styled.div`
  width: 7px;
  height: 7px;
  background: var(--accent-primary);
  border-radius: 50%;
  flex-shrink: 0;
`;

const IngredientText = styled.span`
  font-size: 0.95rem;
  line-height: 1.4;
  color: var(--text-secondary);
  font-weight: 400;
`;

export default Recipe;
