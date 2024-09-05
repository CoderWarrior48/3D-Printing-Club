import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar/Navbar";
import Explore from "./pages/Explore";
import PrivateRoutes from "./PrivateRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import Editor  from "./components/Editor/Editor";
import { Render } from "@measured/puck";
import ScrollVideo from "./components/ScrollVideo/ScrollVideo";

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
                path: "about",
                element: <About />
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
            }
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
                path: "/editor",
                element: <Editor />
            },
            {
                path: "/gsap",
                element: <ScrollVideo />
            }
        ]
    },
]

const addPage = (pageName, pageRoute, data) => {
    routes[0].children.push(
        {
            path: pageRoute,
            element: <Render data={data} />
        }
    )
}
const router = createBrowserRouter(routes);

export default router;