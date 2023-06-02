import React from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./router";
import { useRecoilState } from "recoil";
import { UserAccountState } from "../modules/store/common.recoil";

const RoutesWrapper = () => {
    const token = localStorage.getItem("token");
    const [userData, setUserData] = useRecoilState(UserAccountState);
    if (!token) setUserData(UserAccountState);
    return (
        <div className="contents-container">
            <RouterProvider router={Router} />
        </div>
    );
};

export default RoutesWrapper;
