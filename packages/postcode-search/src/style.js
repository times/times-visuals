import styled from "styled-components";
import { breakpoints } from "@times-visuals/styles";

export const Container = styled.div`
  form {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  input[type="search"] {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    border: 1px solid #dbdbdb;
    font-size: 1.6rem;
    line-height: 1.8rem;
    padding: 0.8rem 0.9rem;
    text-transform: uppercase;

    &::placeholder {
      text-transform: none;
    }
  }

  input[type="submit"] {
    margin: 0;
    min-width: 12rem;
    padding: 1.5rem 0.9rem 1rem;
    color: #fff !important;
    font-size: 1.2rem;
    font-family: "GillSansMTStd-Medium", "GillSans-Medium";
    text-transform: uppercase;
    border-radius: 0;
    background: #046798;
    box-shadow: none;
    -webkit-appearance: none;
    border: 0;

    &:hover,
    &:focus {
      background: #004e7f;
    }

    &:disabled {
      opacity: 0.7;
    }

    @media screen and (min-width: ${breakpoints.mobile}) {
      font-size: 1.6rem;
    }
  }
`;

export const Message = styled.p`
  text-align: center;
  color: #cc0000;
  display: block;
  margin: 0.5rem auto;
`;
