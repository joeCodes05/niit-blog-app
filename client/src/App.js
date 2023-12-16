import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreatePost from "./pages/create";
import PostSingle from "./pages/post-single"

const App = () => {

  return (
    <>
      <main className="bg-dark min-h-screen overflow-hidden font-poppins">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/post/:id" element={<PostSingle />} />
            <Route exact path="/post/create" element={<CreatePost />} />
          </Routes>
        </Router>
      </main>
    </>
  );
};

export default App;
