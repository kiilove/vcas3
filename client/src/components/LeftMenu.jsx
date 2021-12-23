import {
  faCalendarAlt,
  faGraduationCap,
  faIdCard,
  faListUl,
  faPhone,
  faQuestion,
  faSearch,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #292f4d;
`;

const Wrapper = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const IconGroup = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const IconBox = styled.span`
  width: 45px;
  height: 45px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  margin: 5px 0px;

  &:hover {
    background-color: black;
    border-radius: 10px;
  }
`;

const LeftMenu = () => {
  return (
    <Container>
      <Wrapper>
        <IconGroup style={{ justifyContent: "flex-start" }}>
          <div
            style={{
              fontSize: "17px",
              fontWeight: 600,
              color: "white",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            VCAS
          </div>
          <Tooltip title="캘린더" placement="right">
            <IconBox>
              <FontAwesomeIcon icon={faCalendarAlt} />
            </IconBox>
          </Tooltip>
          <Tooltip title="상담업무" placement="right">
            <Link to="/marketingDetail">
              <IconBox>
                <FontAwesomeIcon icon={faPhone} />
              </IconBox>
            </Link>
          </Tooltip>
          <Tooltip title="고객정보" placement="right">
            <Link to="/clientList">
              <IconBox>
                <FontAwesomeIcon icon={faIdCard} />
              </IconBox>
            </Link>
          </Tooltip>
          <Tooltip title="할일" placement="right">
            <IconBox>
              <FontAwesomeIcon icon={faListUl} />
            </IconBox>
          </Tooltip>
          <Tooltip title="성과" placement="right">
            <IconBox>
              <FontAwesomeIcon icon={faGraduationCap} />
            </IconBox>
          </Tooltip>
        </IconGroup>
        <IconGroup style={{ justifyContent: "flex-end", marginBottom: "10px" }}>
          <Tooltip title="통합검색" placement="right">
            <Link to="/login">
              <IconBox>
                <FontAwesomeIcon icon={faSearch} />
              </IconBox>
            </Link>
          </Tooltip>
          <Tooltip title="자주하는 질물" placement="right">
            <Link to="/register">
              <IconBox>
                <FontAwesomeIcon icon={faQuestion} />
              </IconBox>
            </Link>
          </Tooltip>
          <Tooltip title="구성원관리" placement="right">
            <IconBox>
              <FontAwesomeIcon icon={faUsers} />
            </IconBox>
          </Tooltip>
        </IconGroup>
      </Wrapper>
    </Container>
  );
};

export default LeftMenu;
