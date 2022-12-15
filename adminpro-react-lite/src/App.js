// @ts-nocheck
import { useRoutes } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DetailFeed from "./views/DetailFeeding.js";
import Customer from "./views/Customer.js";
import FullLayout from "./layouts/FullLayout.js";
import Starter from "./views/Starter.js";
import About from "./views/About.js";
import Feed from "./views/Feeding.js";
import Login from "./views/login/login.js";
import { selectCustomer } from "./store/userSlice.js";
import Protected from "./components/protectPath/protected.js";
import NoiBat from "./views/NoiBat.js";
import XacNhanNoiBat from "./views/XacNhanNoiBat.js";

function App() {
  
  const { title, roles } = useSelector(selectCustomer);
  console.log(roles);
  
  
  /*****Routes******/
  const routing = useRoutes(
    [
      {
        path: "/",
        element: <Protected isLoggedIn={roles[0].name === "ADMIN"}><FullLayout /></Protected >,
        children: [
          { path: "*", element: <Navigate to="/starter" /> },
          { path: "/starter", exact: true, element: <Starter /> },
          { path: "/about", exact: true, element: <About /> },
          { path: "/khachhang", exact: true, element: <Customer privatee={true} /> },
          { path: "/gopy", exact: true, element: <Feed privatee={true} /> },
          { path: "/chitietgopy/:id", exact: true, element: <DetailFeed /> },
          { path: "/noibat", exact: true, element: <NoiBat /> },
          { path: "/xacnhannoibat", exact: true, element: <XacNhanNoiBat /> },
        ],
      },
      { path: "/dangnhap", exact: true, element: <Login /> }
    ]
  );

  return (<div className="dark">{routing}</div>);
};

export default App;
