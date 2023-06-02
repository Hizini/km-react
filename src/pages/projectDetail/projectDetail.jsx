/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "../../modules/styles/page.style";
import {
    Title,
    TopWrapper,
    ContentWrap,
    ContentBox,
    ContentTitle,
    ContentInfoWrap,
    ApplicantWrap,
    ApplicantList,
    ContentCol,
    ApplicantItem,
    InfoCol,
    TopBtnsWrap,
    IntroWrap,
    IntroBox,
    AppicantBtns,
} from "./projectDetail.style";
import { Button } from "../../components";
import { ProjcetApplyModal, ProjcetUploadModal } from "../../components/modals";
import { useRecoilState } from "recoil";
import { UserAccountState } from "../../modules/store/common.recoil";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

//현재 테스트용 데이터 추가 바인딩 후 데이터 값 비워줘야함
const initData = {
    _id: "",
    title: "",
    owner: "",
    requirements: {},
    application: [],
    description: "",
    members: [],
};

const projectDetail = () => {
    const [isApplyModalOepn, setIsOpen] = useState(false);
    const [isProjectUploadOpen, setIsProjectUploadOpen] = useState(false);
    const [projectData, setProjectData] = useState(initData);
    const [userData, setUserData] = useRecoilState(UserAccountState);
    //로그인한 유저가 주최자인지 확인용 변수
    const isOwner = userData.name === projectData?.owner;
    const location = useLocation();
    const navigate = useNavigate();

    const handleApplyModalOpen = () => {
		if(projectData.members?.length >= projectData.requirements.memberCount) return alert('모집이 마감되었습니다.')
        setIsOpen(true);
    };

    const handleApplyModalClose = () => {
        setIsOpen(false);
    };

    const handleProjectUploadOpen = () => {
        setIsProjectUploadOpen(true);
    };

    const handleProjectUploadClose = () => {
        setIsProjectUploadOpen(false);
    };

    const handleDelete = async () => {
        const isConfirm = window.confirm("삭제하시겠습니까?");
        const token = localStorage.getItem("token");
        if (isConfirm) {
            try {
                await axios.delete(
                    `http://localhost:2008/apis/project/${location.state.id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                navigate("/");
                const user = await axios.get(
                    `http://localhost:2008/apis/user/me`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUserData(user.data.data);
            } catch (e) {
                alert("Error");
            }
        }
    };

    const handleAccept = async (applicationId) => {
        const isConfirm = window.confirm("수락하시겠습니까?");
        if (isConfirm) {
            try {
                const token = localStorage.getItem("token");
                if (!token) return alert("로그인이 필요합니다.");
                await axios.patch(
                    `http://localhost:2008/apis/project/${location.state.id}/application/apply`,
                    { applicationId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                getApplicationData();
            } catch (e) {
                alert("Error");
            }
        }
    };

    const handleReject = async (applicationId) => {
        const isConfirm = window.confirm("거절하시겠습니까?");
        if (isConfirm) {
            try {
                const token = localStorage.getItem("token");
                if (!token) return alert("로그인이 필요합니다.");
                await axios.delete(
                    `http://localhost:2008/apis/project/${location.state.id}/application`,
                    {
                        data: { applicationId },
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                getApplicationData();
            } catch (e) {
                alert("Error");
            }
        }
    };

    const getProjectData = useCallback(async () => {
        if (!location.state || !location.state.id) navigate("/");
        try {
            const project = await axios.get(
                `http://localhost:2008/apis/project/${location.state.id}`
            );
            setProjectData(project.data.data);
        } catch (e) {
            alert("프로젝트 블러오기 오류");
        }
    }, [location, navigate]);

    const getApplicationData = async () => {
        const token = localStorage.getItem("token");
        try {
            const data = await axios.get(
                `http://localhost:2008/apis/project/${location.state.id}/application`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProjectData({
                ...projectData,
                application: data.data.application,
            });
        } catch (e) {
            alert("지원서 블러오기 오류");
        }
    };

    useEffect(() => {
        getProjectData();
    }, [getProjectData]);

    const memberData = isOwner ? projectData.application : projectData.members;
    return (
        <>
            <ProjcetApplyModal
                isOpen={isApplyModalOepn}
                onClose={handleApplyModalClose}
                title={projectData.title}
                userName={projectData.owner}
                projectId={location.state.id}
            />
            <Container>
                <TopWrapper>
                    <Title>{projectData.title}</Title>
                    {isOwner ? (
                        <TopBtnsWrap>
                            <Button
                                label="수정"
                                onClick={handleProjectUploadOpen}
                            />
                            <Button label="삭제" onClick={handleDelete} />
                        </TopBtnsWrap>
                    ) : (
                        <Button
                            label="지원하기"
                            onClick={handleApplyModalOpen}
                        />
                    )}
                </TopWrapper>
                <ContentWrap>
                    <ContentInfoWrap>
                        <ContentBox>
                            <ContentTitle>프로젝트소개</ContentTitle>
                            <span>{projectData.description}</span>
                        </ContentBox>
                        <ContentBox>
                            <ContentCol>
                                <ContentTitle>진행기간</ContentTitle>
                                <span>
                                    {projectData.requirements.startDate} ~{" "}
                                    {projectData.requirements.endDate}
                                </span>
                            </ContentCol>
                            <ContentCol>
                                <ContentTitle>모임요일</ContentTitle>
                                <span>{projectData.requirements.meetDay}</span>
                            </ContentCol>
                            <ContentCol>
                                <ContentTitle>모임시간</ContentTitle>
                                <span>{projectData.requirements.meetTime}</span>
                            </ContentCol>
                        </ContentBox>
                        <ContentBox>
                            <ContentTitle>상세요강</ContentTitle>
                            <pre>{projectData?.requirements?.detail}</pre>
                        </ContentBox>
                    </ContentInfoWrap>
                    <ApplicantWrap>
                        <ContentTitle>
                            {isOwner
                                ? "지원현황"
                                : `참여 인원 [${
                                      projectData.members?.length ?? 0
                                  } / ${
                                      projectData.requirements.memberCount ?? 0
                                  }]`}
                        </ContentTitle>
                        <ApplicantList>
                            {memberData.map((v) => {
                                return (
                                    <ContentBox>
                                        <ApplicantItem>
                                            <InfoCol>
                                                <span>이름 : {v.name}</span>
                                                <span>학과 : {v.major}</span>
                                                <span>
                                                    학년 : {v.grade}학년
                                                </span>
                                                <span>
                                                    학번 : {v.studentId}
                                                </span>
                                                <span>
                                                    전화번호 : {v.contact}
                                                </span>
                                            </InfoCol>
                                            <IntroWrap>
                                                {isOwner && (
                                                    <span
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {v.title}
                                                    </span>
                                                )}
                                                <IntroBox>
                                                    {v.description}
                                                </IntroBox>
                                                {isOwner && (
                                                    <AppicantBtns>
                                                        <Button
                                                            label="수락"
                                                            width="50%"
                                                            height="30px"
                                                            onClick={() =>
                                                                handleAccept(
                                                                    v.userId
                                                                )
                                                            }
                                                        />
                                                        <Button
                                                            label="거절"
                                                            width="50%"
                                                            height="30px"
                                                            onClick={() =>
                                                                handleReject(
                                                                    v.userId
                                                                )
                                                            }
                                                        />
                                                    </AppicantBtns>
                                                )}
                                            </IntroWrap>
                                        </ApplicantItem>
                                    </ContentBox>
                                );
                            })}
                        </ApplicantList>
                    </ApplicantWrap>
                </ContentWrap>
                <ProjcetUploadModal
                    isOpen={isProjectUploadOpen}
                    onClose={handleProjectUploadClose}
                    isEdit={true}
                    projectData={projectData}
                    getProject={getProjectData}
                />
            </Container>
        </>
    );
};

export default projectDetail;
