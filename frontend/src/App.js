import React from "react";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow my-5">
        <div className="max-w-7xl mx-auto px-4">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
