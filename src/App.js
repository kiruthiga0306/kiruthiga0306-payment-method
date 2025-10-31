
import React, { useState, useEffect } from "react";
const styles = {
  container: { maxWidth: 720, margin: "30px auto", fontFamily: "Arial, sans-serif" },
  card: { padding: 18, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: 16, background: "#fff" },
  heading: { fontSize: 26, marginBottom: 12 },
  label: { display: "block", margin: "8px 0", cursor: "pointer" },
  radioRow: { display: "flex", gap: 12, alignItems: "center", marginBottom: 8 },
  btn: { padding: "8px 14px", borderRadius: 6, border: "1px solid #1976d2", background: "#1976d2", color: "#fff", cursor: "pointer" },
  summary: { marginTop: 12, padding: 12, borderRadius: 6, background: "#f5f7fb" },
  note: { color: "#666", marginTop: 8, fontSize: 13 },
};
export default function PaymentMethod() {
  const [method, setMethod] = useState(localStorage.getItem("paymentMethod") || "");
  const [savedMessage, setSavedMessage] = useState("");
  useEffect(() => {
  }, []);
  function handleSelect(e) {
    setMethod(e.target.value);
    setSavedMessage(""); 
  }
  function handleSave() {
    if (!method) {
      setSavedMessage("Please select a payment method.");
      return;
    }
    localStorage.setItem("paymentMethod", method);
    setSavedMessage("Payment method saved ✓");
    setTimeout(() => setSavedMessage(""), 2500);
  }
  function handleClear() {
    localStorage.removeItem("paymentMethod");
    setMethod("");
    setSavedMessage("Cleared saved method.");
    setTimeout(() => setSavedMessage(""), 1800);
  }
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.heading}>Payment Method Selection</div>
        <div style={{ marginBottom: 8 }}>
          Choose one payment method for checkout. The selection is stored and shown in summary.
        </div>
        <div role="radiogroup" aria-label="Payment methods">
          <div style={styles.radioRow}>
            <input
              id="cod"
              type="radio"
              name="pay"
              value="Cash on Delivery"
              checked={method === "Cash on Delivery"}
              onChange={handleSelect}
            />
            <label htmlFor="cod" style={styles.label}>Cash on Delivery</label>
          </div>
          <div style={styles.radioRow}>
            <input
              id="upi"
              type="radio"
              name="pay"
              value="UPI"
              checked={method === "UPI"}
              onChange={handleSelect}
            />
            <label htmlFor="upi" style={styles.label}>UPI</label>
          </div>
          <div style={styles.radioRow}>
            <input
              id="card"
              type="radio"
              name="pay"
              value="Debit/Credit Card"
              checked={method === "Debit/Credit Card"}
              onChange={handleSelect}
            />
            <label htmlFor="card" style={styles.label}>Debit / Credit Card</label>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <button style={styles.btn} onClick={handleSave}>Save Method</button>
          <button
            style={{ ...styles.btn, marginLeft: 8, background: "#fff", color: "#1976d2", border: "1px solid #1976d2" }}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
        {savedMessage && <div style={{ marginTop: 10, color: savedMessage.includes("Please") ? "#c0392b" : "#2e7d32" }}>{savedMessage}</div>}
        <div style={styles.note}>
          Stored method also saved to <code>localStorage</code> so it persists if you refresh the page.
        </div>
      </div>
      <div style={styles.card}>
        <div style={{ fontWeight: 600 }}>Summary</div>
        <div style={styles.summary}>
          <div><strong>Selected payment method:</strong></div>
          <div style={{ marginTop: 8, fontSize: 18 }}>{method || <em>No method selected</em>}</div>
        </div>
        <div style={{ marginTop: 12 }}>
          <small>Use this selected method on the checkout page or show it in the order summary.</small>
        </div>
      </div>
    </div>
  );
}
