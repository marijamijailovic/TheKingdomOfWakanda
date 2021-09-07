import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import "./App.css";
import "./styles/main.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <AppRouter />
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
