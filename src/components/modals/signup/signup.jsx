import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import {
  BtnsWrap,
  SignupForm,
  InputBox,
  InputTitle,
  ModalWrap,
  InputWrap,
} from "./signup.style";
import { Button, Input } from "../../index";

const initFormData = {
  id: "",
  name: "",
  password: "",
  confirmPw: "",
  studentId: "", //학번
  major: "", //학과
  age: "", //나이
  gender: "", // 성별
  contect: "", // 연락처
};

function renderInputLabel(key) {
  switch (key) {
    case "id":
      return "ID";
    case "password":
      return "PW";
    case "confirmPw":
      return "PW 확인";
    case "name":
      return "이름";
    case "studentId":
      return "학번";
    case "major":
      return "학과";
    case "age":
      return "나이";
    case "gender":
      return "성별";
    case "contect":
    default:
      return "연락처";
  }
}

const SignupModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(initFormData);
  //비밀번호,비밀번호 확인 데이터가 서로 다를 경우 에러표시 스테이트
  const [isPWErr, setIsPWErr] = useState(false);
  const handleFormDataChange = (key) => (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
    if ((key === "password" || key === "confirmPw") && isPWErr)
      setIsPWErr(false);
  };

  const handleBlur = (key) => (e) => {
    const dataKey = key === "password" ? "confirmPw" : "password";
    const value = e.target.value;
    const confirmValue = formData[dataKey];
    if (value && confirmValue && value !== confirmValue) {
      setIsPWErr(true);
    }
  };

  const handleSignup = () => {
    if (isPWErr) return alert("비밀번호가 다릅니다");
  };

  return (
    <Dialog open={isOpen} maxWidth="xs" fullWidth onClose={onClose}>
      <ModalWrap>
        <DialogTitle padding={0}>회원가입</DialogTitle>
        <SignupForm>
          <InputWrap>
            {Object.keys(formData).map((key) => {
              const isPassword = key === "password" || key === "confirmPw";
              return (
                <InputBox>
                  <InputTitle>{renderInputLabel(key)}</InputTitle>
                  <Input
                    onChange={handleFormDataChange(key)}
                    value={formData[key]}
                    fullWidth
                    error={isPassword ? isPWErr : false}
                    onBlur={isPassword ? handleBlur(key) : undefined}
                    type={isPassword ? "password" : ""}
                  />
                </InputBox>
              );
            })}
          </InputWrap>
          <BtnsWrap>
            <Button label="닫기" onClick={onClose} />
            <Button label="가입하기" onClick={handleSignup} />
          </BtnsWrap>
        </SignupForm>
      </ModalWrap>
    </Dialog>
  );
};

export default SignupModal;
