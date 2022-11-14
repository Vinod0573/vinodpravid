import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routers from "./router/Routers";
import "./theme/Colors.css"; // initialize colors
import "./theme/Fonts.css"; // initialize fonts
import RootPortal from "./screens/rootPortal/rootPortal";
//import ErrorBoundry from "./components/generic/errorBoundary/ErrorBoundary";

function App() {
  return (
    <>
      <Router>
        <Routers />
        <RootPortal />
      </Router>
    </>
  );
}

export default App;
