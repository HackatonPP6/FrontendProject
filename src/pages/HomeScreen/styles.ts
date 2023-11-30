import { TextField } from "@mui/material";
import styled, { css } from "styled-components";

export const Title = styled.h1(
  () => css`
    font-size: 3.6rem;
    text-align: center;
    padding-top: 4rem;
    letter-spacing: 0.1rem;
    color: #fff;
  `
);

export const Wrapper = styled.div(
  () => css`
    z-index: 1000;
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    padding-left: 14rem;
    padding-top: 12rem;
    padding-bottom: 12rem;
    padding-right: 14rem;
    justify-content: center;
    gap: 1.2rem;

    @media screen and (max-width: 880px) {
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(1, 1fr);
    }
  `
);

export const TextRecieveNotifications = styled.span(
  () => css`
    color: #fff;
    font-size: 1.2rem;
    text-decoration: underline;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `
);

export type IItemProps = {
  selected?: boolean;
};

export const ModalContent = styled.div(
  () => css`
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 3rem;
    width: 54.2rem;
  `
);

export const ModalTitle = styled.h1(
  () => css`
    font-size: 2.4rem;
    font-weight: 700;
    text-align: center;
    line-height: 2.4rem;
    margin-bottom: 2.6rem;
  `
);

export const SearchField = styled(TextField)(
  () => css`
    && {
      margin-bottom: 1.5rem;
      width: 100%;

      .MuiSvgIcon-root {
        height: 2rem;
        width: 2rem;
      }

      .MuiOutlinedInput-input {
        color: rgba(17, 199, 111, 1);
        font-size: 1.6rem;
      }
    }
  `
);

export const ModalButonsContent = styled.div(
  () => css`
    align-items: center;
    display: flex;
    gap: 1rem;
    justify-content: end;
    margin-top: 7.7rem;
  `
);
