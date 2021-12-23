import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Rating, Stack, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { putData } from "../modules/ApiData";

const MemoWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 160px;
  display: flex;
  flex-direction: column;
`;

const MemoRatingBox = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
`;

const MemoRatingTitle = styled.span`
  font-size: 15px;
  color: ${grey[900]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const MemoRating = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 3;
`;

const MemoTextBox = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const MemoInput = (props) => {
  const [score, setScore] = useState(4);
  const [content, setContent] = useState("");
  const [writeDate, setWriteDate] = useState(Date().toLocaleString());
  const [idx, setIdx] = useState(props.memoCount);
  const [memoArray, setMemoArray] = useState([]);

  const postMemo = () => {
    const memoObject = [
      {
        id: idx + 1,
        score,
        content,
        date: Date(),
      },
    ];


    props.setMemoInfo(props.memoInfo.concat(memoObject));
    setContent("");
    setScore(4);
  };

  useEffect(() => {
    setIdx(props.memoCount);
    setMemoArray(props.memoInfo);
  }, [props]);

  return (
    <MemoWrapper>
      <Stack
        justifyContent="center"
        alignItems="center"
        width="100%"
        sx={{ mt: 2 }}
      >
        <MemoRatingBox>
          <MemoRatingTitle>
            중요도({score})/({idx})
          </MemoRatingTitle>
          <MemoRating>
            <Rating
              value={score}
              onChange={(e) => {
                e.preventDefault();
                setScore(e.target.value);
              }}
            />
          </MemoRating>
        </MemoRatingBox>
        <MemoTextBox>
          <TextField
            size="small"
            label="메모"
            multiline
            minRows={4}
            maxRows={4}
            sx={{ width: "70%", mb: 1.5 }}
            value={content}
            onChange={(e) => {
              e.preventDefault();
              setContent(e.target.value);
            }}
          />
          <Button
            variant="outlined"
            sx={{ width: "50px", height: "110px", mb: 1.5, ml: 1 }}
            onClick={() => postMemo()}
          >
            작성
          </Button>
        </MemoTextBox>
      </Stack>
    </MemoWrapper>
  );
};

export default MemoInput;
