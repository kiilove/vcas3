import { faIdCard, faPaste } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, Typography } from "@mui/material";
import { blue, grey, orange, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { faBookmark as fsBookmark } from "@fortawesome/free-solid-svg-icons";

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

const CheckIcon = styled.span`
  width: 20px;
  height: 20px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClientIcon = (icon) => (
  <CheckIcon>
    <FontAwesomeIcon icon={icon} />
  </CheckIcon>
);
const ClientCard = (props) => {
  const [styles, setStyles] = useState({});

  useEffect(() => {
    if (props.status && props.status.like) {
      setStyles({
        color: blue[800],
        fontWeight: 600,
      });
    } else if (props.status && props.status.dislike) {
      setStyles({
        textDecoration: "line-through",
        color: grey[400],
        fontWeight: 600,
      });
    }
  }, []);

  return (
    <Container>
      {props.status && props.status.favorite && (
        <div style={{ color: yellow[800], marginRight: "10px" }}>
          {ClientIcon(fsBookmark)}
        </div>
      )}

      <Typography variant="body1" style={styles}>
        {props.num}
      </Typography>

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
