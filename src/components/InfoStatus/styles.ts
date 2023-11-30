import styled, { css, keyframes } from "styled-components";
import { Box } from "@mui/material";

interface IStatusFeedbackProps {
  status?: string;
}

export const ChipStatus = styled(Box)(
  () => css`
    display: flex;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    justify-content: space-between;
    gap: 1.5rem;
    align-items: center;
    width: 100%;
    cursor: pointer;

    &:nth-child(2n) {
      background-color: #fbfbfb;
    }
  `
);

export const Location = styled.span(
  () => css`
    font-size: 1.4rem;
    padding-left: 2.5rem;
    text-transform: capitalize;
  `
);

const pulsate = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.1);
    opacity: 1.3;
  }
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
`;

export const StatusFeedback = styled.div<IStatusFeedbackProps>(
  ({ status }) => css`
    width: 1rem;
    height: 1rem;
    position: relative;
    right: 2.5rem;
    border-radius: 100%;
    border: 2px solid
      ${status === "resolved"
        ? "#80de82"
        : status === "degradation"
        ? "#de8080"
        : status === "informational"
        ? "#ffec84"
        : "transparent"};
    background: ${status === "resolved"
      ? "#2cc930"
      : status === "degradation"
      ? "#c92c2c"
      : status === "informational"
      ? "#e4c30d"
      : "transparent"};
    animation: ${pulsate} 1.5s infinite;
  `
);
