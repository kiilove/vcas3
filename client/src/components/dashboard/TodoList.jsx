import { grey } from "@mui/material/colors";
import styled from "styled-components";
import ClientCard from "../clients/ClientCard";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  padding: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  width: 100%;
  display: flex;
  align-items: flex-start;
  font-size: 18px;
  font-weight: bold;
`;

const SubTitle = styled.span`
  width: 100%;
  display: flex;
  align-items: flex-start;
  font-size: 16px;
  color: ${grey[600]};
`;

const BodyWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding-top: 10px;
  align-items: center;
  justify-content: center;
`;
const TodoList = ({ title, subTitle, items }) => {
  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
        </TitleWrapper>
        <BodyWrapper>
          {items &&
            items.map((item, index) => (
              <ClientCard
                num={item.clientNumber}
                id={item._id}
                key={index}
                status={item.clientStatus}
              />
            ))}
        </BodyWrapper>
      </Wrapper>
    </Container>
  );
};

export default TodoList;
