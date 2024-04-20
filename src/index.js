import { StrictMode } from "react";
import ReactDOM from "react-dom";
import './index.js'
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
