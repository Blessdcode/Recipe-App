import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [input, setInput] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (input.trim()) {
            navigate('/searched/' + input)
        }
    }

    return (
        <FormStyle onSubmit={submitHandler}>
            <SearchContainer $focused={isFocused}>
                <SearchIcon $focused={isFocused}>
                    <FaSearch onClick={submitHandler} />
                </SearchIcon>
                <SearchInput
                    type="text"
                    placeholder="Search for a recipe..."
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={input}
                />
            </SearchContainer>
        </FormStyle>
    )
}

const FormStyle = styled.form`
    margin: 1.5rem 0;
`

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background: var(--bg-glass);
    border: 1px solid ${props => props.$focused ? 'rgba(249, 115, 22, 0.4)' : 'rgba(255, 255, 255, 0.08)'};
    border-radius: var(--radius-pill);
    transition: all var(--transition-normal);
    box-shadow: ${props => props.$focused ? 'var(--accent-glow), inset 0 0 20px rgba(249, 115, 22, 0.05)' : 'none'};

    &:hover {
        border-color: rgba(255, 255, 255, 0.15);
        background: var(--bg-glass-hover);
    }
`

const SearchIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 1.25rem;
    color: ${props => props.$focused ? 'var(--accent-primary)' : 'var(--text-muted)'};
    transition: color var(--transition-normal);
    cursor: pointer;

    svg {
        font-size: 1rem;
    }
`

const SearchInput = styled.input`
    flex: 1;
    border: none;
    background: transparent;
    font-size: 1rem;
    font-family: var(--font-body);
    color: var(--text-primary);
    padding: 1rem 1.25rem;
    outline: none;
    width: 100%;

    &::placeholder {
        color: var(--text-muted);
        transition: color var(--transition-fast);
    }

    &:focus::placeholder {
        color: var(--text-secondary);
    }
`

export default Search
