import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import DealPage from "./pages/DealPage/DealPage";
import IndexPage from "./pages/IndexPage/IndexPage";
import PGTestPage from "./pages/PGTestPage/PGTestPage";
import TestPage from "./pages/TestPage/TestPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/" element={<PGTestPage />} />
                    <Route path="test" element={<IndexPage />} />
                    <Route path="testes" element={<TestPage />} />
                    <Route path="pg" element={<DealPage />} />
                </Route>
            </Routes>
        </HashRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
