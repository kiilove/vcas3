import { Button, Divider, TextField } from "@mui/material";
import { grey, orange, indigo } from "@mui/material/colors";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  CanvasCustom,
  ComponentHeaderTitle,
  ComponentHeaderWrapper,
} from "../components/styles/Common";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #292f4d;
`;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RegisterTitleWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin-bottom: 10px;
`;

const RegisterTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 30px;
  font-weight: 600;
`;

const InputWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin-bottom: 10px;
`;

const PortalWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const PortalCanvas = styled.div`
  flex: 1;
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 20px;
  border: 0.5px solid ${grey[400]};
  margin: 10px;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const LoginWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginText = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${indigo[500]};
  text-decoration: none;
  &:hover {
    color: ${orange[700]};
    cursor: pointer;
  }
`;

const LoginTypo = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${grey[500]};
  text-decoration: none;
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <CanvasCustom style={{ width: "600px", padding: "50px" }}>
          <RegisterTitleWrapper>
            <RegisterTitle>회원가입</RegisterTitle>
            <RegisterTitle style={{ fontSize: "20px", fontWeight: "400" }}>
              VCAS와 함께 새로운 가치 창출을 경험하세요.
            </RegisterTitle>
          </RegisterTitleWrapper>
          <PortalWrapper sx={{ mb: 5 }}>
            <PortalCanvas>
              <img
                src="/img/logos/google.png"
                width="30px"
                alt=""
                style={{ marginRight: "20px" }}
              />{" "}
              구글계정으로 가입하기
            </PortalCanvas>
            <PortalCanvas>
              <img
                src="/img/logos/facebook.png"
                width="30px"
                alt=""
                style={{ marginRight: "20px" }}
              />{" "}
              페이스북계정으로 가입하기
            </PortalCanvas>
          </PortalWrapper>

          <Divider sx={{ width: "100%", mb: 5, mt: 5 }}>
            또는! 이메일로 직접 가입하기
          </Divider>
          <InputWrapper>
            <TextField
              fullWidth
              label="이메일"
              variant="standard"
              color="secondary"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="비밀번호"
              variant="standard"
              color="secondary"
              sx={{ mt: 2, mb: 2 }}
            />
            <TextField
              fullWidth
              label="비밀번호확인"
              variant="standard"
              color="secondary"
              sx={{ mt: 2, mb: 2 }}
            />
            <Button
              size="large"
              variant="contained"
              fullWidth
              disableElevation
              color="secondary"
              sx={{ height: 50, fontSize: 20, fontWeight: 600, mt: 2 }}
            >
              회원가입
            </Button>
          </InputWrapper>
          <LoginWrapper>
            <LoginTypo>계정을 이미 가지고 계시다면 </LoginTypo>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <LoginText style={{ marginLeft: 10, marginRight: 10 }}>
                로그인
              </LoginText>
            </Link>
            <LoginTypo>하세요. </LoginTypo>
          </LoginWrapper>
        </CanvasCustom>
      </Wrapper>
    </Container>
  );
};

export default Register;
