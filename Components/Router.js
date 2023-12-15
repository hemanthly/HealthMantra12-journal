import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import Textbox from "./Textbox";
import Error404 from "./Error404";
import Home from "./Home";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/journal" element={<Textbox></Textbox>} />
        <Route path="/register" element={<RegistrationForm></RegistrationForm>} />
        <Route path="/login" element={<LoginForm></LoginForm>}/>
        <Route path="*" element={<Error404></Error404>}/>
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
