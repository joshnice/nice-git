import React from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./pages/home-page";
import "./index.css";

const root = createRoot(document.body);
root.render(<HomePage />);
