import React from "react";
import * as S from "./styles";
import { InfoStatus } from "../InfoStatus";
import VerifiedIcon from "@mui/icons-material/Verified";
import ErrorIcon from "@mui/icons-material/Error";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip, Zoom } from "@mui/material";

interface IContentServersProps {
  nameServer?: string;
  listStatusInfo: any[];
  onClickEvent?: () => void;
}

export const ContentServers = (props: IContentServersProps) => {
  return (
    <S.Wrapper onClick={props.onClickEvent}>
      <S.ServerName>
        {props.nameServer}
        {props.listStatusInfo.length == 0 ? (
          <Tooltip
            title={
              <span style={{ fontSize: "0.8rem" }}>
                Não foi possível obter informações desses servidores
              </span>
            }
            placement="top"
            arrow
            TransitionComponent={Zoom}
          >
            <InfoIcon fontSize="large" sx={{ color: "#0440ff" }} />
          </Tooltip>
        ) : props.listStatusInfo.every((item) => item.status == "resolved") ? (
          <Tooltip
            title={
              <span style={{ fontSize: "0.8rem" }}>
                Todos os servidores estão online
              </span>
            }
            placement="top"
            arrow
            TransitionComponent={Zoom}
          >
            <VerifiedIcon fontSize="large" sx={{ color: "#2cc930" }} />
          </Tooltip>
        ) : props.listStatusInfo.some(
            (item) => item.status == "degradation"
          ) ? (
          <Tooltip
            title={
              <span style={{ fontSize: "0.8rem" }}>
                Servidores estão offline
              </span>
            }
            placement="top"
            arrow
            TransitionComponent={Zoom}
          >
            <ErrorIcon fontSize="large" sx={{ color: "#c92c2c" }} />
          </Tooltip>
        ) : (
          <Tooltip
            title={
              <span style={{ fontSize: "0.8rem" }}>
                Não conseguimos obter informações desses servidores
              </span>
            }
            placement="top"
            arrow
            TransitionComponent={Zoom}
          >
            <HelpIcon fontSize="large" sx={{ color: "#e4c30d" }} />
          </Tooltip>
        )}
      </S.ServerName>
      {props.listStatusInfo.map((item) => (
        <InfoStatus
          key={item.location}
          status={item.status}
          location={item.location}
        />
      ))}
    </S.Wrapper>
  );
};
