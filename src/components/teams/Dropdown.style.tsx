import styled, { css } from "styled-components"

export const DropdownHeaderStyled = styled.div<{ $open: Boolean; $isMobile: Boolean }>`
  display: flex;
  align-items: center;

  & > svg {
    transform: ${({ $open }) => `rotate(${$open ? 180 : 0}deg)`};
  }

  & > span {
    font-size: 21px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-right: auto;

    sup {
      font-weight: normal;
      padding-left: 8px;
      font-size: 14px;
      color: #6b6b6b;
      letter-spacing: 0;
    }
  }

  ${({ $isMobile }) => $isMobile ? css`
    &:hover {
      filter: opacity(.5);
      cursor: pointer;
    }
  ` : css`
    & > svg:hover {
      filter: opacity(.5);
      cursor: pointer;
    }
  `}
`

export const WarningWrapperStyled = styled.div`
  position: relative;
  display: flex;

  svg {
    opacity: .75;
  }

  span {
    visibility: hidden;
    pointer-events: none;
  }

  svg:hover + span {
    visibility: visible;
  }
`

export const WarningTextStyled = styled.span`
  position: absolute;
  right: 0;
  background-color: #ffb6b6;
  padding: 0 8px;
  z-index: 1;
  border-radius: 3px;
  text-wrap: nowrap;
`

export const DropdownWrapperStyled = styled.div`
  border-left: 1px solid gray;
  border-bottom: 1px solid gray;
  border-bottom-left-radius: 8px;
  padding: 4px 12px;
`

export const DropdownContentStyled = styled.div<{ $open: Boolean }>`
  display: flex;
  flex-direction: column;
  max-height: ${({ $open }) => $open ? 'unset' : 0};
  overflow: hidden;
  padding-bottom: ${({ $open }) => $open && '16px'};

  h2 {
    margin: 0;
    font-size: 18px;
  }

  ul {
    margin: 0;
  }
`

export const EmployeeStyled = styled.li<{ $employed: Boolean }>`
  color: ${({ $employed }) => $employed ? 'black' : '#c91f1f'};
`

export const ChildTeamWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 12px;
`
