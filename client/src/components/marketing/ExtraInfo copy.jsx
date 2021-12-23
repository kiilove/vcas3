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
  const [propData, setPropData] = useState(props.extraInfo);
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [level, setLevel] = useState();
  const [name, setName] = useState();
  const [telNum2, setTelNum2] = useState();
  const [info1, setInfo1] = useState();
  const [info2, setInfo2] = useState();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setPropData(() => {
      return props.extraInfo;
    });

    if (propData !== undefined || null) {
      setGender(propData.gender);
      setAge(propData.age);
      setLevel(propData.level);
      setName(propData.name);
      setTelNum2(propData.telNum2);
      setInfo1(propData.info1);
      setInfo2(propData.info2);
      console.log(propData);
    }

    //console.log(propData);
  }, [props]);

  useEffect(() => {
    if (propData !== undefined || null) {
      const extraObject = {
        clientExtra: {
          ...propData.extraInfo,
          gender,
          age,
          level,
          name,
          telNum2,
          info1,
          info2,
        },
      };

      console.log(extraObject);
      console.log(isEdit);

      putData(extraObject, props.putUrl);
    }
  }, [isEdit]);
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
              value={gender}
              inputProps={{
                name: "gender",
                id: "gender-native",
              }}
              sx={{ fontSize: 17 }}
              onClick={() => {
                setIsEdit(() => !isEdit);
              }}
              onChange={(e) => {
                e.preventDefault();
                setGender(e.target.value);
              }}
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
              value={age}
              inputProps={{
                name: "age",
                id: "age-native",
              }}
              sx={{ fontSize: 17 }}
              onClick={() => {
                setIsEdit(() => !isEdit);
              }}
              onChange={(e) => {
                e.preventDefault();
                setAge(() => e.target.value);
              }}
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
              value={level}
              inputProps={{
                name: "know",
                id: "know-native",
              }}
              sx={{ fontSize: 17 }}
              onClick={() => {
                setIsEdit(() => !isEdit);
              }}
              onChange={(e) => {
                e.preventDefault();
                setLevel(e.target.value);
              }}
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
          sx={{ width: "85%" }}
          InputLabelProps={{ shrink: true }}
          value={name}
          label="이름"
          onClick={() => {
            setIsEdit(() => !isEdit);
          }}
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value);
          }}
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
          size="small"
          label="추가연락처"
          sx={{ width: "85%" }}
          InputLabelProps={{ shrink: true }}
          value={telNum2}
          defaultValue={telNum2}
          onClick={() => {
            setIsEdit(() => !isEdit);
          }}
          onChange={(e) => {
            e.preventDefault();
            setTelNum2(e.target.value);
          }}
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
          size="small"
          label="기타정보"
          sx={{ width: "85%" }}
          InputLabelProps={{ shrink: true }}
          value={info1}
          onClick={() => {
            setIsEdit(() => !isEdit);
          }}
          onChange={(e) => {
            e.preventDefault();
            setInfo1(e.target.value);
          }}
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
          size="small"
          label="기타정보"
          sx={{ width: "85%" }}
          InputLabelProps={{ shrink: true }}
          value={info2}
          onChange={(e) => {
            e.preventDefault();
            setInfo2(e.target.value);
          }}
        />
        {isEdit}
      </Stack>
    </ExtraWrapper>
  );
};

export default ExtraInfo;
