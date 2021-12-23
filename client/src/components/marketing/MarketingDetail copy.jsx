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
import BasicInfo from "./BasicInfo";
import ExtraInfo from "./ExtraInfo";
import MemoInput from "./MemoInput";
import TmMemoList from "./MemoList";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/base";
import { putData } from "../modules/PostData";
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
const MarketingDetail = ({ match }) => {
  const [getClients, setGetClients] = useState([]);
  const [basicInfo, setBasicInfo] = useState([]);
  const [extraInfo, setExtraInfo] = useState([]);
  const [memoList, setMemoList] = useState([]);
  const { uid } = useParams();

  const getData = async () => {
    const header = { "Content-type": "application/json" };
    try {
      const res = await axios({
        method: "get",
        url: `${BASE_URL}/api/client/find/${uid}`,
        headers: header,
      });

      setBasicInfo({
        clientNumber: res.data.clientNumber,
        clientStatus: res.data.clientStatus,
      });
      setExtraInfo({ ...res.data.clientExtra });
      setMemoList([...res.data.clientMemo]);
      setGetClients(res.data);
    } catch (err) {
      console.log(err);
      alert("불러오기 실패!");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updatedClient = () => {
    const items = { clientExtra: extraInfo, clientMemo: memoList };
    const url = `${BASE_URL}/api/client/find/${uid}`;
    //console.log(items);
    putData(items, url);
  };

  useEffect(() => {
    updatedClient();
  }, [extraInfo, memoList]);
  return (
    <Container>
      <CanvasCustom style={{ flex: 1, marginBottom: 20, height: "auto" }}>
        <ComponentHeaderWrapper>
          <ComponentHeaderTitle color={orange[500]}>
            상담 노트
          </ComponentHeaderTitle>

          <MarketingActionWrapper>
            <Button onClick={updatedClient}>저장</Button>
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
                <BasicInfo
                  setBasicInfo={setBasicInfo}
                  basicInfo={basicInfo}
                  uid={uid}
                />
              </CanvasCustom>
              <CanvasCustom style={{ height: "auto" }}>
                <ExtraInfo setExtraInfo={setExtraInfo} extraInfo={extraInfo} />
              </CanvasCustom>
            </Stack>
          </Grid>
          <Grid xs={5} item>
            <Stack direction="column" spacing={2}>
              <CanvasCustom style={{ height: "200px", padding: "10px" }}>
                <MemoInput
                  uid={uid}
                  memoCount={memoList.length}
                  memoList={memoList}
                  setMemoList={setMemoList}
                />
                {memoList.length}
              </CanvasCustom>
              <CanvasCustom style={{ height: "auto" }}>
                <TmMemoList uid={uid} memoList={memoList} />
              </CanvasCustom>
            </Stack>
          </Grid>
        </Grid>
      </ComponentBodyWrapper>
    </Container>
  );
};
export default MarketingDetail;
