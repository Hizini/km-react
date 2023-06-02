import React, { useState } from "react";
import {
    HeaderContainer,
    Logo,
    LogoWrap,
    UserInfoWrap,
    UserInfoRt,
    UserName,
} from "./header.style";
import ButtonComponents from "../button/button";
import { Avatar } from "@mui/material";
import { LoginModal, SignupModal } from "../modals";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserAccountState } from "../../modules/store/common.recoil";
import { RoutesString } from "../../modules/constant";

const Header = () => {
    const navigate = useNavigate();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const userData = useRecoilValue(UserAccountState);

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

    const handleClickMypage = () => {
        if (userData.projectId)
            navigate(RoutesString.PROJECT_DETAIL, {
                state: { id: userData.projectId },
            });
        else return alert("프로젝트가 없습니다.");
    };

    return (
        <>
            <LoginModal
                isOpen={isLoginOpen}
                onClose={handleLoginModalClose}
                onSignup={handleSignupModalOpen}
            />
            <SignupModal
                isOpen={isSignupOpen}
                onClose={handleSignupModalClose}
            />
            <HeaderContainer>
                <LogoWrap onClick={() => navigate("/")}>
                    <Logo src="../../assets/logo.svg" />
                </LogoWrap>
                {userData.name ? (
                    <UserInfoWrap>
                        <Avatar />
                        <UserInfoRt>
                            <UserName>{userData.name}</UserName>
                            <ButtonComponents
                                label="내 프로젝트"
                                size="small"
                                onClick={handleClickMypage}
                            />
                        </UserInfoRt>
                    </UserInfoWrap>
                ) : (
                    <ButtonComponents
                        label="로그인"
                        onClick={handleLoginModalOpen}
                    />
                )}
            </HeaderContainer>
        </>
    );
};

export default Header;
