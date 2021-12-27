import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  blue,
  blueGrey,
  green,
  grey,
  pink,
  red,
  yellow,
} from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImClock } from "react-icons/im";

import {
  faBookmark as fsBookmark,
  faThumbsUp as fsThumbsUp,
  faThumbsDown as fsThumbsDown,
  faClock as fsClock,
  faCheckCircle as fsCheckCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import {
  faThumbsUp as frThumbsUp,
  faBookmark as frBookmark,
  faThumbsDown as frThumbsDown,
  faClock as frClock,
  faCheckCircle as frCheckCircle,
} from "@fortawesome/free-regular-svg-icons";
import { BASE_URL } from "../../config/base";
import { putData } from "../modules/ApiData";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);

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
  width: 100%;
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  font-weight: 600;
`;

const InfoAction = styled.div`
  height: 100%;
  width: 100%;

  margin-bottom: 10px;
  display: flex;
  justify-content: center;
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

const InfoCheckDate = styled.div`
  width: 50%;
  height: 50px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClientIcon = (icon) => (
  <CheckIcon>
    <FontAwesomeIcon icon={icon} />
  </CheckIcon>
);

const CheckIconDate = styled.span`
  width: 20px;
  height: 20px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClientIconDate = (icon) => (
  <CheckIconDate>
    <FontAwesomeIcon icon={icon} />
  </CheckIconDate>
);

const DatePickerBox = styled(DatePicker)`
  width: 250px;
  padding: 10px;
  font-size: 15px;
  border: none;
  outline: none;
  text-decoration: line-through;
  text-decoration: ${(prop) => (prop.checked ? "line-through" : "none")};
`;
const BasicInfo = (props) => {
  const [propData, setPropData] = useState({});
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleLike = () => {
    setLike(!like);
  };

  const handleDisLike = () => {
    setDisLike(!disLike);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleDate = () => {
    setAlarm(!alarm);
  };

  const handleChecked = () => {
    setChecked(!checked);
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
        <InfoCheckBox>
          <Checkbox
            icon={ClientIcon(frClock)}
            checkedIcon={ClientIcon(fsClock)}
            checked={alarm}
            onClick={(e) => {
              e.preventDefault();
              handleDate();
            }}
            sx={{
              color: green[800],
              "&.Mui-checked": {
                color: green[800],
              },
            }}
          />
        </InfoCheckBox>
        {alarm && (
          <InfoCheckDate style={{ flexDirection: "row" }}>
            <DatePickerBox
              locale="ko"
              showTimeSelect
              timeFormat="p"
              timeIntervals={5}
              selected={startDate}
              dateFormat="yyyy년 MM월 dd일 EE요일 a hh:mm"
              onChange={(date) => setStartDate(date)}
              checked={checked}
            />

            <Checkbox
              icon={ClientIconDate(frCheckCircle)}
              checkedIcon={ClientIconDate(fsCheckCircle)}
              checked={checked}
              onClick={(e) => {
                e.preventDefault();
                handleChecked();
              }}
              sx={{
                color: blueGrey[800],
                "&.Mui-checked": {
                  color: blueGrey[800],
                },
              }}
            />
          </InfoCheckDate>
        )}
      </InfoAction>
    </InfoWrapper>
  );
};

export default BasicInfo;
