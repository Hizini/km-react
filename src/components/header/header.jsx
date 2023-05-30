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
import { useRecoilState } from "recoil";
import { UserAccountState } from "../../modules/store/common.recoil";
const Header = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
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

  const handleLogin = () => {
    setIsLogin(true);
    handleLoginModalClose();
  };

  return (
    <>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={handleLoginModalClose}
        onSignup={handleSignupModalOpen}
        onLogin={handleLogin}
      />
      <SignupModal isOpen={isSignupOpen} onClose={handleSignupModalClose} />
      <HeaderContainer>
        <LogoWrap onClick={() => navigate("/")}>
          <Logo src="../../assets/logo.svg" />
        </LogoWrap>
        {isLogin ? (
          <UserInfoWrap>
            <Avatar />
            <UserInfoRt>
              <UserName>이현규</UserName>
              <ButtonComponents label="내 프로젝트" size="small" />
            </UserInfoRt>
          </UserInfoWrap>
        ) : (
          <ButtonComponents label="로그인" onClick={handleLoginModalOpen} />
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;
