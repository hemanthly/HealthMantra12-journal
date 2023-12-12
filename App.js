import React from "react";
import ReactDOM from "react-dom/client";
import Textbox from "./Components/Textbox";
import AppRouter from "./Components/Router";

// const Title = () => (
//     <h2>Create a journalling app!</h2>
// );

// const number = 1969;

// const footer = (
//     <div className="footer">
//       <h3 style={{ color: '#FF0000' }}>This text is in red (#FF0000)</h3>
//       <h3 style={{ color: '#00FF00' }}>This text is in green (#00FF00)</h3>
//     </div>
//   );

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
