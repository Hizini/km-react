import { Header } from "../components";
import { RoutesString } from "../modules/constant";
import Main from "../pages/main/main";
import ProjectDetail from "../pages/projectDetail/projectDetail";
import { createBrowserRouter, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

const Router = createBrowserRouter([
    {
        path: RoutesString.MAIN,
        element: <Layout />,
        children: [
            {
                path: RoutesString.MAIN,
                element: <Main />,
            },
            {
                path: RoutesString.PROJECT_DETAIL,
                element: <ProjectDetail />,
            },
        ],
    },
]);
export default Router;
