import {
  faExclamationCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { grey, purple, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../../config/base";
import { postData } from "../modules/ApiData";
import {
  Canvas,
  CloseButton,
  CloseWrapper,
  ComponentBodyWrapper,
  ComponentHeaderTitle,
  ComponentHeaderWrapper,
} from "../styles/Common";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 460px;
  max-height: 100%;
`;

const CreateWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  min-height: 60px;
`;

const CreateInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0px 20px;
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  justify-content: flex-start;
  align-items: center;
`;

const ActionWrapper = styled.div`
  height: 60px;
  display: flex;
  flex-wrap: wrap;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: center;
`;

const ActionGroup = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const TrashIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

const WarningWrapper = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
`;

const WarningMessage = styled.span`
  display: flex;
  background-color: ${yellow[300]};
  border-radius: 5px;
  color: ${grey[700]};
  font-size: 12px;
  font-weight: 600;
  padding-left: 20px;
  align-items: center;
  height: 100%;
`;

const CreateClient = (props) => {
  const [save, setSave] = useState(false);
  const [err, setErr] = useState(true);
  const [validate, setValidate] = useState([]);
  const [count, setCount] = useState(1);
  const [clientList, setClientList] = useState([{ clientNumber: "" }]);
  const urlClient = `${BASE_URL}/api/client/register/clients`;
  const sendClose = (save) => {
    props.setEdited(false);
    props.handleClose(save);
  };

  const validateValue = (str) => {
    if (isNaN(str)) {
      return false;
    } else if (str.length === 0) {
      props.setEdited(false);
      return false;
    } else {
      return true;
    }
  };
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...clientList];
    const valid = [...validate];
    list[index][name] = value;
    valid[index] = validateValue(value);

    setClientList(list);
    setValidate(valid);
    setSave(true);
    props.setEdited(true);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...clientList];
    const valid = [...validate];
    list.splice(index, 1);
    valid.splice(index, 1);
    setClientList(list);
    setValidate(valid);
    count > 0 && setCount(count - 1);
  };

  // handle click event of the Add button
  const handleAddClientList = () => {
    setClientList([...clientList, { clientNumber: "" }]);
    setCount(count + 1);
  };

  useEffect(() => {
    const chkValidate = validate.filter((item) => item === false);
    if (chkValidate.length !== 0) {
      setErr(true);
    } else if (validate.length > 0 && chkValidate.length === 0) {
      setErr(false);
    }
  }, [clientList.length, validate]);

  console.log(validate);
  return (
    <Container>
      <Canvas style={{ paddingTop: "0px" }}>
        <CloseWrapper>
          <Tooltip title="닫기">
            <CloseButton
              src="/img/windowClose.png"
              onClick={() => sendClose()}
            />
          </Tooltip>
        </CloseWrapper>
        <ComponentHeaderWrapper style={{ paddingBottom: "0px" }}>
          <ComponentHeaderTitle color={purple[500]}>
            고객 등록
          </ComponentHeaderTitle>
        </ComponentHeaderWrapper>
        {count > 5 && (
          <WarningWrapper>
            <WarningMessage>
              <FontAwesomeIcon icon={faExclamationCircle} />
              <div style={{ marginLeft: 12 }}>
                많은 고객 데이터 등록은 엑셀등록을 활용하세요.
              </div>
            </WarningMessage>
          </WarningWrapper>
        )}
        <ComponentBodyWrapper style={{ flexDirection: "column" }}>
          <ActionWrapper>
            <ActionGroup style={{ justifyContent: "flex-start" }}>
              <Button
                size="small"
                variant="outlined"
                sx={{ mr: 1 }}
                color="secondary"
                onClick={() => {
                  handleAddClientList();
                }}
              >
                추가
              </Button>
            </ActionGroup>
            <ActionGroup style={{ justifyContent: "flex-end" }}>
              <Button
                size="small"
                variant="contained"
                sx={{ mr: 1 }}
                disableElevation
                disabled={err}
                color="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  postData(clientList, urlClient, sendClose());
                }}
              >
                저장
              </Button>
            </ActionGroup>
          </ActionWrapper>
          <CreateWrapper>
            <CreateInput>
              {clientList &&
                clientList.map((item, index) => (
                  <FormControl
                    sx={{ m: 1 }}
                    variant="standard"
                    fullWidth
                    error={!validate[index]}
                  >
                    <InputLabel htmlFor="clientNumber">전화번호</InputLabel>
                    <Input
                      id={index}
                      size="small"
                      variant="standard"
                      label="전화번호"
                      fullWidth
                      name="clientNumber"
                      required
                      helperText="Incorrect entry."
                      value={item.clientNumber}
                      sx={{ marginBottom: 2 }}
                      onChange={(e) => {
                        e.preventDefault();
                        handleInputChange(e, index);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            sx={{ fontSize: 15 }}
                            onClick={() => handleRemoveClick(index)}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText
                      name="clientNumber"
                      id={index}
                      disabled={validate}
                    >
                      숫자만 입력해주세요!
                    </FormHelperText>
                  </FormControl>
                ))}
              <TrashIcon></TrashIcon>
            </CreateInput>
          </CreateWrapper>
        </ComponentBodyWrapper>
      </Canvas>
    </Container>
  );
};

export default CreateClient;
