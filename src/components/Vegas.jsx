import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const Vegas = () => {
  const [veggie, setVeggie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = sessionStorage.getItem("veggie");

    if (check) {
      setVeggie(JSON.parse(check));
      setIsLoading(false);
    } else {
      try {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=15&tags=vegetarian`,
        );
        const data = await api.json();
        sessionStorage.setItem("veggie", JSON.stringify(data.recipes));
        setVeggie(data.recipes);
      } catch (err) {
        console.error("Error fetching veggie recipes:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <Section>
        <SectionHeader>
          <SectionTitle>Vegetarian Picks</SectionTitle>
          <SectionSubtitle>Fresh & healthy plant-based recipes</SectionSubtitle>
        </SectionHeader>
        <SkeletonRow>
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} $delay={i * 0.15} />
          ))}
        </SkeletonRow>
      </Section>
    );
  }

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Vegetarian Picks</SectionTitle>
        <SectionSubtitle>Fresh & healthy plant-based recipes</SectionSubtitle>
      </SectionHeader>
      <Splide
        options={{
          perPage: 3,
          arrows: true,
          pagination: false,
          drag: "free",
          gap: "1.25rem",
          breakpoints: {
            1024: { perPage: 2 },
            640: { perPage: 1 },
          },
        }}
      >
        {veggie.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <Card>
              <CardLink to={"/recipe/" + recipe.id}>
                <ImageWrap>
                  <CardImage src={recipe.image} alt={recipe.title} />
                  <CardOverlay>
                    <ViewBtn>View Recipe</ViewBtn>
                  </CardOverlay>
                </ImageWrap>
                <CardBody>
                  <CardTitle>{recipe.title}</CardTitle>
                </CardBody>
              </CardLink>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Section>
  );
};

/* Animations */
const shimmer = keyframes`
  0% { background-position: -300px 0; }
  100% { background-position: calc(300px + 100%) 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* Styled Components */
const Section = styled.div`
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const SectionHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const SectionSubtitle = styled.p`
  color: var(--text-muted);
  font-size: 0.9rem;
`;

const Card = styled.div`
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all var(--transition-normal);
  height: 100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
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
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1rem;
  opacity: 0;
  transition: opacity var(--transition-normal);

  ${Card}:hover & {
    opacity: 1;
  }
`;

const ViewBtn = styled.span`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
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
`;

/* Skeleton Loading */
const SkeletonRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SkeletonCard = styled.div`
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  height: 280px;
  animation: ${fadeIn} 0.5s ease-out ${(props) => props.$delay}s both;

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

export default Vegas;
