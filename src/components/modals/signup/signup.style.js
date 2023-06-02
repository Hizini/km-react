import styled from "@emotion/styled";

export const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const ModalWrap = styled.div`
    padding: 15px 0px;
`;

export const InputWrap = styled.div`
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    justify-content: space-between;
`;

export const InputBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const InputTitle = styled.span`
    display: inline-block;
    margin-right: 5px;
    font-size: 12px;
`;

export const BtnsWrap = styled.div`
    margin-top: 30px;
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
`;
