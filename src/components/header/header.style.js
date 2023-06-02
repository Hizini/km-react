import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efefef;
    padding: 15px 20px;
`;

export const LogoWrap = styled.div`
    cursor: pointer;
`;

export const Logo = styled.img``;

export const UserInfoWrap = styled.div`
    display: flex;
    flex-direction: row;
`;

export const UserInfoRt = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;
export const UserName = styled.span`
    font-size: 12px;
`;
