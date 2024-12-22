// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllJobs from "./pages/AllJobs";
import PostJob from "./pages/PostJob";
// import JobDetail from "./pages/JobDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllJobs />} />
        <Route path="/post-job" element={<PostJob />} />
        {/* <Route path="/jobs/:id" element={<JobDetail />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
