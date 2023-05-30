import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

const initUserData = {
  _id: "",
  id: "",
  password: "",
  name: "",
  studentId: "",
  major: "",
  age: "",
  gender: "",
  contect: "",
};
// 로그인한 유저 데이터 저장
const UserAccountState = atom({
  key: "userAccount",
  default: initUserData,
  effects_UNSTABLE: [persistAtom], // Phrases stored in local storage.
});

export { UserAccountState };
