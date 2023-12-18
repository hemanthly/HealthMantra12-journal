import React from "react";
import ReactDOM from "react-dom/client";
import Textbox from "./Components/Textbox";
import AppRouter from "./Components/Router";

const AppWrapper = () => (
  <div id="container">
    {/* <Title></Title>
    <h4>{number * 15.34}</h4> */}
    {/* <h1 className="heading">Hello health mantra12!</h1> */}
    {/* {footer} */}
    {/* <Textbox></Textbox> */}

    <AppRouter></AppRouter>

  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppWrapper></AppWrapper>);
