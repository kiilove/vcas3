import { faIdCard, faPaste } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  border-radius: 5px;
  border: 0.5px solid ${grey[300]};
  width: 160px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 10px;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Icon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: white;
  color: ${grey[700]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const ClientCard = (props) => {
  return (
    <Container>
      <Typography variant="body1">{props.num}</Typography>
      <Info>
        <Tooltip title="상담업무 바로가기">
          <Link to={`/marketingDetail/${props.id}`}>
            <Icon>
              <FontAwesomeIcon icon={faIdCard} />
            </Icon>
          </Link>
        </Tooltip>
        <Tooltip title="복사하기">
          <Icon>
            <FontAwesomeIcon icon={faPaste} />
          </Icon>
        </Tooltip>
      </Info>
    </Container>
  );
};

export default ClientCard;
