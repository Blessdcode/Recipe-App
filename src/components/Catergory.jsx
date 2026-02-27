import React from "react";
import { FaPizzaSlice, FaHamburger, FaHome } from "react-icons/fa";
import { GiNoodles, GiChopsticks, GiHotMeal, GiSushis } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Category = () => {
  return (
    <List>
      <SLink to={"/"} end>
        <IconWrap>
          <FaHome size={20} />
        </IconWrap>
        <span>Home</span>
      </SLink>
      <SLink to={"/cuisine/Italian"}>
        <IconWrap>
          <FaPizzaSlice size={20} />
        </IconWrap>
        <span>Italian</span>
      </SLink>
      <SLink to={"/cuisine/American"}>
        <IconWrap>
          <FaHamburger size={20} />
        </IconWrap>
        <span>American</span>
      </SLink>
      <SLink to={"/cuisine/Thai"}>
        <IconWrap>
          <GiNoodles size={20} />
        </IconWrap>
        <span>Thai</span>
      </SLink>
      <SLink to={"/cuisine/Japanese"}>
        <IconWrap>
          <GiSushis size={20} />
        </IconWrap>
        <span>Japanese</span>
      </SLink>
      <SLink to={"/cuisine/Chinese"}>
        <IconWrap>
          <GiChopsticks size={20} />
        </IconWrap>
        <span>Chinese</span>
      </SLink>
      <SLink to={"/cuisine/African"}>
        <IconWrap>
          <GiHotMeal size={20} />
        </IconWrap>
        <span>African</span>
      </SLink>
    </List>
  );
};

const List = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin: 1rem 0 2rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 0.5rem;
  }
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.06);
  transition: all var(--transition-normal);
  flex-shrink: 0;
`;

const SLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-pill);
  text-decoration: none;
  background: var(--bg-glass);
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: all var(--transition-normal);

  span {
    color: var(--text-secondary);
    font-size: 0.85rem;
    font-weight: 500;
    transition: color var(--transition-fast);
    white-space: nowrap;
  }

  svg {
    color: var(--text-secondary);
    transition: color var(--transition-fast);
  }

  &:hover {
    background: var(--bg-glass-hover);
    border-color: rgba(255, 255, 255, 0.12);
    transform: translateY(-2px);

    span {
      color: var(--text-primary);
    }
    svg {
      color: var(--accent-primary);
    }

    ${IconWrap} {
      background: rgba(249, 115, 22, 0.12);
    }
  }

  &.active {
    background: var(--accent-gradient-soft);
    border-color: rgba(249, 115, 22, 0.3);
    box-shadow: var(--accent-glow);

    span {
      color: var(--accent-primary);
      font-weight: 600;
    }
    svg {
      color: var(--accent-primary);
    }

    ${IconWrap} {
      background: rgba(249, 115, 22, 0.15);
    }
  }

  @media (max-width: 600px) {
    padding: 0.5rem 0.9rem;

    span {
      font-size: 0.78rem;
    }

    ${IconWrap} {
      width: 34px;
      height: 34px;
    }

    svg {
      font-size: 16px;
    }
  }
`;

export default Category;
