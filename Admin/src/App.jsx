import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import APIOverview from "./pages/APIOverview";
import DataTableAPI from "./pages/DataTableAPI";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col w-full min-h-screen bg-gray-50">
          <Header />
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/api" element={<APIOverview />} />
              <Route path="/datatable" element={<DataTableAPI />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
