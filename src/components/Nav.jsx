import React from "react";
import { GiCookingPot } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <NavBar>
      <Brand onClick={() => navigate("/")}>
        <LogoIcon>
          <GiCookingPot size={28} />
        </LogoIcon>
        <LogoText>Recipify</LogoText>
      </Brand>
    </NavBar>
  );
};

const NavBar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  margin-bottom: 0.5rem;
  background: rgba(15, 15, 26, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform var(--transition-fast);

  &:hover {
    transform: scale(1.03);
  }
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--accent-gradient);
  color: white;
  box-shadow: var(--accent-glow);
  transition: box-shadow var(--transition-normal);

  ${Brand}:hover & {
    box-shadow: 0 0 30px rgba(249, 115, 22, 0.5);
  }
`;

const LogoText = styled.h1`
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export default Nav;
