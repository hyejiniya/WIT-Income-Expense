/**
 * Expense Management Component
 *
 * - Create, update, and delete expense records by user ID
 * - Each record includes categorized expense fields (savings, housing, etc.)
 * - Supports form reset and validation logic
 */

import React, { useState } from "react";
import "../styles/common.css";
import "../styles/Expenses.css";

const API_BASE = process.env.REACT_APP_API_URL;

const Expenses = () => {
  // Store all expense form data
  const [expensesData, setExpensesData] = useState({
    id: "",
    savings: {
      rrsp: "",
      investmentSavings: "",
      longTermSavings: "",
      bonds: "",
      others: "",
    },
    paymentObligations: {
      creditCard: "",
      loan: "",
      vehicleLease: "",
      lineOfCredit: "",
    },
    insurance: {
      lifeInsurance: "",
      healthInsurance: "",
      others: "",
    },
    housing: {
      rent: "",
      rentInsurance: "",
      storageAndParking: "",
      utilities: "",
      maintenance: "",
    },
    utilities: {
      phone: "",
      internet: "",
      water: "",
      heat: "",
      electricity: "",
      cable: "",
      others: "",
    },
    personal: {
      transportation: "",
      clothing: "",
      giftsFamily: "",
      personalGrooming: "",
      diningOut: "",
      hobbies: "",
      others: "",
    },
  });

  const [response, setResponse] = useState(null);
  const [mode, setMode] = useState("add");
  const [loadMessage, setLoadMessage] = useState("");

  // Update specific expense field by category
  const updateExpenseField = (category, field, value) => {
    setExpensesData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  // Store the entered ID
  const storeEnteredId = (event) => {
    setExpensesData((prev) => ({
      ...prev,
      id: event.target.value.trim(),
    }));
  };

  // Reset all form fields
  const resetForm = () => {
    setExpensesData({
      id: "",
      savings: {
        rrsp: "",
        investmentSavings: "",
        longTermSavings: "",
        bonds: "",
        others: "",
      },
      paymentObligations: {
        creditCard: "",
        loan: "",
        vehicleLease: "",
        lineOfCredit: "",
      },
      insurance: {
        lifeInsurance: "",
        healthInsurance: "",
        others: "",
      },
      housing: {
        rent: "",
        rentInsurance: "",
        storageAndParking: "",
        utilities: "",
        maintenance: "",
      },
      utilities: {
        phone: "",
        internet: "",
        water: "",
        heat: "",
        electricity: "",
        cable: "",
        others: "",
      },
      personal: {
        transportation: "",
        clothing: "",
        giftsFamily: "",
        personalGrooming: "",
        diningOut: "",
        hobbies: "",
        others: "",
      },
    });
    setMode("add");
    setLoadMessage("");
  };

  // Check if ID already exists
  const checkIfIdExists = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/expenses/${id}`);
      
      if (!res.ok) return false;
      const data = await res.json();
      return !!data.id;
    } catch {
      return false;
    }
  };

  // Submit form data (POST/PUT)
  const submitExpenseForm = async (event) => {
    event.preventDefault();
    setResponse(null);

    const payload = {
      id: expensesData.id.trim(),
      Savings: expensesData.savings,
      PaymentObligations: expensesData.paymentObligations,
      Insurance: expensesData.insurance,
      Housing: expensesData.housing,
      Utilities: expensesData.utilities,
      Personal: expensesData.personal,
    };

    try {
      let res;

      if (mode === "add") {
        const exists = await checkIfIdExists(expensesData.id);
        if (exists) {
          setResponse({ error: "This ID already exists. Please use a different ID.", source: "submit" });
          return;
        }
      }

      if (mode === "edit" && expensesData.id) {
        res = await fetch(`${API_BASE}/expenses/${expensesData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/expenses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        setResponse({ error: data.error || `Failed with status ${res.status}`, source: "submit" });
      } else {
        setResponse({ data, source: "submit" });
        resetForm();
      }
    } catch (error) {
      setResponse({ error: "Failed to submit expenses.", source: "submit" });
    }
  };

  // Fetch and preload expense by ID
  const loadExpenseToEdit = async () => {
    try {
      const res = await fetch(`${API_BASE}/expenses/${expensesData.id}`);
      const data = await res.json();

      if (!res.ok || !data.id) {
        setLoadMessage("No expense found for the entered ID!");
        return;
      }

      setExpensesData({
        id: data.id,
        savings: data.Savings || {},
        paymentObligations: data.PaymentObligations || {},
        insurance: data.Insurance || {},
        housing: data.Housing || {},
        utilities: data.Utilities || {},
        personal: data.Personal || {},
      });

      setMode("edit");
      setResponse(null);
      setLoadMessage("");
    } catch (error) {
      setLoadMessage("No expense found for the entered ID.");
    }
  };

  // Delete expense by ID
  const deleteExpense = async () => {
    setResponse(null);

    if (!expensesData.id) {
      setResponse({ error: "Please enter your ID!", source: "delete" });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/expenses/${expensesData.id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        setResponse({ error: data.error || "Failed to delete expense.", source: "delete" });
      } else {
        setResponse({ data, source: "delete" });
        resetForm();
      }
    } catch {
      setResponse({ error: "Failed to delete expense!", source: "delete" });
    }
  };

  // Render input fields for a category box
  const renderBox = (title, fields, categoryKey) => (
    <div className="expense-box">
      <h3>{title}</h3>
      {Object.entries(fields).map(([field, value]) => (
        <input
          key={field}
          placeholder={field === "rrsp" ? "RRSP" : field.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
          value={value ?? ""}
          onChange={(event) => updateExpenseField(categoryKey, field, event.target.value)}
          className="input"
        />
      ))}
    </div>
  );

  // reset id field and message 
  const resetIdField = () => {
    setLoadMessage("");
    setResponse(null);
    setExpensesData((prev) => ({
      ...prev,
      id: ""
    }));
  };

  return (
    <div className="expenses-container">
      <h1 className="section-title">Expense Management</h1>

      <form onSubmit={submitExpenseForm}>
        <div className="id-row">
          <input
            type="text"
            placeholder="ID"
            value={expensesData.id}
            onChange={storeEnteredId}
            onFocus={resetIdField}
            className="input id-input"
            required
          />
          <button type="button" onClick={loadExpenseToEdit} className="button">Load to Update</button>
          <button type="button" onClick={deleteExpense} className="button delete">Delete</button>
        </div>

        {loadMessage && <div className="message error">{loadMessage}</div>}
        {response?.source === "delete" && (
          <div className={`message ${response.error ? "error" : "success"}`}>
            {response.error ?? response.data?.message}
          </div>
        )}

        <div className="expenses-grid-two-by-three">
          {renderBox("Savings", expensesData.savings, "savings")}
          {renderBox("Insurance", expensesData.insurance, "insurance")}
          {renderBox("Payment Obligations", expensesData.paymentObligations, "paymentObligations")}
          {renderBox("Housing", expensesData.housing, "housing")}
          {renderBox("Utilities", expensesData.utilities, "utilities")}
          {renderBox("Personal", expensesData.personal, "personal")}
        </div>

        <div className="submit-container">
          <button type="submit" className="button submit">{mode === "edit" ? "Update" : "Submit"}</button>
        </div>
      </form>

      {response?.source === "submit" && (
        <div className={`message ${response.error ? "error" : "success"}`}>
          {response.error ?? response.data?.message ?? "Unknown response"}
        </div>
      )}
    </div>
  );
};

export default Expenses;
