import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar/Navbar";
import Explore from "./pages/Explore";
import PrivateRoutes from "./PrivateRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import Editor  from "./components/Editor/Editor";
import { Render } from "@measured/puck";
import ScrollVideo from "./components/ScrollVideo/ScrollVideo";
import { mypage } from './pages/fakepuckpage';
import { config } from "./components/Editor/Config";
import PageManager from "./pages/PageManager";

const NavbarWrapper = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

let routes = [
    {
        path: "/", 
        element: <NavbarWrapper/>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "home",
                element: <Home />
            },
            {
                path: "explore",
                element: <Explore />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "*",
                element: <NotFound />
            },
        ]
    },
    {
        path: "/",
        element: <PrivateRoutes />,
        children: [
            {
                path: "/admin",
                element: <AdminDashboard />
            },
            {
                path: "/page-manager",
                element: <PageManager />
            },
            {
                path: "/editor",
                element: <Editor />
            },
        ]
    },
]

const addPage = (pageName, pageRoute, data) => {
    routes[0].children.push(
        {
            path: pageRoute,
            element: <div>hi<Render config={config} data={data} /></div>
        }
    )
}

addPage('mypage', '/mypage', mypage)

const router = createBrowserRouter(routes);

export default router;