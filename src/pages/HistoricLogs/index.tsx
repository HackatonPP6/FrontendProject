import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { ContentServers } from "../../components/ContentServers";
import { GridColDef } from "@mui/x-data-grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Stack } from "@mui/material";

export const HistoricLogs = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl;

        if (sessionStorage.getItem("currentInfo")) {
          switch (sessionStorage.getItem("currentInfo")) {
            case "OCI":
              apiUrl =
                "https://backend-hacktoon.onrender.com/oracleentrypointjson";
              break;
            case "JIRA":
              apiUrl =
                "https://backend-hacktoon.onrender.com/jiraentrypointjson";
              break;
            case "AWS":
              apiUrl =
                "https://backend-hacktoon.onrender.com/awsentrypointjson";
              break;
            default:
              return;
          }

          const response = await fetch(apiUrl, {
            method: "GET",
          });

          const responseData = await response.json();

          console.log(responseData);
          sessionStorage.setItem(
            "currentServersInfo",
            JSON.stringify(responseData)
          );
        }
      } catch (error) {}
    };
    if (sessionStorage.getItem("currentServersInfo")) {
      console.log(sessionStorage.getItem("currentServersInfo"));
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("currentServersInfo")) {
      let list = JSON.parse(sessionStorage.getItem("currentServersInfo") ?? "");
      let lista = list.map((item: any) => ({
        location: item.service,
        status: item.status[0],
      }));
      setList(lista);
    }
  }, [sessionStorage.getItem("currentServersInfo")]);

  return (
    <>
      {showLoading && (
        <Stack
          sx={{
            backgroundColor: "rgba(80, 80, 80, 0.8)",
            color: "rgba(80, 80, 80, 0.8)",
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          spacing={2}
          direction="row"
        >
          <CircularProgress style={{ color: "rgba(17, 199, 111, 1)" }} />
        </Stack>
      )}
      <ArrowBackIcon
        onClick={() => navigate("..")}
        sx={{
          fontSize: "3.6rem",
          color: "#fff",
          position: "absolute",
          left: "2rem",
          top: "4rem",
          cursor: "pointer",
        }}
      />
      <S.Title>{sessionStorage.getItem("currentInfo")}</S.Title>
      <S.Wrapper>
        <ContentServers
          nameServer={sessionStorage.getItem("currentInfo") ?? ""}
          listStatusInfo={list}
        />
      </S.Wrapper>
    </>
  );
};
