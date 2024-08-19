import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar/Navbar";
import Explore from "./pages/Explore";

const NavbarWrapper = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

const router = createBrowserRouter([
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
    }
])

export default router;