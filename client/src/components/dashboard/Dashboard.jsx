import { Grid } from "@mui/material";
import { indigo } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../../config/base";
import {
  CanvasCustom,
  Canvas,
  ComponentBodyWrapper,
  ComponentHeaderTitle,
  ComponentHeaderWrapper,
} from "../styles/Common";
import ClientList from "./ClientList";
import TodoList from "./TodoList";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Dashboard = () => {
  const [getClients, setGetClients] = useState([]);
  const [newClients, setNewClients] = useState([]);
  const [ingClients, setIngClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const header = { "Content-type": "application/json" };
    try {
      const res = await axios({
        method: "get",
        url: `${BASE_URL}/api/client/`,
        headers: header,
      });
      setGetClients(res.data);
      setNewClients(
        res.data
          .filter(
            (item) =>
              item.clientStatus.like === false &&
              item.clientStatus.dislike === false &&
              item.clientStatus.favorite === false
          )
          .slice(0, 12)
      );

      setIngClients(
        res.data
          .filter(
            (item) =>
              item.clientStatus.like === true ||
              item.clientStatus.favorite === true ||
              item.clientMemo.length > 0
          )
          .slice(0, 12)
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(newClients);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <CanvasCustom>
            <ClientList
              title={"새로 등록된 고객"}
              subTitle={"최근에 등록된 고객 명부입니다."}
              items={newClients}
            />
          </CanvasCustom>
        </Grid>
        <Grid item xs={12} md={4}>
          <CanvasCustom>
            <ClientList
              title={"상담 진행중 고객"}
              subTitle={"좋아요, 북마크, 메모등록한 고객 명부입니다."}
              items={ingClients}
            />
          </CanvasCustom>
        </Grid>
        <Grid item xs={12} md={4}>
          <CanvasCustom>
            <TodoList
              title={"할일 목록"}
              subTitle={"고객과의 약속 일정등 목록입니다."}
            />
          </CanvasCustom>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
