import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import ContactUsPage from "./pages/ContactUsPage";
import SingleBookPage from "./pages/SingleBookPage";
import CoursePage from "./pages/CoursePage";
import AboutUsPage from "./pages/AboutUsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BookPage/>} />
        <Route path="/contact" element={<ContactUsPage/>} />
        <Route path="/single-book/:id" element={<SingleBookPage/>} />
        <Route path="/course" element={<CoursePage/>} />
        <Route path="/about" element={<AboutUsPage/>} />
      </Routes>
    </>
  );
}

export default App;
