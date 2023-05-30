import React from "react";
import { Dialog, DialogTitle, InputLabel } from "@mui/material";
import {
  Wrapper,
  FormWrap,
  ProjectInfoBox,
  InputWrap,
  BtnsWrap,
} from "./projectApply.style";
import { Button, Input, Textarea } from "../..";
const ProjcetApplyModal = ({
  isOpen,
  onClose,
  title = "프로젝트명",
  userName = "홍길동",
}) => {
  return (
    <Dialog open={isOpen} maxWidth="xs" fullWidth onClose={onClose}>
      <DialogTitle>프로젝트 지원</DialogTitle>
      <Wrapper>
        <ProjectInfoBox>
          <h6>지원 프로젝트 확인</h6>
          <p>주최자 : {userName}</p>
          <p>공고 제목 : {title}</p>
        </ProjectInfoBox>
        <FormWrap>
          <InputWrap>
            <InputLabel>지원서 제목</InputLabel>
            <Input variant="outlined" />
          </InputWrap>
          <InputWrap>
            <InputLabel>자기소개</InputLabel>
            <Textarea maxRows={5} minRows={5} />
          </InputWrap>
        </FormWrap>
        <BtnsWrap>
          <Button label="닫기" width="30%" onClick={onClose} />
          <Button label="지원" width="30%" />
        </BtnsWrap>
      </Wrapper>
    </Dialog>
  );
};

export default ProjcetApplyModal;
