import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./components/Login/Login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import VideioDetail from "./components/VideoDetail/VideioDetail";
import HeroSection from "./components/HeroSection/HeroSection";
import Register from "./components/Register/Register";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import UploadVideoModal from "./components/UploadVideoModal/UploadVideoModal";
import TableData from "./components/TableData/TableData";
import UploadDetailModal from "./components/UploadDetailModal/UploadDetailModal";
import CreateChannel from "./components/CreateChannel/CreateChannel";
import Subscriptions from "./components/Subscriptions/Subscriptions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/" element={<App />}>
        <Route path="" element={<HeroSection />} />
        <Route path="/CreateChannel" element={<CreateChannel/>} />
        <Route path="VideoDetail/:id" element={<VideioDetail />} />
        <Route path="UserDashboard" element={<UserDashboard />} />
        <Route path="UploadVideoModal" element={<UploadVideoModal />} />
        <Route path="/UploadDetailModal" element={<UploadDetailModal />} />
        <Route path="/TableData" element={<TableData />} />
        <Route path="/Subscriptions" element={<Subscriptions/>} />
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
