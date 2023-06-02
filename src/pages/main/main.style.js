import styled from "styled-components";

export const ListWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

export const Item = styled.div`
    width: 100%;
    border: 1px solid #efefef;
    padding: 10px;
    cursor: pointer;
`;

export const ButtonWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 10px;
`;
