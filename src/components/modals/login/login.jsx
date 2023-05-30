import React, { useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import {
  BtnsWrap,
  LoginForm,
  InputRow,
  RowName,
  Wrapper,
  InputWrap,
} from "./login.style";
import { Button, Input } from "../../index";
const LoginModal = ({ isOpen, onClose, onLogin, onSignup }) => {
  const [formData, setFormData] = useState({ id: "", password: "" });
  
  const handleDataChange = (key) => (e) => {
    setFormData({ ...formData, [key]: e.target.valued });
  };

  return (
    <Dialog open={isOpen} maxWidth="xs" fullWidth onClose={onClose}>
      <Wrapper>
        <DialogTitle padding={0}>로그인</DialogTitle>
        <LoginForm>
          <InputWrap>
            <InputRow>
              <RowName>ID</RowName>
              <Input
                fullWidth
                value={formData.id}
                onChange={handleDataChange("id")}
              />
            </InputRow>
            <InputRow>
              <RowName>PW</RowName>
              <Input
                fullWidth
                type="password"
                value={formData.password}
                onChange={handleDataChange("password")}
              />
            </InputRow>
          </InputWrap>
          <BtnsWrap>
            <Button label="로그인" onClick={onLogin} />
            <Button label="회원가입" onClick={onSignup} />
          </BtnsWrap>
        </LoginForm>
      </Wrapper>
    </Dialog>
  );
};

export default LoginModal;
