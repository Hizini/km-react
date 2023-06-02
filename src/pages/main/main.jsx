import React, { useEffect, useState } from "react";
import { Container } from "../../modules/styles/page.style";
import { Item, List, ListWrapper, ButtonWrap } from "./main.style";
import { useNavigate } from "react-router-dom";
import { RoutesString } from "../../modules/constant";
import { Button } from "../../components";
import {
    LoginModal,
    SignupModal,
    ProjcetUploadModal,
} from "../../components/modals";
import { useRecoilState } from "recoil";
import { UserAccountState } from "../../modules/store/common.recoil";
import axios from "axios";

const Main = () => {
    const navigate = useNavigate();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isProjectUploadOpen, setIsProjectUploadOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [projects, setProjects] = useState(null);
    const [userData, setUserData] = useRecoilState(UserAccountState);

    const handleLoginModalOpen = () => {
        setIsLoginOpen(true);
    };
    const handleLoginModalClose = () => {
        setIsLoginOpen(false);
    };

    const handleSignupModalClose = () => {
        setIsSignupOpen(false);
    };

    const handleSignupModalOpen = () => {
        if (isLoginOpen) setIsLoginOpen(false);
        setIsSignupOpen(true);
    };

    const handleToProjectDetail = (id) => {
        navigate(RoutesString.PROJECT_DETAIL, { state: { id } });
    };

    const handleProjectUploadOpen = () => {
        if (!userData.name) return handleLoginModalOpen();
        else setIsProjectUploadOpen(true);
    };

    const handleProjectUploadClose = () => {
        setIsProjectUploadOpen(false);
    };

    const getProject = async () => {
        try {
            const project = await axios.get(
                `http://localhost:2008/apis/project`
            );
            setProjects(project.data.data);
        } catch (e) {
            if (e?.response?.status === 401)
                return alert("가입되지 않은 아이디입니다.");
            else return alert("Login Error");
        }
    };

    useEffect(() => {
        getProject();
    }, []);

    return (
        <Container>
            <ButtonWrap>
                <Button
                    label="새 프로젝트 등록"
                    onClick={handleProjectUploadOpen}
                />
            </ButtonWrap>
            <ListWrapper>
                <List>
                    {projects?.map((item) => (
                        <Item onClick={() => handleToProjectDetail(item._id)}>
                            {item.title}
                        </Item>
                    ))}
                </List>
            </ListWrapper>
            <LoginModal
                isOpen={isLoginOpen}
                onClose={handleLoginModalClose}
                onSignup={handleSignupModalOpen}
            />
            <SignupModal
                isOpen={isSignupOpen}
                onClose={handleSignupModalClose}
            />
            <ProjcetUploadModal
                isOpen={isProjectUploadOpen}
                onClose={handleProjectUploadClose}
                getProject={getProject}
            />
        </Container>
    );
};

export default Main;
