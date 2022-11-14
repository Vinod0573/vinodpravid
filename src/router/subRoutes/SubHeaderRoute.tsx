import React from "react";
import { Routes, Route } from "react-router-dom";
import AnalyticsLoggerHeader from "../../components/moduleComponents/analyticsLoggerHeader/AnalyticsLoggerHeader";

export default function SubHeaderRoute() {
  return (
  
      <Routes>
        <Route path="calllogger" element={<AnalyticsLoggerHeader />} />
        <Route path="dashboard" element={<AnalyticsLoggerHeader />} />
      </Routes>
    
  );
}
