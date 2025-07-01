import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import AddExpense from "./pages/add-expense";
import Home from "./pages/home/index";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-expense" element={<AddExpense />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
