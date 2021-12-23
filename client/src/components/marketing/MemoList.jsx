import React from "react";
import styled from "styled-components";
import { Divider, IconButton, Stack, TextField } from "@mui/material";
import { blueGrey, grey, yellow } from "@mui/material/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceOne, faSearch, faStar } from "@fortawesome/free-solid-svg-icons";

const MemoWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 160px;
  display: flex;
  flex-direction: column;
`;

const MemoActionBox = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const MemoItemBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
`;

const MemoItemsIcon = styled.span`
  display: flex;
  width: 100%;
  font-size: 10px;
  align-items: center;
  justify-content: flex-start;
  color: ${yellow[800]};
`;

const MemoItemsWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

const MemoItemsText = styled.span`
  text-align: left;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 15px;
  color: ${blueGrey[800]};
`;

const MemoPoint = [
  <MemoItemsIcon>
    <FontAwesomeIcon icon={faStar} />
  </MemoItemsIcon>,
  <MemoItemsIcon>
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
  </MemoItemsIcon>,
  <MemoItemsIcon>
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
  </MemoItemsIcon>,
  <MemoItemsIcon>
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
  </MemoItemsIcon>,
  <MemoItemsIcon>
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
  </MemoItemsIcon>,
];
const dummyMemo = [
  { id: 1, content: "2021-11-21 첫통화 예감 좋아", point: 3 },
  {
    id: 2,
    content: "2021-11-22 첫미팅 약속함(약속일자: 2021-11-30)",
    point: 5,
  },
  { id: 3, content: "2021-11-22 문자로 위치도 보냄", point: 2 },
  {
    id: 4,
    content: "2021-11-23 누군한테 뭔소리를 들었는지 느낌이 쎄해짐",
    point: 2,
  },

  { id: 7, content: "2021-11-25 아들이란놈 전화와서 지랄함", point: 1 },
  {
    id: 8,
    content: "2021-11-29 나가리 날뻔했는데 다시 얘기 되기 시작함. ",
    point: 4,
  },
  { id: 9, content: "2021-11-30 계약성공", point: 5 },
];

const MemoList = (props) => {
  //console.log(props.memoList[0]);
  return (
    <MemoWrapper>
      <Stack px={3} py={1} spacing={2}>
        <MemoActionBox>
          <TextField variant="standard" label="검색" sx={{ width: "85%" }} />
          <IconButton
            component="span"
            style={{ fontSize: 20, marginTop: 20, color: grey[500] }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </IconButton>
        </MemoActionBox>
        <MemoItemBox>
          {props.memoInfo.map((item, index) => (
            <>
              <MemoItemsWrapper key={index}>
                <MemoItemsIcon>{MemoPoint[item.score - 1]}</MemoItemsIcon>
                <MemoItemsText>{`${item.content}`}</MemoItemsText>
              </MemoItemsWrapper>
              {index < props.memoInfo.length - 1 && index !== 0 && (
                <Divider
                  style={{ width: "90%" }}
                  sx={{ bgcolor: blueGrey[100] }}
                />
              )}
            </>
          ))}
        </MemoItemBox>
      </Stack>
    </MemoWrapper>
  );
};

export default MemoList;
