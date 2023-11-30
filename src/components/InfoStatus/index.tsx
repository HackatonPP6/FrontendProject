import React from "react";
import * as S from "./styles";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";

interface IInfoStatusProps {
  location?: string;
  status?: string;
}

export const InfoStatus = (props: IInfoStatusProps) => {
  return (
    <Tooltip
      title={
        <span style={{ fontSize: "0.8rem" }}>
          {props.status == "resolved"
            ? "Ativo"
            : props.status == "degradation"
            ? "Fora do Ar"
            : "Instável"}
        </span>
      }
      placement="top"
      followCursor
      arrow
      TransitionComponent={Zoom}
    >
      <S.ChipStatus>
        <S.Location>{props.location}</S.Location>
        <S.StatusFeedback status={props.status} />
      </S.ChipStatus>
    </Tooltip>
  );
};
