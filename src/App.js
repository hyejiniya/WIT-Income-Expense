/**
 * App Component
 *
 * - Entry point for the application
 * - Renders Users, Expenses, and Income components 
 * - Divides sections visually using horizontal rules
 * - Imports shared styles from common.css
 */

import React from "react";
import Users from "./components/Users";
import Expenses from "./components/Expenses";
import Income from "./components/Income";
import "./styles/common.css";

// Main application component that renders Users, Expenses, and Income sections
function App() {
  return (
    <div>
      <Users />
      <hr className="section-divider" />
      <Expenses />
      <hr className="section-divider" />
      <Income />
    </div>
  );
}

export default App;
