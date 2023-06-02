import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, InputLabel } from "@mui/material";
import {
    Wrapper,
    FormWrap,
    ProjectInfoBox,
    InputWrap,
    BtnsWrap,
} from "./projectApply.style";
import { Button, Input, Textarea } from "../..";
import axios from "axios";

const ProjcetApplyModal = ({ isOpen, onClose, title, userName, projectId }) => {
    const [formData, setFormData] = useState({ title: "", description: "" });

    const handleDataChange = (key) => (e) => {
        setFormData({ ...formData, [key]: e.target.value });
    };
	  
    const handleApply = async () => {
        const token = localStorage.getItem("token");
        if (!token || !projectId) {
			onClose()
			return alert("로그인이 필요합니다.");
		}
        const { title, description } = formData;
        try {
			if (!title || !description) return alert('지원서 제목과 자기소개를 입력해주세요.')
            await axios.put(
                `http://localhost:2008/apis/project/${projectId}/application`,
                { title, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onClose();
			alert('지원 완료!')
        } catch (e) {
            if (e?.response?.status === 400) return alert(e?.response?.data);
            else alert("Apply Error");
			onClose()
        }
    };

    useEffect(() => {
        setFormData({ title: "", description: "" });
    }, [isOpen]);

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
                        <Input
                            variant="outlined"
                            onChange={handleDataChange("title")}
                        />
                    </InputWrap>
                    <InputWrap>
                        <InputLabel>자기소개</InputLabel>
                        <Textarea
                            maxRows={5}
                            minRows={5}
                            onChange={handleDataChange("description")}
                        />
                    </InputWrap>
                </FormWrap>
                <BtnsWrap>
                    <Button label="닫기" width="30%" onClick={onClose} />
                    <Button label="지원" width="30%" onClick={handleApply} />
                </BtnsWrap>
            </Wrapper>
        </Dialog>
    );
};

export default ProjcetApplyModal;
