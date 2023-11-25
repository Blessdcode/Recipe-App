import React from 'react'
import { FaHamburger } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Nav = () => {
    const navigate = useNavigate()

    return (

        <Flex onClick={() => navigate('/')}>
            <FaHamburger size={24} />
            <h1>Recipify</h1>
        </Flex>
    )
}

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    
    h1{
        font-size: 24px;
        font-family: monospace;
        font-weight: 400;
        cursor: pointer;
    }
`

export default Nav
