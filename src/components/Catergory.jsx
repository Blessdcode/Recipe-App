import React from 'react'
import { FaPizzaSlice, FaHamburger, FaHome } from 'react-icons/fa'
import { GiNoodles, GiChopsticks } from 'react-icons/gi'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'


const Catergory = () => {
    return (
        <List>
            <SLink to={'/'}>
                <FaHome size={30}/>
                <h4>Home</h4>
            </SLink>
            <SLink to={'/cuisine/Italian'}>
                <FaPizzaSlice size={30}/>
                <h4>Italian</h4>
            </SLink>
            <SLink to={'/cuisine/American'}>
                <FaHamburger size={30}/>
                <h4>American</h4>
            </SLink>
            <SLink to={'/cuisine/Thai'}>
                <GiNoodles size={30}/>
                <h4>Thai</h4>
            </SLink>
            <SLink to={'/cuisine/Japanese'}>
                <GiChopsticks size={30}/>
                <h4>Japanese</h4>
            </SLink>
        </List>
    )
}

const List = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 2rem 0;
    @media (max-width: 800px) {
    /* flex-direction: column; */
    align-items: center;
    margin: 0;
  }
`

const SLink = styled(NavLink)`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    text-decoration: none;
    margin-right: 2rem;
    background: linear-gradient(35deg, #494949, #313131);
    width: 5rem;
    height: 5rem;
    cursor: pointer;
    transform: scale(.8);


    h4{
        color: white;
        font-size: .8rem;
    }

    svg{
        color: white;
        margin-top: .3rem;
    }
    &.active{
         background: linear-gradient(
        135deg, 
        rgba(102, 126, 234, 0.8) 0%, 
        rgba(118, 75, 162, 0.8) 100%
    );
    }
    &:hover{
       background: linear-gradient(
        135deg, 
        rgba(102, 126, 234, 0.8) 0%, 
        rgba(118, 75, 162, 0.8) 100%
    );
    }

    @media (max-width:800) {
    
    width: 3rem;
    height: 3rem;
    }
`

export default Catergory
