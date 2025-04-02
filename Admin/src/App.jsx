import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1">
          <Dashboard />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
