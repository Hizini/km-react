import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useRecoilState } from "recoil";
import { UserAccountState } from "../../../modules/store/common.recoil";

const LoginModal = ({ isOpen, onClose, onLogin, onSignup }) => {
    const [formData, setFormData] = useState({ id: "", password: "" });
    const [userData, setUserData] = useRecoilState(UserAccountState);

    const handleDataChange = (key) => (e) => {
        setFormData({ ...formData, [key]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:2008/apis/user/sign-in",
                {
                    id: formData.id,
                    password: formData.password,
                }
            );
            const token = response.data?.token;
            localStorage.setItem("token", token);
            if (token) {
                const user = await axios.get(
                    `http://localhost:2008/apis/user/me`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUserData(user.data.data);
            }
            onClose();
        } catch (e) {
            if (e?.response?.status === 401)
                return alert("가입되지 않은 아이디입니다.");
            else return alert("Login Error");
        }
    };

    useEffect(() => {
        setFormData({ id: "", password: "" });
    }, [isOpen]);

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
                        <Button label="로그인" onClick={handleLogin} />
                        <Button label="회원가입" onClick={onSignup} />
                    </BtnsWrap>
                </LoginForm>
            </Wrapper>
        </Dialog>
    );
};

export default LoginModal;
