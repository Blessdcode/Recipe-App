import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Searched = () => {
  let params = useParams();
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getSearched = async (name) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${name}`,
      );

      if (!data.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const recipes = await data.json();
      setSearchedRecipes(recipes.results || []);
    } catch (err) {
      setError(err.message);
      setSearchedRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params.search) {
      getSearched(params.search);
    }
  }, [params.search]);

  if (isLoading) {
    return (
      <Container>
        <LoadingGrid>
          {Array(6)
            .fill()
            .map((_, index) => (
              <SkeletonCard key={index} $delay={index * 0.1} />
            ))}
        </LoadingGrid>
      </Container>
    );
  }

  if (error) {
    return (
      <StateContainer>
        <StateIcon>🍽️</StateIcon>
        <StateTitle>Oops! Something went wrong</StateTitle>
        <StateMessage>{error}</StateMessage>
        <RetryButton onClick={() => getSearched(params.search)}>
          Try Again
        </RetryButton>
      </StateContainer>
    );
  }

  if (searchedRecipes.length === 0) {
    return (
      <StateContainer>
        <StateIcon>🔍</StateIcon>
        <StateTitle>No recipes found</StateTitle>
        <StateMessage>
          We couldn't find any recipes for "{params.search}". Try searching for
          something else!
        </StateMessage>
      </StateContainer>
    );
  }

  return (
    <Container>
      <SearchHeader>
        <SearchTitle>
          Results for <SearchTerm>"{params.search}"</SearchTerm>
        </SearchTitle>
        <ResultCount>{searchedRecipes.length} recipes found</ResultCount>
      </SearchHeader>

      <Grid>
        {searchedRecipes.map((item, index) => (
          <Card key={item.id} $delay={index * 0.08}>
            <CardLink to={`/recipe/${item.id}`}>
              <ImageContainer>
                <RecipeImage src={item.image} alt={item.title} />
                <ImageOverlay>
                  <ViewButton>View Recipe</ViewButton>
                </ImageOverlay>
              </ImageContainer>
              <CardContent>
                <RecipeTitle>{item.title}</RecipeTitle>
                <ViewMoreText>Click to see full recipe →</ViewMoreText>
              </CardContent>
            </CardLink>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

/* Animations */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -300px 0; }
  100% { background-position: calc(300px + 100%) 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

/* Styled Components */
const Container = styled.div`
  min-height: 60vh;
  padding-bottom: 3rem;
`;

const SearchHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  animation: ${fadeInUp} 0.5s ease-out;
`;

const SearchTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.4rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const SearchTerm = styled.span`
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ResultCount = styled.p`
  color: var(--text-muted);
  font-size: 0.9rem;
`;

/* Grid & Cards */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Card = styled.div`
  background: var(--bg-card);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
  animation: ${fadeInUp} 0.5s ease-out ${(props) => props.$delay}s both;

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 11;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.08);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(249, 115, 22, 0.6),
    rgba(239, 68, 68, 0.6)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-normal);

  ${Card}:hover & {
    opacity: 1;
  }
`;

const ViewButton = styled.span`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 600;
`;

const CardContent = styled.div`
  padding: 1rem 1.25rem;
`;

const RecipeTitle = styled.h3`
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.3rem;
`;

const ViewMoreText = styled.p`
  color: var(--text-muted);
  font-size: 0.78rem;
  opacity: 0;
  transform: translateY(5px);
  transition: all var(--transition-normal);

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* Loading Skeleton */
const LoadingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding-top: 2rem;
`;

const SkeletonCard = styled.div`
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  height: 300px;
  animation: ${fadeInUp} 0.5s ease-out ${(props) => props.$delay}s both;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 70%;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(255, 255, 255, 0.08) 50%,
      rgba(255, 255, 255, 0.03) 100%
    );
    background-size: 300px 100%;
    background-repeat: no-repeat;
    animation: ${shimmer} 1.8s infinite linear;
  }
`;

/* Error / Empty States */
const StateContainer = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const StateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: ${pulse} 2s infinite;
`;

const StateTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
`;

const StateMessage = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  max-width: 450px;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const RetryButton = styled.button`
  background: var(--accent-gradient);
  border: none;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: var(--radius-pill);
  font-weight: 600;
  font-family: var(--font-body);
  cursor: pointer;
  font-size: 0.95rem;
  transition: all var(--transition-normal);
  box-shadow: var(--accent-glow);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
  }
`;

export default Searched;
