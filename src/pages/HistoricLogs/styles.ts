import styled, { css } from "styled-components";
import { DataGrid } from "@mui/x-data-grid";

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
      margin: auto;
      width: 45%;
      display: grid;
      flex-wrap: wrap;
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: 1fr;
      grid-column-gap: 0px;l
      grid-row-gap: 0px;
      padding-left: 14rem;
      padding-top: 8rem;
      align-items: center;
      padding-right: 14rem;
      justify-content: center;
      gap: 1.2rem;
  
      @media screen and (max-width: 880px) {
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(1, 1fr);
      }
   `
);

export const HistoricTable = styled(DataGrid)(
  () => css`
    width: 100%;
    max-height: 100rem;

    & * {
      background-color: #fff;
    }
  `
);

export const WrapperTable = styled.div(
  () => css`
    z-index: 1;
    margin: auto;
    width: 40%;
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    padding-left: 14rem;
    padding-top: 8rem;
    align-items: center;
    padding-right: 14rem;
    justify-content: center;
    gap: 1.2rem;

    .MuiDataGrid-main {
      box-shadow: 0 0.1rem 0.4rem rgb(0 0 0 / 25%);
      overflow: auto;
      width: 100%;
      .Mui-selected {
        background-color: transparent;
      }
      .MuiDataGrid-columnHeaders + div {
        height: auto !important;
      }

      .MuiDataGrid-virtualScroller {
        max-height: calc(100vh - 596px) !important;
        overflow-y: auto !important;
        overflow-x: hidden;
      }
    }

    .MuiDataGrid-columnHeaders {
      font-size: 1.2rem;
      .MuiDataGrid-columnHeader {
        min-width: 10rem !important;
        max-width: 10rem !important;
      }
      & + div {
        height: auto !important;
      }
    }

    .MuiDataGrid-footerContainer {
      box-shadow: 0 0.4rem 0.4rem rgb(0 0 0 / 25%);
      position: relative;
      background: white;
    }

    .MuiDataGrid-selectedRowCount {
      visibility: hidden;
    }

    .MuiDataGrid-cell {
      min-width: 10rem !important;
      max-width: 10rem !important;
    }

    .MuiDataGrid-cellContent {
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 1rem;
    }
  `
);
