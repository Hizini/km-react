import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import {
  DetailWrap,
  FormWrap,
  InfoCol,
  InputCol,
  InputLabel,
  InputRow,
} from "./projectUpload.style";
import { Button, Input, Textarea } from "../..";
import { BtnsWrap } from '../projectApply/projectApply.style';
const ProjcetUploadModal = ({ isOpen, onClose, isEdit }) => {
  return (
    <Dialog open={isOpen} maxWidth="xs" fullWidth onClose={onClose}>
      <DialogTitle>{isEdit ? "프로젝트 지원" : "프로젝트 등록"}</DialogTitle>
      <FormWrap>
        <InputRow>
          <InputLabel>프로젝트 명</InputLabel>
          <Input fullWidth variant="outlined" size="small" />
        </InputRow>
        <InputCol>
          <InputLabel>프로젝트 소개</InputLabel>
          <Textarea width="100%" rows={4} />
        </InputCol>
        <DetailWrap>
          <InfoCol>
            <InputCol>
              <InputLabel>진행 기간</InputLabel>
              <Input fullWidth variant="outlined" size="small" />
            </InputCol>
            <InputCol>
              <InputLabel>모임 요일</InputLabel>
              <Input fullWidth variant="outlined" size="small" />
            </InputCol>
            <InputCol>
              <InputLabel>모임 시간</InputLabel>
              <Input fullWidth variant="outlined" size="small" />
            </InputCol>
            <InputCol>
              <InputLabel>참여 인원</InputLabel>
              <Input fullWidth variant="outlined" size="small" />
            </InputCol>
          </InfoCol>
          <InputCol>
            <InputLabel >상세요강</InputLabel>
            <Textarea width="100%" rows={14}></Textarea>
          </InputCol>
        </DetailWrap>
        <BtnsWrap>
          <Button label="닫기" onClick={onClose} width="30%"/>
          <Button label="등록" width="30%"/>
        </BtnsWrap>
      </FormWrap>
    </Dialog>
  );
};

export default ProjcetUploadModal;
