/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
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
import { useRecoilValue } from "recoil";
import { UserAccountState } from "../../modules/store/common.recoil";

//현재 테스트용 데이터 추가 바인딩 후 데이터 값 비워줘야함
const initData = {
  _id: "",
  title: "프로젝트 명",
  owner: "1",
  requirements: {},
  application: [],
  description: "ddd\ndddd\ndd",
  members: [0, 0, 0],
};

const projectDetail = () => {
  const [isApplyModalOepn, setIsOpen] = useState(false);
  const [projectData, setProjectDate] = useState(initData);
  const userData = useRecoilValue(UserAccountState);
  //로그인한 유저가 주최자인지 확인용 변수
  const isOwner = userData?._id === projectData?.owner;

  const handleApplyModalOpen = () => {
    setIsOpen(true);
  };

  const handleApplyModalClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      //삭제 작업
    }
  };

  return (
    <>
      <ProjcetUploadModal isOpen />
      <ProjcetApplyModal isOpen={isApplyModalOepn} onClose={handleApplyModalClose} />
      <Container>
        <TopWrapper>
          <Title>{projectData?.title}</Title>
          {isOwner ? (
            <TopBtnsWrap>
              <Button label="수정" />
              <Button label="삭제" onClick={handleDelete} />
            </TopBtnsWrap>
          ) : (
            <Button label="지원하기" onClick={handleApplyModalOpen} />
          )}
        </TopWrapper>
        <ContentWrap>
          <ContentInfoWrap>
            <ContentBox>
              <ContentTitle>프로젝트소개</ContentTitle>
              <span>asdasd</span>
            </ContentBox>
            <ContentBox>
              <ContentCol>
                <ContentTitle>진행기간</ContentTitle>
                <span>2023.05.30 ~ 2023.05.31</span>
              </ContentCol>
              <ContentCol>
                <ContentTitle>모임요일</ContentTitle>
                <span>목요일</span>
              </ContentCol>
              <ContentCol>
                <ContentTitle>모임시간</ContentTitle>
                <span>19:00</span>
              </ContentCol>
            </ContentBox>
            <ContentBox>
              <ContentTitle>상세요강</ContentTitle>
              <pre>{projectData?.description}</pre>
            </ContentBox>
          </ContentInfoWrap>
          <ApplicantWrap>
            <ContentTitle>
              {isOwner
                ? "지원현황"
                : `참여 인원 [${projectData?.members.length ?? 0} / 10]`}
            </ContentTitle>
            <ApplicantList>
              {projectData?.members.map(() => {
                return (
                  <ContentBox>
                    <ApplicantItem>
                      <InfoCol>
                        <span>이름 : 홍길동</span>
                        <span>학과 : 컴공과</span>
                        <span>학년 : 4학년</span>
                        <span>학번 : 0000</span>
                        <span>전화번호 : 010-1231-1233</span>
                      </InfoCol>
                      <IntroWrap>
                        <IntroBox>{"ㅇㅇㅇㅇ\ndddd\ndddd\ndddd\ndd"}</IntroBox>
                        {isOwner && (
                          <AppicantBtns>
                            <Button label="수락" width="50%" height="30px" />
                            <Button label="거절" width="50%" height="30px" />
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
      </Container>
    </>
  );
};

export default projectDetail;
