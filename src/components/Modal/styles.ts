import styled, { css } from "styled-components";
import { Box, Modal } from "@mui/material";

export const Wrapper = styled(Modal)(
  () => css`
    && {
      z-index: 1300;
    }
  `
);

export const Container = styled(Box)(
  ({ theme }) => css`
    && {
      left: 50%;
      min-width: 20rem;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  `
);
