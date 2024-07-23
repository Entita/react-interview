import styled from "styled-components"

export const TeamEditWrapperStyled = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`

export const EditWrapperStyled = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;

  & > svg {
    font-size: 31px;
    cursor: pointer;
  }

  & > svg:hover {
    filter: opacity(.6);
  }

  & > div {
    width: 100%;
  }
`

export const TeamButtonStyled = styled.button`
  position: relative;
  background-color: unset;
  border: 1px solid black;
  padding: 6px 12px;
  font-size: 18px;
  width: calc(calc(100% / 3) - 11px);
  border-radius: 0 36px 0 36px;
  min-width: 200px;
  overflow: hidden;
  z-index: 0;
  cursor: pointer;

  &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: #e6e6e6;
      transition: transform .6s ease 0s;
      transform: rotateX(90deg);
      border-radius: 0 36px 0 36px;
      z-index: -1;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: #e6e6e6;
      transition: transform .6s ease 0s;
      transform: rotateY(90deg);
      border-radius: 0 36px 0 36px;
      z-index: -1;
    }

    &:hover::before {
      transform: rotateX(0deg);
    }

    &:hover::after {
      transform: rotateY(0deg);
    }

  &:nth-child(2) {
    border-radius: 36px 36px 0 0;
    &::before { border-radius: 36px 36px 0 0; }
    &::after { border-radius: 36px 36px 0 0; }
  }

  &:nth-child(3) {
    border-radius: 36px 0 36px 0;
    &::before { border-radius: 36px 0 36px 0; }
    &::after { border-radius: 36px 0 36px 0; }
  }

  @media (max-width: 680px) {
    width: 100%;
    border-radius: 36px 36px 0 0;
    &::before { border-radius: 36px 36px 0 0; }
    &::after { border-radius: 36px 36px 0 0; }

    &:nth-child(2) {
      border-radius: 0;
      &::before { border-radius: 0; }
      &::after { border-radius: 0; }
    }

    &:nth-child(3) {
      border-radius: 0 0 36px 36px;
      &::before { border-radius: 0 0 36px 36px; }
      &::after { border-radius: 0 0 36px 36px; }
    }
  }
`
