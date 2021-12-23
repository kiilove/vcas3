import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const LoginTitleWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin-bottom: 10px;
`;

const LoginTitle = styled.span`
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
  align-items: center;
  justify-content: center;
`;

const PortalCanvas = styled.div`
  width: 200px;
  height: 50px;
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

const RegisterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterText = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${indigo[500]};
  text-decoration: none;
  &:hover {
    color: ${orange[700]};
    cursor: pointer;
  }
`;

const LoginIcon = <FontAwesomeIcon icon={faLock} />;
const Login = () => {
  return (
    <Container>
      <Wrapper>
        <CanvasCustom style={{ width: "600px", padding: "50px" }}>
          <LoginTitleWrapper>
            <LoginTitle>VCAS</LoginTitle>
            <LoginTitle style={{ fontSize: "20px", fontWeight: "400" }}>
              새로운 가치 창출을 위한 최고의 파트너
            </LoginTitle>
          </LoginTitleWrapper>
          <InputWrapper>
            <TextField
              fullWidth
              label="이메일"
              variant="standard"
              color="secondary"
              sx={{ mt: 2, mb: 2 }}
            />
            <TextField
              fullWidth
              label="비밀번호"
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
              로그인
            </Button>
          </InputWrapper>
          <Divider sx={{ width: "100%", mb: 5, mt: 5 }}>또는</Divider>
          <PortalWrapper sx={{ mb: 5 }}>
            <PortalCanvas>
              <img
                src="/img/logos/google.png"
                width="30px"
                alt=""
                style={{ marginRight: "10px" }}
              />{" "}
              구글 로그인
            </PortalCanvas>
            <PortalCanvas>
              <img
                src="/img/logos/facebook.png"
                width="30px"
                alt=""
                style={{ marginRight: "10px" }}
              />{" "}
              페이스북 로그인
            </PortalCanvas>
          </PortalWrapper>
          <Divider sx={{ width: "100%", mb: 5, mt: 5 }}>
            아직 회원이 아니시라면...
          </Divider>
          <RegisterWrapper>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <RegisterText>회원가입</RegisterText>
            </Link>
          </RegisterWrapper>
        </CanvasCustom>
      </Wrapper>
    </Container>
  );
};

export default Login;
