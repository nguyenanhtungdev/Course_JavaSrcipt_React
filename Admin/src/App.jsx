import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import OrderTable from "./components/OrderTable";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import APIOverview from "./pages/APIOverview";
import DataTableAPI from "./pages/DataTableAPI";
import AnalyticsPage from "./pages/AnalyticsPage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import Notification from "./pages/Notifications";
import Connect from "./pages/Connect";
import Group from "./pages/Group";
import APIPage from "./pages/APIPage";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col w-full min-h-screen bg-gray-50">
          <Header />
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<OrderTable />} />
              <Route path="/api" element={<APIOverview />} />
              <Route path="/datatable" element={<DataTableAPI />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/group" element={<Group />} />
              <Route path="/apipage" element={<APIPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
