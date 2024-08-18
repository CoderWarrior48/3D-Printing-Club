import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import AdminApp from "./AdminApp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/admin/*",
        element: <AdminApp />
    },
    {
        path: "about",
        element: <About />
    },
    // {
    //     path: "*",
    //     element: <NotFound />
    // }
])

export default router;