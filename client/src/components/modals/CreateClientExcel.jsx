import React, { useState } from "react";
import * as XLSX from "xlsx";

import styled from "styled-components";
import {
  Canvas,
  CloseButton,
  CloseWrapper,
  ComponentBodyWrapper,
  ComponentHeaderTitle,
  ComponentHeaderWrapper,
} from "../styles/Common";
import { green, grey, yellow } from "@mui/material/colors";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@mui/material";
import { BASE_URL } from "../../config/base";
import { postData } from "../modules/ApiData";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 460px;
  max-height: 100%;
`;

const CreateWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  min-height: 60px;
`;

const CreateInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0px 20px;
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  justify-content: space-between;
  align-items: center;
`;

const WarningWrapper = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
`;

const WarningMessage = styled.span`
  display: flex;
  background-color: ${yellow[300]};
  border-radius: 5px;
  color: ${grey[700]};
  font-size: 12px;
  font-weight: 600;
  padding-left: 20px;
  align-items: center;
  height: 100%;
`;

const CreateClientExcel = (props) => {
  const [items, setItems] = useState([]);
  const [rows, setRows] = useState(0);
  const [sendDisable, setSendDisable] = useState(true);
  const urlExcel = `${BASE_URL}/api/client/register/clients`;

  const sendClose = () => {
    props.handleClose();
  };

  const readExcel = async (file) => {
    try {
      const fileReader = await new FileReader();
      await fileReader.readAsArrayBuffer(file);

      fileReader.onload = async (e) => {
        const buggerArray = await e.target.result;

        const wb = await XLSX.read(buggerArray, { type: "binary" });
        const wsname = await wb.SheetNames[0];
        const ws = await wb.Sheets[wsname];

        let data = await XLSX.utils.sheet_to_json(ws, {
          header: ["clientNumber"],
        });
        if (isNaN(Object.values(data[0]))) {
          delete data[0];
        }

        //console.log(JSON.stringify(data.filter((x) => x !== null)));
        setRows(data.length);
        setItems(JSON.stringify(data.filter((x) => x !== null)));
      };
    } catch (error) {
      console.error({ 읽기에러: error });
    }
  };

  return (
    <Container>
      <Canvas style={{ paddingTop: "0px" }}>
        <CloseWrapper>
          <Tooltip title="닫기">
            <CloseButton
              src="/img/windowClose.png"
              onClick={() => sendClose()}
            />
          </Tooltip>
        </CloseWrapper>
        <ComponentHeaderWrapper style={{ paddingBottom: "0px" }}>
          <ComponentHeaderTitle color={green[500]}>
            엑셀 고객 등록{rows}
          </ComponentHeaderTitle>
        </ComponentHeaderWrapper>
        <WarningWrapper>
          <WarningMessage>
            <FontAwesomeIcon icon={faExclamationCircle} />
            <div style={{ marginLeft: 12 }}>
              첫번째 행부터 전화번호만 입력된 엑셀파일을 선택하세요
            </div>
          </WarningMessage>
        </WarningWrapper>
        <ComponentBodyWrapper style={{ flexDirection: "column" }}>
          <CreateWrapper>
            <CreateInput>
              <input
                type="file"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={(e) => {
                  const file = e.target.files[0];
                  file && setSendDisable(false);
                  readExcel(file);
                }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  postData(items, urlExcel);
                }}
                disabled={sendDisable}
                color="success"
                disableElevation
              >
                전송
              </Button>
            </CreateInput>
          </CreateWrapper>
        </ComponentBodyWrapper>
      </Canvas>
    </Container>
  );
};

export default CreateClientExcel;
