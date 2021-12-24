import {
  faFileExcel,
  faKeyboard,
  faRedo,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  CircularProgress,
  Fade,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../../config/base";
import CreateClient from "../modals/CreateClient";
import CreateClientExcel from "../modals/CreateClientExcel";
import SpinProgress from "../SpinProgress";
import {
  Canvas,
  ComponentBodyWrapper,
  ComponentHeaderTitle,
  ComponentHeaderWrapper,
} from "../styles/Common";
import ClientCard from "./ClientCard";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  width: 100%;
  justify-content: space-between;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ListActionWrapper = styled.div`
  height: 50px;
  width: 100%;
  margin: 5px 0px;
  display: flex;
  align-items: center;
  flex: 1;
`;

const ListActionBox = styled.div`
  height: 50px;
  width: 100%;
  margin: 5px 0px;
  display: flex;
  align-items: center;
  flex: 1;
`;

const SearchIcon = <FontAwesomeIcon icon={faSearch} />;
const ExcelIcon = <FontAwesomeIcon icon={faFileExcel} />;
const KeyboardIcon = <FontAwesomeIcon icon={faKeyboard} />;
const Redo = <FontAwesomeIcon icon={faRedo} />;

const ClientListCard = () => {
  const [openExcel, setOpenExcel] = useState(false);
  const [openSingle, setOpenSingle] = useState(false);
  const [getClients, setGetClients] = useState([]);
  const [fillterdGroup, setFillterdGroup] = useState("all");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleOpenExcel = () => setOpenExcel(true);
  const handleCloseExcel = () => {
    setOpenExcel(false);
    setRefresh(!refresh);
  };
  const handleOpenSingle = () => setOpenSingle(true);
  const handleCloseSingle = () => {
    setOpenSingle(false);
    setRefresh(!refresh);
  };

  const handleGroup = (e) => {
    e.preventDefault();
    setFillterdGroup(e.target.value);
  };

  const getData = async () => {
    setLoading(true);
    const header = { "Content-type": "application/json" };
    try {
      const res = await axios({
        method: "get",
        url: `${BASE_URL}/api/client/`,
        headers: header,
      });
      setGetClients(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("불러오기 실패!");
    }
  };
  useEffect(() => {
    getData();
  }, [refresh]);

  return (
    <Container>
      <Canvas>
        <ComponentHeaderWrapper>
          <ComponentHeaderTitle color={indigo[500]}>
            고객리스트
          </ComponentHeaderTitle>
          <ListActionWrapper style={{ justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              startIcon={Redo}
              onClick={() => setRefresh(!refresh)}
              sx={{ marginLeft: "10px", height: "40px" }}
            >
              새로고침
            </Button>
            <Button
              variant="contained"
              disableElevation
              color="secondary"
              startIcon={KeyboardIcon}
              onClick={handleOpenSingle}
              sx={{ marginLeft: "10px", height: "40px" }}
            >
              건별등록
            </Button>
            <Button
              variant="contained"
              disableElevation
              color="success"
              startIcon={ExcelIcon}
              onClick={handleOpenExcel}
              sx={{ marginLeft: "10px", height: "40px" }}
            >
              엑셀등록
            </Button>
            <Modal open={openExcel} onClose={handleCloseExcel}>
              <CreateClientExcel handleClose={handleCloseExcel} />
            </Modal>
            <Modal open={openSingle} onClose={handleCloseSingle}>
              <CreateClient handleClose={handleCloseSingle} />
            </Modal>
          </ListActionWrapper>
        </ComponentHeaderWrapper>
        <ListActionWrapper>
          <ListActionBox>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              onChange={handleGroup}
            >
              <FormControlLabel
                value="all"
                control={<Radio />}
                label="전체보기"
              />
              <FormControlLabel
                value="new"
                control={<Radio />}
                label="신규고객"
              />
              <FormControlLabel
                value="ing"
                control={<Radio />}
                label="진행중"
              />
              <FormControlLabel
                value="stop"
                control={<Radio />}
                label="중지됨"
              />
            </RadioGroup>
          </ListActionBox>
          <ListActionBox style={{ justifyContent: "flex-end" }}>
            <TextField
              size="small"
              label="결과내 검색"
              sx={{ width: "300px" }}
            />
            <Button
              variant="outlined"
              startIcon={SearchIcon}
              sx={{ marginLeft: "10px", height: "40px" }}
            >
              검색
            </Button>
          </ListActionBox>
        </ListActionWrapper>
        <ComponentBodyWrapper>
          <ListWrapper>
            <LoadingWrapper>
              <Fade in={loading} unmountOnExit>
                <CircularProgress width="100%" justifyContent="center" />
              </Fade>
            </LoadingWrapper>
            {!loading &&
              getClients.map((item, index) => (
                <ClientCard
                  num={item.clientNumber}
                  id={item._id}
                  key={index}
                  status={item.clientStatus}
                />
              ))}
          </ListWrapper>
        </ComponentBodyWrapper>
      </Canvas>
    </Container>
  );
};

export default ClientListCard;
