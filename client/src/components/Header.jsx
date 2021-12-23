import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BlankBox = styled.div`
  width: 140px;
`;

const BlankBox2 = styled.div`
  width: 70px;
`;
const NoticeBox = styled.div`
  display: flex;

  align-items: center;
  justify-content: flex-start;
  text-align: left;
  flex: 1;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ActionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const BoltIcon = <FontAwesomeIcon icon={faBolt} />;

const Header = () => {
  return (
    <Container>
      <BlankBox />
      <NoticeBox>
        <TextBox>
          <Typography align="left" sx={{ width: "100%" }}>
            안녕하세요~ 김진배님.
          </Typography>
          <Typography variant="h6" sx={{ width: "100%" }}>
            현재 작업 현황을 알려드립니다.
          </Typography>
        </TextBox>
        <img
          src="/img/header-background-v2.svg"
          alt=""
          style={{ marginLeft: "10px" }}
        />
      </NoticeBox>

      <ActionBox>
        <Tooltip title="곧 추가될 기능입니다.">
          <Button
            variant="contained"
            disableElevation
            startIcon={BoltIcon}
            size="large"
          >
            빠른검색
          </Button>
        </Tooltip>
      </ActionBox>
      <BlankBox2 />
    </Container>
  );
};

export default Header;
