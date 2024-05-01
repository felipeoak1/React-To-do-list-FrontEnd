import styled from "styled-components";

export const Container = styled.header`
  margin-top: 74px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputSearchContainer = styled.div`
  width: 100%;
  margin-top: 48px;

  input {
    width: 100%;
    height: 50px;
    background-color: #fff;
    border: none;
    border-radius: 25px;
    outline: 0;
    padding: 0 16px;
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.04);

    &::placeholder{
      color: #BCBCBC
    }
  }
`;
