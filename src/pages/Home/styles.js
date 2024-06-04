import styled from "styled-components";

export const Container = styled.div`
  margin-top: 32px;
`;

export const InputSearchContainer = styled.div`
  width: 100%;

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
      color: ${({ theme }) => theme.colors.gray[200]}
    }
  }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: ${({ justifyContent }) => justifyContent};
    margin-top: 32px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
    padding-bottom: 16px;

  strong{
    font-size: 24px;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in;
    align-self: center;
    justify-self: center;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: #fff
    }
  }
`;

export const ListHeader = styled.header`
  margin-top: 24px;
  margin-bottom: 8px;

    button {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;

      span  {
        margin-right: 8px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary.main}
      }

      img {
        transform: ${({ orderBy }) => (orderBy === "ASC" ? "rotate(180deg)" : "rotate(0deg)")};
        transition: transform 0.2s ease-in;
      }
    }
`;

export const Card = styled.div`
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + &{
    margin-top: 16px;
  }

  .info{
    .task-name {
      display: flex;
      align-items: center;

      small {
        background-color: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        padding: 4px;
        border-radius: 4px;
        margin-left: 8px;
      }
    }

    span {
      display: block;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.primary.dark};
      margin-bottom: 10px;
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      background: transparent;
      border: none;
      margin-left: 8px;
    }
  }

`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;

  .details {
    margin-left: 24px;

    strong {
      font-size: 22px;
      color: ${({ theme }) => theme.colors.danger.main};
      display: block;
      margin-bottom: 8px;
    }
  }

`;

export const EmptyListContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    color: ${({ theme }) => theme.colors.gray[200]};
    text-align: center;
    margin-top: 8px;

    strong {
      color: ${({ theme }) => theme.colors.primary.main}
    }
  }
`;
// styles.js

export const CardContainer = styled.div`
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }
`;

export const Info = styled.div`
  .task-name {
    display: flex;
    align-items: center;

    strong {
      color: ${({ theme }) => theme.colors.primary.dark};
      font-size: 18px;
      margin-right: 8px;
    }

    small {
      background-color: ${({ theme }) => theme.colors.primary.lighter};
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: bold;
      text-transform: uppercase;
      padding: 4px;
      border-radius: 4px;
    }
  }
`;

export const TaskName = styled.div`
  margin-bottom: 10px;
  small {
        background-color: ${({ theme }) => theme.colors.primary.main};
        color: white;
        font-weight: bold;
        text-transform: capitalize;
        padding: 4px;
        border-radius: 4px;
        margin-left: 8px;
      }
`;

export const TaskDescription = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.dark};
  margin-bottom: 10px;
`;

export const TaskStatus = styled.div`
  // Se precisar de estilos adicionais para o status
`;

export const TaskDate = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;

  button {
    background: transparent;
    border: none;
    margin-left: 8px;
  }
`;
