import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { ContentServers } from "../../components/ContentServers";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Modal } from "../../components/Modal";

function App() {
  const navigate = useNavigate();

  // var ws = new WebSocket("ws://localhost:8000/ws");
  var ws = new WebSocket(
    "wss://backend-hacktoon.onrender.com/ws",
    "echo-protocol"
  );

  const [awsServerStatus, setAwsServerStatus] = useState<any>([]);
  const [ociServerStatus, setOciServerStatus] = useState<any>([]);
  const [jiraServerStatus, setJiraServerStatus] = useState<any>([]);
  const [statusCurrentToast, setStatusCurrentToast] = useState<string>("");
  const [messageCurrentToast, setMessageCurrentToast] = useState<string>("");
  const [modificationOnServers, setModificationOnServers] = useState<boolean>();
  const [dataJson, setDataJson] = useState<any>();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [defaultEmail, setDefaultEmail] = useState<string>();

  useEffect(() => {
    if (dataJson) {
      const toasts: any[] = [];

      Object.keys(dataJson).forEach((key) => {
        const value = dataJson[key][0];
        if (value === "informational" || value === "degradation") {
          const parsedKey = key
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .toLowerCase();
          toasts.push({
            status: value,
            message: `O Servidor de ${parsedKey
              .split(".")
              .toString()
              .replace(",", "-")
              .toUpperCase()}, está com o status de ${
              value === "degradation" ? "Fora do Ar" : "Instável"
            }.`,
          });
        }
      });

      if (toasts.length > 0) {
        setModificationOnServers(true);

        toasts.forEach((toast, index) => {
          setTimeout(() => {
            setStatusCurrentToast(toast.status);
            setMessageCurrentToast(toast.message);
          }, index * 2000);
        });

        setTimeout(() => {
          setModificationOnServers(false);
          setStatusCurrentToast("");
          setMessageCurrentToast("");
        }, toasts.length * 1900);
      }
    }
  }, [dataJson]);

  const handleSendEmail = async (
    title: string,
    body: string,
    reciever: string
  ) => {
    try {
      await fetch("https://backend-hacktoon.onrender.com/sendemail", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          assunto: title,
          body: body,
          destinatario: reciever,
        }),
      });
    } catch {}
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    let aws = [];
    let oci = [];
    let jira = [];
    for (let i = 0; i < Object.keys(data).length; i++) {
      const key = Object.keys(data)[i].toString();
      let parsedKey = key.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
      if (parsedKey.startsWith("aws")) {
        let obj = {
          location:
            parsedKey.slice(3).replace(".", "").trim() == "sp"
              ? "São Paulo"
              : parsedKey.slice(3).replace(".", "").trim() == "vi"
              ? "Virgínia"
              : parsedKey.slice(3).replace(".", ""),
          status: data[key][0],
        };
        aws.push(obj);
        setAwsServerStatus(aws);
        if (
          data[key][0] == "degradation" &&
          sessionStorage.getItem("currentEmail")
        ) {
          handleSendEmail(
            parsedKey.split(".").toString().replace(",", "-").toUpperCase(),
            `O Servidro ${parsedKey
              .split(".")
              .toString()
              .replace(",", "-")
              .toUpperCase()}, está com status de ${data[key][0]}`,
            sessionStorage.getItem("currentEmail") ?? ""
          );
        }
        sessionStorage.setItem("awsList", JSON.stringify(aws));
      } else if (parsedKey.startsWith("oracle")) {
        let obj = {
          location:
            parsedKey.slice(6).replace(".", "").trim() == "sp"
              ? "São Paulo"
              : parsedKey.slice(6).replace(".", "").trim() == "vi"
              ? "Vinhedo"
              : parsedKey.slice(6).replace(".", ""),
          status: data[key][0],
        };
        oci.push(obj);
        setOciServerStatus(oci);
        if (data[key][0] == "degradation" && email) {
          handleSendEmail(
            parsedKey.split(".").toString().replace(",", "-").toUpperCase(),
            `O Servidro ${parsedKey
              .split(".")
              .toString()
              .replace(",", "-")
              .toUpperCase()}, está com status de ${data[key][0]}`,
            email ?? ""
          );
        }
        sessionStorage.setItem("ociList", JSON.stringify(oci));
      } else if (parsedKey.startsWith("jira")) {
        let obj = { location: "Jira", status: data[key][0] };
        jira.push(obj);
        setJiraServerStatus(jira);
        if (data[key][0] == "degradation" && email) {
          handleSendEmail(
            parsedKey.split(".").toString().replace(",", "-").toUpperCase(),
            `O Servidro ${parsedKey
              .split(".")
              .toString()
              .replace(",", "-")
              .toUpperCase()}, está com status de ${data[key][0]}`,
            email ?? ""
          );
        }
        sessionStorage.setItem("jiraList", JSON.stringify(jira));
      }
    }
    setDataJson(data);
  };

  useEffect(() => {
    if (
      sessionStorage.getItem("awsList")?.trim() != "" ||
      sessionStorage.getItem("awsList") != null
    ) {
      try {
        setAwsServerStatus(
          JSON.parse(sessionStorage.getItem("awsList") ?? "") ?? []
        );
      } catch {
        setAwsServerStatus([]);
      }
    }
  }, [sessionStorage.getItem("awsList")]);

  useEffect(() => {
    if (
      sessionStorage.getItem("ociList")?.trim() != "" ||
      sessionStorage.getItem("ociList") != null
    ) {
      try {
        setOciServerStatus(
          JSON.parse(sessionStorage.getItem("ociList") ?? "") ?? []
        );
      } catch {
        setOciServerStatus([]);
      }
    }
  }, [sessionStorage.getItem("ociList")]);

  useEffect(() => {
    if (
      sessionStorage.getItem("jiraList")?.trim() != "" ||
      sessionStorage.getItem("jiraList") != null
    ) {
      try {
        setJiraServerStatus(
          JSON.parse(sessionStorage.getItem("jiraList") ?? "") ?? []
        );
      } catch {
        setJiraServerStatus([]);
      }
    }
  }, [sessionStorage.getItem("jiraList")]);

  useEffect(() => {
    const isAwsListLoaded =
      sessionStorage.getItem("awsList")?.trim() !== "" &&
      sessionStorage.getItem("awsList") !== null;

    const isOciListLoaded =
      sessionStorage.getItem("ociList")?.trim() !== "" &&
      sessionStorage.getItem("ociList") !== null;

    const isJiraListLoaded =
      sessionStorage.getItem("jiraList")?.trim() !== "" &&
      sessionStorage.getItem("jiraList") !== null;

    if (
      !awsServerStatus ||
      !isAwsListLoaded ||
      !ociServerStatus ||
      !isOciListLoaded ||
      !jiraServerStatus ||
      !isJiraListLoaded
    ) {
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }, [
    awsServerStatus,
    ociServerStatus,
    jiraServerStatus,
    sessionStorage.getItem("awsList"),
    sessionStorage.getItem("ociList"),
    sessionStorage.getItem("jiraList"),
  ]);

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
      {modificationOnServers == true ? (
        <Alert
          style={{
            width: "fit-content",
            position: "absolute",
            right: "1rem",
            top: "1rem",
            fontSize: "1rem",
          }}
          severity={statusCurrentToast == "Fora do Ar" ? "warning" : "error"}
        >
          <AlertTitle style={{ fontSize: "1.4rem" }}>Problemas!</AlertTitle>
          {messageCurrentToast}
        </Alert>
      ) : null}
      <S.Title>Status dos Servidores</S.Title>
      <S.Wrapper>
        <ContentServers
          onClickEvent={() => {
            sessionStorage.setItem("currentInfo", "AWS");
            navigate("/detalhes");
          }}
          nameServer="AWS"
          listStatusInfo={
            awsServerStatus ??
            JSON.parse(sessionStorage.getItem("awsList") ?? "")
          }
        />
        <ContentServers
          onClickEvent={() => {
            sessionStorage.setItem("currentInfo", "OCI");
            navigate("/detalhes");
          }}
          nameServer="OCI"
          listStatusInfo={
            ociServerStatus ??
            JSON.parse(sessionStorage.getItem("ociList") ?? "")
          }
        />
        <ContentServers
          onClickEvent={() => {
            sessionStorage.setItem("currentInfo", "JIRA");
            navigate("/detalhes");
          }}
          nameServer="JIRA"
          listStatusInfo={
            jiraServerStatus ??
            JSON.parse(sessionStorage.getItem("jiraList") ?? "")
          }
        />
      </S.Wrapper>
      {/* <S.TextRecieveNotifications onClick={() => setShowModal(true)}>
        Clique aqui caso queira ser notificado por e-mail caso aconteça algum
        problema nos servidores
      </S.TextRecieveNotifications>

      <Modal open={showModal}>
        <S.ModalContent>
          <S.ModalTitle>
            Insira o e-mail que deseja receber notificações
          </S.ModalTitle>

          <S.SearchField
            label={"E-mail"}
            value={email}
            sx={{
              input: {
                color: "rgba(17, 199, 111, 1)",
                borderColor: "rgba(17, 199, 111, 1)",
                outlineColor: "rgba(17, 199, 111, 1)",
                ":focus": {
                  color: "rgba(17, 199, 111, 1)",
                  borderColor: "rgba(17, 199, 111, 1)",
                  outlineColor: "rgba(17, 199, 111, 1)",
                },
              },
            }}
            placeholder={"Inisira seu e-mail"}
            onChange={(email) => {
              setDefaultEmail(email.target.value);
            }}
          />

          <S.ModalButonsContent>
            <Button
              sx={{
                color: "rgba(17, 199, 111, 1)",
                borderColor: "rgba(17, 199, 111, 1)",
                ":hover": {
                  color: "rgba(17, 199, 111, 1)",
                  borderColor: "rgba(17, 199, 111, 1)",
                },
              }}
              variant="outlined"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              sx={{
                color: "rgba(17, 199, 111, 1)",
                borderColor: "rgba(17, 199, 111, 1)",
                ":hover": {
                  color: "rgba(17, 199, 111, 1)",
                  borderColor: "rgba(17, 199, 111, 1)",
                },
              }}
              variant="outlined"
              onClick={() => {
                sessionStorage.setItem("currentEmail", defaultEmail ?? "");
                setShowModal(false);
              }}
            >
              Confirmar
            </Button>
          </S.ModalButonsContent>
        </S.ModalContent>
      </Modal> */}
    </>
  );
}

export default App;
