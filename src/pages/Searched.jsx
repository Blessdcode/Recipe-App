import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

const Searched = () => {
    let params = useParams()
    const [searchedRecipes, setSearchedRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const getSearched = async (name) => {
        try {
            setIsLoading(true)
            setError(null)
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`)
            
            if (!data.ok) {
                throw new Error('Failed to fetch recipes')
            }
            
            const recipes = await data.json()
            setSearchedRecipes(recipes.results || [])
        } catch (err) {
            setError(err.message)
            setSearchedRecipes([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (params.search) {
            getSearched(params.search)
        }
    }, [params.search])

    if (isLoading) {
        return (
            <LoadingContainer>
                <LoadingGrid>
                    {Array(6).fill().map((_, index) => (
                        <SkeletonCard key={index} $delay={index * 0.1} />
                    ))}
                </LoadingGrid>
            </LoadingContainer>
        )
    }

    if (error) {
        return (
            <ErrorContainer>
                <ErrorIcon>🍽️</ErrorIcon>
                <ErrorTitle>Oops! Something went wrong</ErrorTitle>
                <ErrorMessage>{error}</ErrorMessage>
                <RetryButton onClick={() => getSearched(params.search)}>
                    Try Again
                </RetryButton>
            </ErrorContainer>
        )
    }

    if (searchedRecipes.length === 0) {
        return (
            <EmptyContainer>
                <EmptyIcon>🔍</EmptyIcon>
                <EmptyTitle>No recipes found</EmptyTitle>
                <EmptyMessage>
                    We couldn't find any recipes for "{params.search}". 
                    Try searching for something else!
                </EmptyMessage>
            </EmptyContainer>
        )
    }

    return (
        <Container>
            <SearchHeader>
                <SearchTitle>
                    Search Results for <SearchTerm>"{params.search}"</SearchTerm>
                </SearchTitle>
                <ResultCount>{searchedRecipes.length} recipes found</ResultCount>
            </SearchHeader>
            
            <Grid>
                {searchedRecipes.map((item, index) => (
                    <Card key={item.id} $delay={index * 0.1}>
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

const shimmer = keyframes`
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
`

const pulse = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
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
    background:linear-gradient(to right, #f27121, #e94057)
    padding: 2rem;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`

const SearchHeader = styled.div`
    text-align: center;
    margin-bottom: 3rem;
    color: white;
    animation: ${fadeInUp} 0.6s ease-out;
`

const SearchTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
     background:linear-gradient(to right, #f27121, #e94057)
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
        font-size: 2rem;
    }

    @media (max-width: 480px) {
        font-size: 1.5rem;
    }
`

const SearchTerm = styled.span`
    background:linear-gradient(to right, #f27121, #e94057)
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`

const ResultCount = styled.p`
    font-size: 1.1rem;
    opacity: 0.9;
    font-weight: 300;
`

const LoadingContainer = styled.div`
    min-height: 100vh;
     background:linear-gradient(to right, #f27121, #e94057)
    padding: 2rem;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`

const LoadingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-gap: 1.5rem;
    }
`

const SkeletonCard = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    height: 400px;
    animation: ${fadeInUp} 0.6s ease-out ${props => props.$delay}s both;
    
    &::before {
        content: '';
        display: block;
        width: 100%;
        height: 70%;
        background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.1) 100%
        );
        background-size: 200px 100%;
        background-repeat: no-repeat;
        border-radius: 20px 20px 0 0;
        animation: ${shimmer} 1.5s infinite linear;
    }
`

const ErrorContainer = styled.div`
    min-height: 100vh;
   background:linear-gradient(to right, #f27121, #e94057)
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: white;
    text-align: center;
`

const ErrorIcon = styled.div`
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: ${pulse} 2s infinite;
`

const ErrorTitle = styled.h2`
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 700;
`

const ErrorMessage = styled.p`
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.9;
`

const RetryButton = styled.button`
   background:linear-gradient(to right, #f27121, #e94057)
    border: none;
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(245, 87, 108, 0.3);
    }
`

const EmptyContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(35deg, #494949, #313131);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: white;
    text-align: center;
`

const EmptyIcon = styled.div`
    font-size: 4rem;
    margin-bottom: 1rem;
`

const EmptyTitle = styled.h2`
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 700;
`

const EmptyMessage = styled.p`
    font-size: 1.1rem;
    opacity: 0.9;
    max-width: 500px;
    line-height: 1.6;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-gap: 1.5rem;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }
`

const Card = styled.div`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transition: all 0.4s ease;
    animation: ${fadeInUp} 0.6s ease-out ${props => props.$delay}s both;

    &:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
`

const CardLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: block;
`

const ImageContainer = styled.div`
    position: relative;
    overflow: hidden;
`

const RecipeImage = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: transform 0.4s ease;

    ${Card}:hover & {
        transform: scale(1.1);
    }
`

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        135deg, 
        rgba(102, 126, 234, 0.8) 0%, 
        rgba(118, 75, 162, 0.8) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;

    ${Card}:hover & {
        opacity: 1;
    }
`

const ViewButton = styled.button`
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: ${slideIn} 0.5s ease-out;

    &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.05);
    }
`

const CardContent = styled.div`
    padding: 1.5rem;
    text-align: center;
`

const RecipeTitle = styled.h3`
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #333;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

const ViewMoreText = styled.p`
    color: #666;
    font-size: 0.9rem;
    margin: 0;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;

    ${Card}:hover & {
        opacity: 1;
        transform: translateY(0);
    }
`

export default Searched
