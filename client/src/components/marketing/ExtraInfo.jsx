import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { FormHelperText, Input, Stack, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { putData } from "../modules/ApiData";

const ExtraWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: space-around;
  justify-content: space-around;
  padding-bottom: 20px;
`;
const ExtraSelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ExtraInfo = (props) => {
  const [propData, setPropData] = useState({});

  const handleInput = (e) => {
    //console.log("ㅜㅜ");
    e.preventDefault();
    setPropData({
      clientExtra: { ...propData.clientExtra, [e.target.id]: e.target.value },
    });
  };

  useEffect(() => {
    setPropData(props.extraInfo);
  }, [props]);

  useEffect(() => {
    if (propData.clientExtra) {
      putData(propData, props.url);
    }
  }, [propData]);

  return (
    <ExtraWrapper>
      <Stack
        direction="row"
        justifyContent="space-around"
        spacing={2}
        height="100px"
        sx={{ mt: 2, mb: 2 }}
        component="form"
      >
        <ExtraSelectBox>
          <FormControl>
            <InputLabel variant="standard">성별</InputLabel>
            <NativeSelect
              inputProps={{
                name: "gender",
                id: "gender",
              }}
              sx={{ fontSize: 17 }}
              value={
                (propData.clientExtra && propData.clientExtra.gender) || "M"
              }
              onChange={(e) => handleInput(e)}
            >
              <option value={"M"}>남성</option>
              <option value={"F"}>여성</option>
            </NativeSelect>
          </FormControl>
        </ExtraSelectBox>
        <ExtraSelectBox>
          <FormControl>
            <InputLabel variant="standard">연령대</InputLabel>
            <NativeSelect
              inputProps={{
                name: "age",
                id: "age",
              }}
              sx={{ fontSize: 17 }}
              value={(propData.clientExtra && propData.clientExtra.age) || 30}
              onChange={(e) => handleInput(e)}
            >
              <option value={20}>20대</option>
              <option value={30}>30대</option>
              <option value={40}>40대</option>
              <option value={50}>50대</option>
              <option value={60}>60대</option>
              <option value={70}>70대이상</option>
            </NativeSelect>
          </FormControl>
        </ExtraSelectBox>
        <ExtraSelectBox>
          <FormControl>
            <InputLabel variant="standard">투자경험</InputLabel>
            <NativeSelect
              inputProps={{
                name: "level",
                id: "level",
              }}
              sx={{ fontSize: 17 }}
              value={(propData.clientExtra && propData.clientExtra.level) || 0}
              onChange={(e) => handleInput(e)}
            >
              <option value={0}>파악안됨</option>
              <option value={1}>경험없음</option>
              <option value={2}>경험있음</option>
              <option value={3}>전문가수준</option>
              <option value={4}>업자</option>
            </NativeSelect>
          </FormControl>
        </ExtraSelectBox>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent="center"
        alignItems="center"
        width="100%"
        sx={{ mb: 3 }}
      >
        <TextField
          id="name"
          size="small"
          label="이름"
          sx={{ width: "85%" }}
          InputLabelProps={{ shrink: true }}
          value={(propData.clientExtra && propData.clientExtra.name) || ""}
          onChange={(e) => handleInput(e)}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        width="100%"
        sx={{ mb: 3 }}
        component="form"
      >
        <TextField
          id="telNum2"
          size="small"
          label="추가연락처"
          sx={{ width: "85%" }}
          InputLabelProps={{ shrink: true }}
          value={(propData.clientExtra && propData.clientExtra.telNum2) || ""}
          onChange={(e) => handleInput(e)}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        width="100%"
        sx={{ mb: 3 }}
        component="form"
      >
        <TextField
          id="info1"
          size="small"
          label="기타정보"
          sx={{ width: "85%" }}
          InputLabelProps={{ shrink: true }}
          value={(propData.clientExtra && propData.clientExtra.info1) || ""}
          onChange={(e) => handleInput(e)}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        width="100%"
        sx={{ mb: 3 }}
        component="form"
      >
        <TextField
          id="info2"
          size="small"
          label="기타정보"
          sx={{ width: "85%" }}
          InputLabelProps={{ shrink: true }}
          value={(propData.clientExtra && propData.clientExtra.info2) || ""}
          onChange={(e) => handleInput(e)}
        />
      </Stack>
    </ExtraWrapper>
  );
};

export default ExtraInfo;
