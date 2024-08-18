import React from "react";
import router from "./Router";
import { RouterProvider } from "react-router-dom";
import AdminApp from "./AdminApp";

const App = () => {
  return (
    <div className="App">
      Nav
      <RouterProvider router={router} />
    </div>
  )
}

export default App;