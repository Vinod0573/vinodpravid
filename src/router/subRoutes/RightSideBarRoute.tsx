import React from "react";
import { Routes, Route } from "react-router-dom";
import RightSideBar from "../../components/generic/rightSidebar/RightSidebar";

export default function RightSideBarRoute() {
  return (
    <div>
      <Routes>
        <Route path="calllogger" element={<RightSideBar />} />
        <Route path="dashboard" element={<RightSideBar />} />
      </Routes>
    </div>
  );
}
