import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Cuisine = () => {
  let params = useParams();
  const [cuisine, setCuisine] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCuisine = async (name) => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&number=15&cuisine=${name}`,
      );
      const recipes = await data.json();
      setCuisine(recipes.results);
    } catch (err) {
      console.error("Error fetching cuisine:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  if (isLoading) {
    return (
      <Container
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <PageHeader>
          <PageTitle>{params.type} Cuisine</PageTitle>
          <PageSubtitle>
            Discovering delicious {params.type} recipes...
          </PageSubtitle>
        </PageHeader>
        <SkeletonGrid>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} $delay={i * 0.1} />
          ))}
        </SkeletonGrid>
      </Container>
    );
  }

  return (
    <Container
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHeader>
        <PageTitle>{params.type} Cuisine</PageTitle>
        <PageSubtitle>{cuisine.length} recipes found</PageSubtitle>
      </PageHeader>
      <Grid>
        {cuisine.map((item, index) => (
          <Card key={item.id} $delay={index * 0.08}>
            <CardLink to={`/recipe/${item.id}`}>
              <ImageWrap>
                <CardImage src={item.image} alt={item.title} />
                <CardOverlay>
                  <ViewBtn>View Recipe</ViewBtn>
                </CardOverlay>
              </ImageWrap>
              <CardBody>
                <CardTitle>{item.title}</CardTitle>
                <ViewMore>Click to see full recipe →</ViewMore>
              </CardBody>
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

/* Styled Components */
const Container = styled(motion.div)`
  min-height: 60vh;
  padding-bottom: 3rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  animation: ${fadeInUp} 0.5s ease-out;
`;

const PageTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const PageSubtitle = styled.p`
  color: var(--text-muted);
  font-size: 0.9rem;
`;

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
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid rgba(255, 255, 255, 0.05);
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

const ImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 11;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.08);
  }
`;

const CardOverlay = styled.div`
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

const ViewBtn = styled.span`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  font-weight: 600;
`;

const CardBody = styled.div`
  padding: 1rem 1.25rem;
`;

const CardTitle = styled.h4`
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

const ViewMore = styled.p`
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

/* Skeleton */
const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const SkeletonCard = styled.div`
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  height: 280px;
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

export default Cuisine;
