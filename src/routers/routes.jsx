import React from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./router";

const RoutesWrapper = () => {
  return (
    <div className="contents-container">
      <RouterProvider router={Router} />
    </div>
  );
};

export default RoutesWrapper;
