import styled, { css } from "styled-components";

export const ServerName = styled.h2(
  () =>
    css`
      font-size: 2.4rem;
      text-align: center;
      margin-bottom: 2rem;
      padding-top: 2rem;
      letter-spacing: 0.1rem;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      text-transform: uppercase;
    `
);

export const Wrapper = styled.div(
  () =>
    css`
      cursor: pointer;
      background-color: #fff;
      border-radius: 0.8rem;
      padding-bottom: 2rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      -webkit-box-shadow: 0px 7px 23px -17px rgba(14, 14, 14, 1);
      -moz-box-shadow: 0px 7px 23px -17px rgba(14, 14, 14, 1);
      box-shadow: 0px 7px 23px -17px rgba(14, 14, 14, 1);
    `
);
