/**
 * Income Component
 *
 * - Add, update, and delete income data by user ID
 * - Each record includes fields like wages, interest, etc.
 * - Supports form reset, validation, and feedback messaging
 */

import React, { useState } from "react";
import "../styles/common.css";
import "../styles/Income.css";

const API_BASE = process.env.REACT_APP_API_URL;

const Income = () => {
  const [incomeData, setIncomeData] = useState({
    id: "",
    wages: "",
    secondaryIncome: "",
    interest: "",
    supportPayment: "",
    others: ""
  });

  const [mode, setMode] = useState("add");
  const [response, setResponse] = useState(null);

  // Update form fields
  const updateField = (event) => {
    const { name, value } = event.target;
    setIncomeData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form to initial state
  const resetForm = () => {
    setIncomeData({
      id: "",
      wages: "",
      secondaryIncome: "",
      interest: "",
      supportPayment: "",
      others: ""
    });
    setMode("add");
  };

  // Submit or update income record
  const submitIncome = async (event) => {
    event.preventDefault();

    const payload = {
      ...incomeData,
      id: incomeData.id.trim(),
      wages: parseFloat(incomeData.wages),
      secondaryIncome: parseFloat(incomeData.secondaryIncome),
      interest: parseFloat(incomeData.interest),
      supportPayment: parseFloat(incomeData.supportPayment),
      others: parseFloat(incomeData.others)
    };

    try {
      let res;
      if (mode === "edit") {
        res = await fetch(`${API_BASE}/income/${incomeData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API_BASE}/income`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();

      if (!res.ok) {
        setResponse({ error: data.error || `Error ${res.status}`, source: "submit" });
      } else {
        setResponse({ data, source: "submit" });
        resetForm();
      }
    } catch (err) {
      setResponse({ error: "Network error", source: "submit" });
    }
  };

  // Load existing income record by ID for editing
  const loadIncome = async () => {
    if (!incomeData.id) {
      setResponse({ error: "Please enter ID to load", source: "load" });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/income/${incomeData.id.trim()}`);
      const data = await res.json();

      if (!res.ok) {
        setResponse({ error: data.error || "Income not found!", source: "load" });
        resetForm();
      } else {
        setIncomeData({
          id: data.id,
          wages: data.wages,
          secondaryIncome: data.secondaryIncome,
          interest: data.interest,
          supportPayment: data.supportPayment,
          others: data.others
        });
        setMode("edit");
        setResponse({ data: { message: "Income loaded. You can now update." }, source: "load" });
      }
    } catch (err) {
      setResponse({ error: "Failed to load income", source: "load" });
    }
  };

  // Delete income data by ID
  const deleteIncome = async () => {
    if (!incomeData.id) {
      setResponse({ error: "Please enter ID to delete", source: "delete" });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/income/${incomeData.id.trim()}`, {
        method: "DELETE"
      });
      const data = await res.json();

      if (!res.ok) {
        setResponse({ error: data.error || "Failed to delete income", source: "delete" });
      } else {
        setResponse({ data: data.message, source: "delete" });
        resetForm();
      }
    } catch (err) {
      setResponse({ error: "Failed to delete income", source: "delete" });
    }
  };

  // reset id field and message 
  const resetIdField = () => {
  setResponse(null); 
  setIncomeData((prev) => ({
      ...prev,
      id: ""            
    }));
  };

  return (
    <div className="income-container">
      <h1 className="section-title">Income Management</h1>
      <form onSubmit={submitIncome}>
        <div className="id-row">
          <input
            name="id"
            placeholder="ID"
            value={incomeData.id}
            onChange={updateField}
            onFocus={resetIdField}
            className="input"
            required
          />
          <button type="button" onClick={loadIncome} className="button">Load to Update</button>
          <button type="button" onClick={deleteIncome} className="button delete">Delete</button>
        </div>

        {response && response.source !== "submit" && (
          <div className="message">
            {response.error || response.data?.message || response.data}
          </div>
        )}

        {["wages", "secondaryIncome", "interest", "supportPayment", "others"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
            value={incomeData[field]}
            onChange={updateField}
            className="input"
            required
          />
        ))}

        <div className="submit-container">
          <button type="submit" className="button submit">
            {mode === "edit" ? "Update" : "Submit"}
          </button>
        </div>

        {response && response.source === "submit" && (
          <div className="message">
            {response.error || response.data?.message || response.data}
          </div>
        )}
      </form>
    </div>
  );
};

export default Income;
