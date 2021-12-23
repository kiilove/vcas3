import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { blue, grey, pink, yellow } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBookmark as fsBookmark,
  faThumbsUp as fsThumbsUp,
  faThumbsDown as fsThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

import {
  faThumbsUp as frThumbsUp,
  faBookmark as frBookmark,
  faThumbsDown as frThumbsDown,
} from "@fortawesome/free-regular-svg-icons";
import { BASE_URL } from "../../config/base";
import { putData } from "../modules/ApiData";

const InfoWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoNumber = styled.span`
  height: 100%;
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  font-weight: 600;
`;

const InfoAction = styled.div`
  height: 100%;
  width: 50%;

  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CheckIcon = styled.span`
  width: 30px;
  height: 30px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoCheckBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const ClientIcon = (icon) => (
  <CheckIcon>
    <FontAwesomeIcon icon={icon} />
  </CheckIcon>
);

const BasicInfo = (props) => {
  const [propData, setPropData] = useState({});
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  const handleDisLike = () => {
    setDisLike(!disLike);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  useEffect(() => {
    setPropData(() => {
      return props.basicInfo;
    });

    if (propData.clientStatus !== undefined || null) {
      setLike(propData.clientStatus.like);
      setDisLike(propData.clientStatus.dislike);
      setFavorite(propData.clientStatus.favorite);
    }
  }, [props]);

  useEffect(() => {
    if (propData.clientStatus !== undefined || null) {
      const basicObject = {
        ...propData,
        clientStatus: {
          ...propData.clientStatus,
          like: like,
          dislike: disLike,
          favorite: favorite,
        },
      };

      putData(basicObject, props.url);
    }
  }, [like, disLike, favorite]);

  return (
    <InfoWrapper>
      <InfoNumber>
        {disLike ? (
          <div style={{ textDecoration: "line-through", color: grey[400] }}>
            {propData.clientNumber}
          </div>
        ) : like ? (
          <div style={{ color: blue[800] }}>{propData.clientNumber}</div>
        ) : (
          propData.clientNumber
        )}
      </InfoNumber>

      <InfoAction>
        <InfoCheckBox>
          <Checkbox
            icon={ClientIcon(frThumbsUp)}
            checkedIcon={ClientIcon(fsThumbsUp)}
            checked={like}
            disabled={disLike}
            onClick={(e) => {
              e.preventDefault();
              handleLike({ like });
            }}
            sx={{
              color: blue[800],
              "&.Mui-checked": {
                color: blue[800],
              },
            }}
          />
        </InfoCheckBox>
        <InfoCheckBox>
          <Checkbox
            icon={ClientIcon(frThumbsDown)}
            checkedIcon={ClientIcon(fsThumbsDown)}
            checked={disLike}
            disabled={like}
            onClick={(e) => {
              e.preventDefault();
              handleDisLike();
            }}
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[800],
              },
            }}
          />
        </InfoCheckBox>
        <InfoCheckBox>
          <Checkbox
            icon={ClientIcon(frBookmark)}
            checkedIcon={ClientIcon(fsBookmark)}
            checked={favorite}
            onClick={(e) => {
              e.preventDefault();
              handleFavorite();
            }}
            sx={{
              color: yellow[800],
              "&.Mui-checked": {
                color: yellow[800],
              },
            }}
          />
        </InfoCheckBox>
      </InfoAction>
    </InfoWrapper>
  );
};

export default BasicInfo;
