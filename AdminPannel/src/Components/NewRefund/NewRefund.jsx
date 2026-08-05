import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose, IoChevronDownOutline, IoSearchOutline } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi"; // Updated icon import
import "./NewRefund.css";

const NewRefund = ({ onClose }) => {
  const navigate = useNavigate();

  // Form States
  const [orderId, setOrderId] = useState("");
  const [customer, setCustomer] = useState("");
  const [refundAmount, setRefundAmount] = useState("0.00");
  const [refundReason, setRefundReason] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [refundTo, setRefundTo] = useState("");
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState(null);

  // Close Button Handler
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1); // Go back in history if opened via route /newrefund
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const refundData = {
      orderId,
      customer,
      refundAmount,
      refundReason,
      paymentMethod,
      refundTo,
      notes,
      attachments,
    };
    console.log("Submitting Refund:", refundData);
    handleClose();
  };

  return (
    <div className="new-refund-overlay" onClick={handleClose}>
      <div className="new-refund-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="new-refund-header">
          <div>
            <h2 className="new-refund-title">New Refund</h2>
            <p className="new-refund-subtitle">
              Create a new refund for a customer order
            </p>
          </div>
          <button
            type="button"
            className="new-refund-close-btn"
            onClick={handleClose}
            aria-label="Close"
          >
            <IoClose />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="new-refund-form">
          {/* Row 1: Order ID & Customer */}
          <div className="new-refund-row">
            <div className="new-refund-field">
              <label className="new-refund-label">
                Order ID <span className="req">*</span>
              </label>
              <div className="new-refund-input-wrap">
                <input
                  type="text"
                  placeholder="Select order ID"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="new-refund-input"
                  required
                />
                <div className="new-refund-input-icons">
                  <IoSearchOutline className="icon-search" />
                  <IoChevronDownOutline className="icon-chevron" />
                </div>
              </div>
            </div>

            <div className="new-refund-field">
              <label className="new-refund-label">Customer</label>
              <input
                type="text"
                placeholder="Select an order first"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="new-refund-input disabled"
                disabled
              />
            </div>
          </div>

          {/* Row 2: Refund Amount & Refund Reason */}
          <div className="new-refund-row">
            <div className="new-refund-field">
              <label className="new-refund-label">
                Refund Amount <span className="req">*</span>
              </label>
              <div className="new-refund-amount-wrap">
                <span className="currency-symbol">₹</span>
                <input
                  type="text"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="new-refund-input amount-input"
                  required
                />
              </div>
            </div>

            <div className="new-refund-field">
              <label className="new-refund-label">
                Refund Reason <span className="req">*</span>
              </label>
              <div className="new-refund-select-wrap">
                <select
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="new-refund-select"
                  required
                >
                  <option value="" disabled hidden>
                    Select refund reason
                  </option>
                  <option value="damaged">Damaged Item</option>
                  <option value="wrong_item">Wrong Item Delivered</option>
                  <option value="customer_cancel">Customer Cancelled</option>
                  <option value="other">Other</option>
                </select>
                <IoChevronDownOutline className="icon-select-chevron" />
              </div>
            </div>
          </div>

          {/* Row 3: Payment Method & Refund To */}
          <div className="new-refund-row">
            <div className="new-refund-field">
              <label className="new-refund-label">Payment Method</label>
              <div className="new-refund-select-wrap">
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="new-refund-select"
                >
                  <option value="" disabled hidden>
                    Select payment method
                  </option>
                  <option value="upi">UPI / GPay</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="netbanking">Net Banking</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
                <IoChevronDownOutline className="icon-select-chevron" />
              </div>
            </div>

            <div className="new-refund-field">
              <label className="new-refund-label">
                Refund To <span className="req">*</span>
              </label>
              <div className="new-refund-select-wrap">
                <select
                  value={refundTo}
                  onChange={(e) => setRefundTo(e.target.value)}
                  className="new-refund-select"
                  required
                >
                  <option value="" disabled hidden>
                    Select refund destination
                  </option>
                  <option value="original">Original Payment Source</option>
                  <option value="wallet">Store Wallet</option>
                  <option value="bank">Bank Transfer</option>
                </select>
                <IoChevronDownOutline className="icon-select-chevron" />
              </div>
            </div>
          </div>

          {/* Row 4: Notes (Optional) */}
          <div className="new-refund-field">
            <label className="new-refund-label">Notes (Optional)</label>
            <div className="new-refund-textarea-wrap">
              <textarea
                rows={3}
                maxLength={300}
                placeholder="Add a note about this refund..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="new-refund-textarea"
              />
              <span className="new-refund-char-counter">
                {notes.length}/300
              </span>
            </div>
          </div>

          {/* Row 5: Attachments (Optional) */}
          <div className="new-refund-field">
            <label className="new-refund-label">Attachments (Optional)</label>
            <label className="new-refund-dropzone">
              <input
                type="file"
                className="new-refund-file-input"
                onChange={(e) => setAttachments(e.target.files[0])}
                accept="image/png, image/jpeg, application/pdf"
              />
              <FiUploadCloud className="new-refund-upload-icon" />
              <div className="new-refund-upload-text">
                <span className="upload-link">Click to upload</span> or drag and drop
              </div>
              <div className="new-refund-upload-subtext">
                PNG, JPG, PDF up to 5MB
              </div>
            </label>
          </div>

          {/* Footer Actions */}
          <div className="new-refund-actions">
            <button
              type="button"
              className="new-refund-btn-cancel"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className="new-refund-btn-submit">
              Create Refund
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRefund;