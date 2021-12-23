import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SpinProgress = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default SpinProgress;
