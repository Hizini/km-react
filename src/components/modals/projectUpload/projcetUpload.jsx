import React, { useEffect, useState } from "react";
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
import { BtnsWrap } from "../projectApply/projectApply.style";
import axios from "axios";
import { useRecoilState } from "recoil";
import { UserAccountState } from "../../../modules/store/common.recoil";

const ProjcetUploadModal = ({
    isOpen,
    onClose,
    isEdit = false,
    getProject,
    projectData,
}) => {
    const initFormData = {
        title: "",
        startDate: "",
        endDate: "",
        meetDay: "",
        meetTime: "",
        memberCount: "",
        description: "",
        detail: "",
    };
    const [formData, setFormData] = useState(initFormData);
    const [userData, setUserData] = useRecoilState(UserAccountState);

    const handleFormDataChange = (key) => (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [key]: value });
    };

    const handleUploadProject = async () => {
        if (Object.values(formData).includes(""))
            return alert("모든 데이터를 입력해주세요.");
        if (!formData.meetDay.includes("요일"))
            return alert("모임 요일을 다시 입력해주세요. ex) 화요일");
        if (
            new Date(formData.startDate).getTime() >
            new Date(formData.endDate).getTime()
        )
            return alert("잘못된 날짜 입니다.");
        try {
            const token = localStorage.getItem("token");
            if (!token) return alert("다시 로그인 해주세요.");

            const {
                title,
                startDate,
                endDate,
                meetDay,
                meetTime,
                memberCount,
                description,
                detail,
            } = formData;

            if (isEdit) {
                if (formData.memberCount < projectData.requirements.memberCount)
                    return alert(
                        `참여인원은 ${projectData.requirements.memberCount} 보다 작을 수 없습니다.`
                    );
                await axios.patch(
                    `http://localhost:2008/apis/project/${projectData._id}`,
                    {
                        title,
                        requirements: {
                            startDate,
                            endDate,
                            meetDay,
                            meetTime,
                            detail,
                            memberCount,
                        },
                        description,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await axios.post(
                    "http://localhost:2008/apis/project",
                    {
                        title,
                        requirements: {
                            startDate,
                            endDate,
                            meetDay,
                            meetTime,
                            detail,
                            memberCount,
                        },
                        description,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            onClose();
            getProject();
            const user = await axios.get(`http://localhost:2008/apis/user/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(user.data.data);
        } catch (e) {
            if (e?.response?.status === 401)
                return alert("다시 로그인해주세요.");
            else return alert(e?.response?.data);
        }
    };

    useEffect(() => {
        if (isEdit) {
            if (!projectData) return onClose();
            const { title, requirements, description } = projectData;
            setFormData({
                title,
                startDate: requirements.startDate,
                endDate: requirements.endDate,
                meetDay: requirements.meetDay,
                meetTime: requirements.meetTime,
                memberCount: requirements.memberCount,
                description: description,
                detail: requirements.detail,
            });
        }
    }, [isEdit, onClose, projectData]);

    return (
        <Dialog open={isOpen} maxWidth="xs" fullWidth onClose={onClose}>
            <DialogTitle>
                {isEdit ? "프로젝트 수정" : "프로젝트 등록"}
            </DialogTitle>
            <FormWrap>
                <InputRow>
                    <InputLabel>프로젝트 명</InputLabel>
                    <Input
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={handleFormDataChange("title")}
                        value={formData.title}
                    />
                </InputRow>
                <InputCol>
                    <InputLabel>프로젝트 소개</InputLabel>
                    <Textarea
                        width="100%"
                        rows={4}
                        onChange={handleFormDataChange("description")}
                        value={formData.description}
                    />
                </InputCol>
                <DetailWrap>
                    <InfoCol>
                        <InputCol>
                            <InputLabel>진행 기간</InputLabel>
                            <Input
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="date"
                                onChange={handleFormDataChange("startDate")}
                                value={formData.startDate}
                            />
                            <Input
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="date"
                                onChange={handleFormDataChange("endDate")}
                                value={formData.endDate}
                            />
                        </InputCol>
                        <InputCol>
                            <InputLabel>모임 요일</InputLabel>
                            <Input
                                fullWidth
                                variant="outlined"
                                size="small"
                                placeholder="ex) 화요일"
                                onChange={handleFormDataChange("meetDay")}
                                value={formData.meetDay}
                            />
                        </InputCol>
                        <InputCol>
                            <InputLabel>모임 시간</InputLabel>
                            <Input
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="time"
                                onChange={handleFormDataChange("meetTime")}
                                value={formData.meetTime}
                            />
                        </InputCol>
                        <InputCol>
                            <InputLabel>참여 인원</InputLabel>
                            <Input
                                fullWidth
                                variant="outlined"
                                size="small"
                                type="number"
                                onChange={handleFormDataChange("memberCount")}
                                value={formData.memberCount}
                            />
                        </InputCol>
                    </InfoCol>
                    <InputCol>
                        <InputLabel>상세요강</InputLabel>
                        <Textarea
                            width="100%"
                            rows={14}
                            onChange={handleFormDataChange("detail")}
                            value={formData.detail}
                        ></Textarea>
                    </InputCol>
                </DetailWrap>
                <BtnsWrap>
                    <Button label="닫기" onClick={onClose} width="30%" />
                    <Button
                        label="등록"
                        width="30%"
                        onClick={handleUploadProject}
                    />
                </BtnsWrap>
            </FormWrap>
        </Dialog>
    );
};

export default ProjcetUploadModal;
