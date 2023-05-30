import styled from "styled-components";

export const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  padding: 0 24px 10px 24px;
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 10px;
`;

export const InputCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px 0;
`;

export const InputLabel = styled.span`
  display: inline-block;
  width: fit-content;
  font-size: 12px;
  width: 100px;
`;

export const DetailWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  > ${InputCol} {
    textarea {
      height: 100% !important;
    }
  }
`;

export const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  width: 50%;
`;

export const BtnsWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0 10px;
`;
