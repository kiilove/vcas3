import styled from "styled-components";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { Button, IconButton, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose as frWindowClose } from "@fortawesome/free-regular-svg-icons";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 200px;
  background-color: white;
  border: 1px solid #000;
  box-shadow: 24px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 10px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 2px solid grey;
`;

const BodyWrapper = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid grey;
`;

const HeaderTitle = styled.span`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
`;

const HeaderAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const InfoTitle = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
`;

const ButtonGroup = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ImportExcel = (props) => {
  const [items, setItems] = useState([]);
  const [rows, setRows] = useState(0);

  const sendClose = () => {
    props.handleClose();
  };

  function renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
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
        //console.log(XLSX.utils.sheet_to_json([{ A: "1" }]));
        //data.forEach((obj) => renameKey(obj, "전화번호", "clientNumber"));
        //console.log(data.keys());
        // if (JSON.stringify(!isNaN(Object.values(data[1])))) {
        //   alert("전화번호만 입력되어 있어야합니다.");
        // } else {
        //   console.log(JSON.stringify(data));
        //   setRows(data.length);
        //   setItems(JSON.stringify(data));
        // }

        //alert(Object.values(data[0]));
        if (isNaN(Object.values(data[0]))) {
          delete data[0];
        }
        console.log(JSON.stringify(data.filter((x) => x !== null)));
        data && setRows(data.length);
        data && setItems(JSON.stringify(data));
      };
    } catch (error) {
      console.error({ 읽기에러: error });
    }
  };

  const postData = async () => {
    const header = { "Content-type": "application/json" };
    try {
      await axios({
        method: "post",
        url: "http://localhost:7733/api/client/register/excel",
        headers: header,
        data: items,
      });
      alert("데이터 저장이 완료되었습니다.");
    } catch (error) {
      alert("저장 실패!(서버 연결을 확인하세요.)");
    }
  };

  return (
    <Container>
      <Wrapper>
        <HeaderWrapper>
          <HeaderTitle>전송할 엑셀파일을 선택하세요.</HeaderTitle>
          <HeaderAction>
            <IconButton sx={{ fontSize: "18px" }} onClick={() => sendClose()}>
              <FontAwesomeIcon icon={frWindowClose} />
            </IconButton>
          </HeaderAction>
        </HeaderWrapper>
        <BodyWrapper>
          <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
          />
          <ButtonGroup>
            <Button variant="outlined" size="small" onClick={postData}>
              전송
            </Button>
          </ButtonGroup>
        </BodyWrapper>
        <FooterWrapper>
          <InfoTitle>
            {rows <= 0
              ? "올바른 엑셀파일은 선택해주세요."
              : `${rows - 1}건의 데이터를 읽어왔습니다.`}
          </InfoTitle>
        </FooterWrapper>
      </Wrapper>
    </Container>
  );
};

export default ImportExcel;
