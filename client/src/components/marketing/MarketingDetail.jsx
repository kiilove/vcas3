import { Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ClientCard from "../clients/ClientCard";
import {
  CanvasCustom,
  ComponentBodyWrapper,
  ComponentHeaderTitle,
  ComponentHeaderWrapper,
} from "../styles/Common";

import axios from "axios";
import BasicInfo from "./BasicInfo";
import ExtraInfo from "./ExtraInfo";
import MemoInput from "./MemoInput";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config/base";
import { getData, putData } from "../modules/ApiData";
import MemoList from "./MemoList";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: center;
`;

const SubTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100%;
  font-size: 19px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
`;

const MarketingActionWrapper = styled.div`
  height: 50px;
  width: 100%;
  margin: 5px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const MarketingActionBox = styled.div`
  height: 50px;
  width: 100%;
  margin: 5px 0px;
  display: flex;
  align-items: center;
  flex: 1;
`;
const MarketingDetail = () => {
  const [basicInfo, setBasicInfo] = useState({});
  const [extraInfo, setExtraInfo] = useState({});
  const [memoInfo, setMemoInfo] = useState([]);
  const { uid } = useParams();
  const URL = `${BASE_URL}/api/client/find/${uid}`;

  useEffect(() => {
    getData(URL).then((res) => {
      setBasicInfo(() => {
        return {
          clientNumber: res.clientNumber,
          clientStatus: res.clientStatus,
        };
      });
      setExtraInfo(() => {
        return {
          clientExtra: res.clientExtra,
        };
      });
      setMemoInfo([...res.clientMemo]);
    });
  }, []);

  useEffect(() => {
    if (memoInfo) {
      putData({ clientMemo: memoInfo }, URL);
    }
  }, [memoInfo]);

  return (
    <Container>
      <CanvasCustom style={{ flex: 1, marginBottom: 20, height: "auto" }}>
        <ComponentHeaderWrapper>
          <ComponentHeaderTitle color={orange[500]}>
            상담 노트
          </ComponentHeaderTitle>

          <MarketingActionWrapper>
            <Button variant="contained" disableElevation>
              저장
            </Button>
          </MarketingActionWrapper>
        </ComponentHeaderWrapper>
      </CanvasCustom>
      <ComponentBodyWrapper style={{ border: "none", height: "auto" }}>
        <Grid container spacing={5} justifyContent="space-around" padding={0}>
          <Grid xs={2} item>
            <CanvasCustom>
              <SubTitle>상담 대기</SubTitle>
              <div style={{ width: "100%" }}>
                <Divider />
              </div>
              <ListWrapper>
                <ClientCard />
              </ListWrapper>
            </CanvasCustom>
          </Grid>
          <Grid xs={5} item>
            <Stack direction="column" spacing={2}>
              <CanvasCustom style={{ height: "200px" }}>
                {basicInfo ? (
                  <BasicInfo basicInfo={basicInfo} url={URL} />
                ) : (
                  <BasicInfo />
                )}
              </CanvasCustom>
              <CanvasCustom style={{ height: "auto" }}>
                {extraInfo ? (
                  <ExtraInfo extraInfo={extraInfo} url={URL} />
                ) : (
                  <ExtraInfo />
                )}
              </CanvasCustom>
            </Stack>
          </Grid>
          <Grid xs={5} item>
            <Stack direction="column" spacing={2}>
              <CanvasCustom style={{ height: "200px", padding: "10px" }}>
                {memoInfo ? (
                  <MemoInput
                    memoInfo={memoInfo}
                    setMemoInfo={setMemoInfo}
                    memoCount={memoInfo.length}
                  />
                ) : (
                  <MemoInput memoCount={0} />
                )}
              </CanvasCustom>
              <CanvasCustom style={{ height: "auto" }}>
                {memoInfo ? <MemoList memoInfo={memoInfo} /> : <MemoList />}
              </CanvasCustom>
            </Stack>
          </Grid>
        </Grid>
      </ComponentBodyWrapper>
    </Container>
  );
};
export default MarketingDetail;
