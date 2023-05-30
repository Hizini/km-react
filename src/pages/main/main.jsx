import React from "react";
import { Container } from "../../modules/styles/page.style";
import { Item, List, ListWrapper,ButtonWrap } from "./main.style";
import { useNavigate } from "react-router-dom";
import { RoutesString } from "../../modules/constant";
import { Button } from "../../components";

const Projects = ["dd", "dddd", "ddddd"];

const Main = () => {
  const navigate = useNavigate();

  const handleToProjectDetail = () => {
    navigate(RoutesString.PROJECT_DETAIL);
  };

  return (
    <Container>
      <ButtonWrap>
        <Button label="새 프로젝트 등록" />
      </ButtonWrap>
      <ListWrapper>
        <List>
          {Projects.map((item) => (
            <Item onClick={handleToProjectDetail}>{item}</Item>
          ))}
        </List>
      </ListWrapper>
    </Container>
  );
};

export default Main;
