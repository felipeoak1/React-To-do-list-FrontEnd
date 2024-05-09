import styled, { css } from "styled-components";

export default styled.input`
  width: 100%;
  height: 52px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  /* Corrigindo Border */
  border: 2px solid white;
  border-radius: 4px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border 0.1s ease-in;
  appearance: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}

`;
