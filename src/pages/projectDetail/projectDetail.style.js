import styled from "styled-components";

export const TopWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const TopBtnsWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;

export const Title = styled.h6`
    font-size: 18px;
    font-weight: bold;
`;

export const ContentWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: space-between;
    gap: 0 10px;
    margin-top: 10px;
`;

export const ContentInfoWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    width: 50%;
`;

export const ContentTitle = styled.strong`
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 14px;
`;

export const ContentCol = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    ${ContentTitle} {
        margin-bottom: 0px;
    }
`;

export const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px 0;
    padding: 10px;
    border: 1px solid #efefef;
    border-radius: 5px;
    width: 100%;
    span {
        font-size: 12px;
    }
`;

export const ApplicantWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 50%;
`;

export const ApplicantList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const ApplicantItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

export const InfoCol = styled.div`
    display: flex;
    flex-direction: column;
`;
export const IntroWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
`;

export const IntroBox = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    max-height: 75px;
    flex-direction: column;
    padding: 10px;
    border: 1px solid #efefef;
    border-radius: 5px;
    width: 100%;
    white-space: pre-line;
    font-size: 12px;
    overflow: auto;
`;

export const AppicantBtns = styled.div`
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
`;
