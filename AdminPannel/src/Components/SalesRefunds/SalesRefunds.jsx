
import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiPlus,
  FiEye,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiCalendar,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";

import api from "../../api/axios";
import "./SalesRefunds.css";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";

const DEFAULT_ITEM_IMAGE =
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=100&q=80";

const SalesRefunds = () => {
  // =========================================================
  // REFUNDS
  // =========================================================

  const [refunds, setRefunds] = useState([]);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // =========================================================
  // STATISTICS
  // =========================================================

  const [stats, setStats] = useState({
    totalRefunds: 0,
    approvedRefunds: 0,
    pendingRefunds: 0,
    rejectedRefunds: 0,
    thisMonthRefunds: 0,
    approvedPercentage: 0,
    pendingPercentage: 0,
    rejectedPercentage: 0,
  });

  // =========================================================
  // FILTERS
  // =========================================================

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [paymentFilter, setPaymentFilter] =
    useState("All Payment Methods");

  const [reasonFilter, setReasonFilter] =
    useState("All Refund Reasons");

  // =========================================================
  // DETAILS PANEL
  // =========================================================

  const [selectedRefund, setSelectedRefund] =
    useState(null);

  // =========================================================
  // PAGINATION
  // =========================================================

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  // =========================================================
  // SELECTION
  // =========================================================

  const [selectAll, setSelectAll] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);

  // =========================================================
  // ACTION MENU
  // =========================================================

  const [activeMenuId, setActiveMenuId] = useState(null);

  // =========================================================
  // ADD REFUND MODAL
  // =========================================================

  const [showAddModal, setShowAddModal] = useState(false);

  const [newRefundForm, setNewRefundForm] = useState({
    orderId: "",
    customerName: "",
    customerEmail: "",
    amount: "",
    reason: "Changed mind",
    status: "Pending",
    paymentMethod: "Original Payment Method",
    note: "",
    itemName: "",
    itemQty: 1,
  });

  // =========================================================
  // FORMAT CURRENCY
  // =========================================================

  const formatCurrency = (amount) => {
    return `$${Number(amount || 0).toFixed(2)}`;
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================================================
  // FETCH ALL REFUNDS
  // =========================================================

  const fetchRefunds = async () => {
    try {
      setLoading(true);

      const response = await api.get("/refunds");

      if (response.data?.success) {
        setRefunds(response.data.data || []);
      } else {
        setRefunds([]);
      }
    } catch (error) {
      console.error("FETCH REFUNDS ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load refunds."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH REFUND STATISTICS
  // =========================================================

  const fetchRefundStats = async () => {
    try {
      const response = await api.get("/refunds/stats");

      if (response.data?.success) {
        setStats({
          totalRefunds:
            response.data.data?.totalRefunds || 0,

          approvedRefunds:
            response.data.data?.approvedRefunds || 0,

          pendingRefunds:
            response.data.data?.pendingRefunds || 0,

          rejectedRefunds:
            response.data.data?.rejectedRefunds || 0,

          thisMonthRefunds:
            response.data.data?.thisMonthRefunds || 0,

          approvedPercentage:
            response.data.data?.approvedPercentage || 0,

          pendingPercentage:
            response.data.data?.pendingPercentage || 0,

          rejectedPercentage:
            response.data.data?.rejectedPercentage || 0,
        });
      }
    } catch (error) {
      console.error(
        "FETCH REFUND STATS ERROR:",
        error
      );
    }
  };

  // =========================================================
  // INITIAL API LOAD
  // =========================================================

  useEffect(() => {
    fetchRefunds();
    fetchRefundStats();
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // =========================================================
  // FILTER LOGIC
  // =========================================================

  const filteredRefunds = refunds.filter((item) => {
    const refundId =
      item.refundId ||
      item.id ||
      "";

    const orderId =
      item.orderId || "";

    const customerName =
      item.customerName || "";

    const customerEmail =
      item.customerEmail || "";

    const reason =
      item.reason || "";

    const paymentMethod =
      item.paymentMethod || "";

    const status =
      item.status || "";

    const search =
      searchTerm.toLowerCase().trim();

    const matchesSearch =
      refundId
        .toLowerCase()
        .includes(search) ||
      orderId
        .toLowerCase()
        .includes(search) ||
      customerName
        .toLowerCase()
        .includes(search) ||
      customerEmail
        .toLowerCase()
        .includes(search);

    const matchesStatus =
      statusFilter === "All Status" ||
      status === statusFilter;

    const matchesPayment =
      paymentFilter ===
        "All Payment Methods" ||
      paymentMethod === paymentFilter;

    const matchesReason =
      reasonFilter ===
        "All Refund Reasons" ||
      reason === reasonFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPayment &&
      matchesReason
    );
  });

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages =
    Math.ceil(
      filteredRefunds.length / rowsPerPage
    ) || 1;

  const indexOfLastRow =
    currentPage * rowsPerPage;

  const indexOfFirstRow =
    indexOfLastRow - rowsPerPage;

  const currentRows =
    filteredRefunds.slice(
      indexOfFirstRow,
      indexOfLastRow
    );

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages
    ) {
      setCurrentPage(pageNumber);
    }
  };

  // =========================================================
  // SELECT ALL
  // =========================================================

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedRows([]);
      return;
    }

    setSelectAll(true);

    setSelectedRows(
      currentRows.map(
        (refund) => refund._id
      )
    );
  };

  // =========================================================
  // SELECT INDIVIDUAL ROW
  // =========================================================

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(
        selectedRows.filter(
          (rowId) => rowId !== id
        )
      );
    } else {
      setSelectedRows([
        ...selectedRows,
        id,
      ]);
    }
  };

  // =========================================================
  // EXPORT CSV
  // =========================================================

  const handleExport = () => {
    if (!filteredRefunds.length) {
      alert("No refund records to export.");
      return;
    }

    const headers =
      "Refund ID,Order ID,Customer,Amount,Reason,Status,Date";

    const rows = filteredRefunds.map((refund) => {
      const refundId =
        refund.refundId || "";

      const orderId =
        refund.orderId || "";

      const customerName =
        refund.customerName || "";

      const amount =
        formatCurrency(refund.amount);

      const reason =
        refund.reason || "";

      const status =
        refund.status || "";

      const date =
        formatDate(refund.refundDate);

      return [
        refundId,
        orderId,
        `"${customerName}"`,
        amount,
        `"${reason}"`,
        status,
        `"${date}"`,
      ].join(",");
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].join("\n");

    const encodedUri =
      encodeURI(csvContent);

    const link =
      document.createElement("a");

    link.setAttribute(
      "href",
      encodedUri
    );

    link.setAttribute(
      "download",
      "sales_refunds_report.csv"
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // =========================================================
  // ADD REFUND
  // =========================================================

  const handleAddRefundSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const cleanAmount =
        Number(
          String(newRefundForm.amount)
            .replace("$", "")
            .replace(",", "")
            .trim()
        );

      if (
        Number.isNaN(cleanAmount) ||
        cleanAmount < 0
      ) {
        alert(
          "Please enter a valid refund amount."
        );

        return;
      }

      const payload = {
        orderId:
          newRefundForm.orderId.trim(),

        customerName:
          newRefundForm.customerName.trim(),

        customerEmail:
          newRefundForm.customerEmail
            .trim(),

        amount: cleanAmount,

        reason:
          newRefundForm.reason,

        status:
          newRefundForm.status,

        paymentMethod:
          newRefundForm.paymentMethod,

        cardLast4: "9999",

        note:
          newRefundForm.note.trim(),

        itemName:
          newRefundForm.itemName.trim(),

        itemQty:
          Number(newRefundForm.itemQty) || 1,

        avatar:
          DEFAULT_AVATAR,
      };

      const response =
        await api.post(
          "/refunds",
          payload
        );

      if (response.data?.success) {
        const createdRefund =
          response.data.data;

        // Add returned MongoDB record
        // directly to table
        setRefunds((prev) => [
          createdRefund,
          ...prev,
        ]);

        // Open details panel
        setSelectedRefund(
          createdRefund
        );

        // Close modal
        setShowAddModal(false);

        // Reset pagination
        setCurrentPage(1);

        // Reset form
        setNewRefundForm({
          orderId: "",
          customerName: "",
          customerEmail: "",
          amount: "",
          reason: "Changed mind",
          status: "Pending",
          paymentMethod:
            "Original Payment Method",
          note: "",
          itemName: "",
          itemQty: 1,
        });

        // Refresh statistics
        await fetchRefundStats();

        alert(
          "Refund created successfully!"
        );
      }
    } catch (error) {
      console.error(
        "CREATE REFUND ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to create refund."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // UPDATE REFUND STATUS
  // =========================================================

  const handleUpdateStatus = async (
    id,
    newStatus,
    e
  ) => {
    e.stopPropagation();

    try {
      const response =
        await api.put(
          `/refunds/${id}`,
          {
            status: newStatus,
          }
        );

      if (response.data?.success) {
        const updatedRefund =
          response.data.data;

        setRefunds((prev) =>
          prev.map((refund) =>
            refund._id === id
              ? updatedRefund
              : refund
          )
        );

        if (
          selectedRefund &&
          selectedRefund._id === id
        ) {
          setSelectedRefund(
            updatedRefund
          );
        }

        // Refresh cards
        await fetchRefundStats();

        setActiveMenuId(null);

        alert(
          `Refund marked as ${newStatus}.`
        );
      }
    } catch (error) {
      console.error(
        "UPDATE REFUND ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update refund."
      );
    }
  };

  // =========================================================
  // DELETE REFUND
  // =========================================================

  const handleDeleteRefund = async (
    id,
    e
  ) => {
    e.stopPropagation();

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this refund?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await api.delete(
          `/refunds/${id}`
        );

      if (response.data?.success) {
        setRefunds((prev) =>
          prev.filter(
            (refund) =>
              refund._id !== id
          )
        );

        if (
          selectedRefund &&
          selectedRefund._id === id
        ) {
          setSelectedRefund(null);
        }

        setSelectedRows((prev) =>
          prev.filter(
            (rowId) => rowId !== id
          )
        );

        await fetchRefundStats();

        setActiveMenuId(null);

        alert(
          "Refund deleted successfully."
        );
      }
    } catch (error) {
      console.error(
        "DELETE REFUND ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete refund."
      );
    }
  };

  // =========================================================
  // RESET FILTERS
  // =========================================================

  const resetFilters = () => {
    setStatusFilter("All Status");

    setPaymentFilter(
      "All Payment Methods"
    );

    setReasonFilter(
      "All Refund Reasons"
    );

    setSearchTerm("");

    setCurrentPage(1);
  };

  // =========================================================
  // OPEN ADD MODAL
  // =========================================================

  const openAddModal = () => {
    setNewRefundForm({
      orderId: "",
      customerName: "",
      customerEmail: "",
      amount: "",
      reason: "Changed mind",
      status: "Pending",
      paymentMethod:
        "Original Payment Method",
      note: "",
      itemName: "",
      itemQty: 1,
    });

    setShowAddModal(true);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="sales-refunds-wrapper">

      {/* =====================================================
          TOP METRIC CARDS
      ====================================================== */}

      <div className="sales-refunds-metrics-grid">

        {/* TOTAL */}
        <div className="sales-refunds-metric-card">
          <div className="sales-refunds-metric-icon-box purple">
            <FiDollarSign className="sales-refunds-metric-icon" />
          </div>

          <div className="sales-refunds-metric-content">
            <span className="sales-refunds-metric-title">
              Total Refunds
            </span>

            <h3 className="sales-refunds-metric-value">
              {formatCurrency(
                stats.totalRefunds
              )}
            </h3>

            <span className="sales-refunds-metric-sub">
              All time
            </span>
          </div>
        </div>

        {/* APPROVED */}
        <div className="sales-refunds-metric-card">
          <div className="sales-refunds-metric-icon-box green">
            <FiCheckCircle className="sales-refunds-metric-icon" />
          </div>

          <div className="sales-refunds-metric-content">
            <span className="sales-refunds-metric-title">
              Approved Refunds
            </span>

            <h3 className="sales-refunds-metric-value">
              {formatCurrency(
                stats.approvedRefunds
              )}
            </h3>

            <span className="sales-refunds-metric-sub green-text">
              {Number(
                stats.approvedPercentage
              ).toFixed(2)}
              % of total
            </span>
          </div>
        </div>

        {/* PENDING */}
        <div className="sales-refunds-metric-card">
          <div className="sales-refunds-metric-icon-box orange">
            <FiClock className="sales-refunds-metric-icon" />
          </div>

          <div className="sales-refunds-metric-content">
            <span className="sales-refunds-metric-title">
              Pending Refunds
            </span>

            <h3 className="sales-refunds-metric-value">
              {formatCurrency(
                stats.pendingRefunds
              )}
            </h3>

            <span className="sales-refunds-metric-sub">
              {Number(
                stats.pendingPercentage
              ).toFixed(2)}
              % of total
            </span>
          </div>
        </div>

        {/* REJECTED */}
        <div className="sales-refunds-metric-card">
          <div className="sales-refunds-metric-icon-box red">
            <FiXCircle className="sales-refunds-metric-icon" />
          </div>

          <div className="sales-refunds-metric-content">
            <span className="sales-refunds-metric-title">
              Rejected Refunds
            </span>

            <h3 className="sales-refunds-metric-value">
              {formatCurrency(
                stats.rejectedRefunds
              )}
            </h3>

            <span className="sales-refunds-metric-sub">
              {Number(
                stats.rejectedPercentage
              ).toFixed(2)}
              % of total
            </span>
          </div>
        </div>

        {/* THIS MONTH */}
        <div className="sales-refunds-metric-card">
          <div className="sales-refunds-metric-icon-box blue">
            <FiCalendar className="sales-refunds-metric-icon" />
          </div>

          <div className="sales-refunds-metric-content">
            <span className="sales-refunds-metric-title">
              This Month Refunds
            </span>

            <h3 className="sales-refunds-metric-value">
              {formatCurrency(
                stats.thisMonthRefunds
              )}
            </h3>

            <span className="sales-refunds-metric-sub">
              {new Date().toLocaleString(
                "en-US",
                {
                  month: "long",
                  year: "numeric",
                }
              )}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTER BAR
      ====================================================== */}

      <div className="sales-refunds-action-bar">

        <div className="sales-refunds-search-wrapper">
          <FiSearch className="sales-refunds-search-icon" />

          <input
            type="text"
            placeholder="Search by Order ID, Customer, Email..."
            value={searchTerm}
            onChange={handleSearch}
            className="sales-refunds-search-input"
          />
        </div>

        <div className="sales-refunds-filters-group">

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
            className="sales-refunds-dropdown"
          >
            <option value="All Status">
              All Status
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => {
              setPaymentFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
            className="sales-refunds-dropdown"
          >
            <option value="All Payment Methods">
              All Payment Methods
            </option>

            <option value="Original Payment Method">
              Original Payment Method
            </option>

            <option value="Credit Card">
              Credit Card
            </option>

            <option value="PayPal">
              PayPal
            </option>
          </select>

          <select
            value={reasonFilter}
            onChange={(e) => {
              setReasonFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
            className="sales-refunds-dropdown"
          >
            <option value="All Refund Reasons">
              All Refund Reasons
            </option>

            <option value="Changed mind">
              Changed mind
            </option>

            <option value="Product not as described">
              Product not as described
            </option>

            <option value="Damaged product">
              Damaged product
            </option>

            <option value="Wrong item received">
              Wrong item received
            </option>

            <option value="Size issue">
              Size issue
            </option>

            <option value="Not satisfied">
              Not satisfied
            </option>

            <option value="Better price available">
              Better price available
            </option>

            <option value="Ordered by mistake">
              Ordered by mistake
            </option>
          </select>

          <button
            type="button"
            className="sales-refunds-btn secondary"
            onClick={resetFilters}
          >
            <FiFilter />
            Filter
          </button>

          <button
            type="button"
            className="sales-refunds-btn secondary"
            onClick={handleExport}
          >
            <FiDownload />
            Export
          </button>

          <button
            type="button"
            className="sales-refunds-btn primary"
            onClick={openAddModal}
          >
            <FiPlus />
            New Refund
          </button>
        </div>
      </div>

      {/* =====================================================
          TABLE + DETAILS PANEL
      ====================================================== */}

      <div
        className={`sales-refunds-content-layout ${
          selectedRefund
            ? "with-panel"
            : "full-width"
        }`}
      >

        {/* TABLE */}
        <div className="sales-refunds-table-container">

          <table className="sales-refunds-table">

            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={
                      handleSelectAll
                    }
                  />
                </th>

                <th>Refund ID</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Refund Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    style={{
                      textAlign:
                        "center",
                      padding: "40px",
                    }}
                  >
                    Loading refunds...
                  </td>
                </tr>
              ) : currentRows.length > 0 ? (

                currentRows.map(
                  (refund) => (
                    <tr
                      key={refund._id}
                      className={
                        selectedRefund?._id ===
                        refund._id
                          ? "active-row"
                          : ""
                      }
                      onClick={() =>
                        setSelectedRefund(
                          refund
                        )
                      }
                    >

                      {/* CHECKBOX */}
                      <td
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(
                            refund._id
                          )}
                          onChange={() =>
                            handleSelectRow(
                              refund._id
                            )
                          }
                        />
                      </td>

                      {/* REFUND ID */}
                      <td className="sales-refunds-id-text">
                        {refund.refundId}
                      </td>

                      {/* ORDER ID */}
                      <td className="sales-refunds-order-id">
                        {refund.orderId}
                      </td>

                      {/* CUSTOMER */}
                      <td>
                        <div className="sales-refunds-customer-cell">

                          <img
                            src={
                              refund.avatar ||
                              DEFAULT_AVATAR
                            }
                            alt={
                              refund.customerName
                            }
                            className="sales-refunds-avatar"
                          />

                          <div>
                            <span className="sales-refunds-cust-name">
                              {
                                refund.customerName
                              }
                            </span>

                            <span className="sales-refunds-cust-email">
                              {
                                refund.customerEmail
                              }
                            </span>
                          </div>

                        </div>
                      </td>

                      {/* AMOUNT */}
                      <td className="sales-refunds-amount">
                        {formatCurrency(
                          refund.amount
                        )}
                      </td>

                      {/* REASON */}
                      <td className="sales-refunds-reason">
                        {refund.reason}
                      </td>

                      {/* STATUS */}
                      <td>
                        <span
                          className={`sales-refunds-status-badge ${
                            refund.status?.toLowerCase() ||
                            "pending"
                          }`}
                        >
                          {refund.status}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="sales-refunds-date">
                        {formatDate(
                          refund.refundDate
                        )}
                      </td>

                      {/* ACTION */}
                      <td>

                        <div
                          className="sales-refunds-action-icons"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >

                          {/* VIEW */}
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedRefund(
                                refund
                              )
                            }
                            aria-label="View"
                            title="View Details"
                          >
                            <FiEye />
                          </button>

                          <div className="sales-refunds-dropdown-menu-wrapper">

                            {/* MORE */}
                            <button
                              type="button"
                              aria-label="More"
                              title="Actions"
                              onClick={() =>
                                setActiveMenuId(
                                  activeMenuId ===
                                    refund._id
                                    ? null
                                    : refund._id
                                )
                              }
                            >
                              <FiMoreVertical />
                            </button>

                            {activeMenuId ===
                              refund._id && (
                              <div className="sales-refunds-action-dropdown">

                                {/* APPROVE */}
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleUpdateStatus(
                                      refund._id,
                                      "Approved",
                                      e
                                    )
                                  }
                                >
                                  <FiCheck
                                    style={{
                                      color:
                                        "#16a34a",
                                    }}
                                  />

                                  Mark Approved
                                </button>

                                {/* REJECT */}
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleUpdateStatus(
                                      refund._id,
                                      "Rejected",
                                      e
                                    )
                                  }
                                >
                                  <FiXCircle
                                    style={{
                                      color:
                                        "#dc2626",
                                    }}
                                  />

                                  Mark Rejected
                                </button>

                                {/* DELETE */}
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    handleDeleteRefund(
                                      refund._id,
                                      e
                                    )
                                  }
                                  className="delete-action"
                                >
                                  <FiTrash2 />

                                  Delete Record
                                </button>

                              </div>
                            )}

                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                )

              ) : (

                <tr>
                  <td
                    colSpan="9"
                    style={{
                      textAlign:
                        "center",
                      padding: "30px",
                      color:
                        "#64748b",
                    }}
                  >
                    No refund records found
                    matching your filters.
                  </td>
                </tr>

              )}

            </tbody>
          </table>

          {/* =================================================
              PAGINATION
          ================================================== */}

          <div className="sales-refunds-pagination-footer">

            <span className="sales-refunds-pagination-info">
              Showing{" "}
              {filteredRefunds.length >
              0
                ? indexOfFirstRow + 1
                : 0}{" "}
              to{" "}
              {Math.min(
                indexOfLastRow,
                filteredRefunds.length
              )}{" "}
              of{" "}
              {filteredRefunds.length}{" "}
              refunds
            </span>

            <div className="sales-refunds-pagination-controls">

              {/* PREVIOUS */}
              <button
                type="button"
                onClick={() =>
                  handlePageChange(
                    currentPage - 1
                  )
                }
                disabled={
                  currentPage === 1
                }
                aria-label="Previous"
              >
                <FiChevronLeft />
              </button>

              {/* PAGE NUMBERS */}
              {[...Array(totalPages)].map(
                (_, index) => {
                  const pageNum =
                    index + 1;

                  if (
                    pageNum === 1 ||
                    pageNum ===
                      totalPages ||
                    (pageNum >=
                      currentPage - 1 &&
                      pageNum <=
                        currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        className={
                          currentPage ===
                          pageNum
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          handlePageChange(
                            pageNum
                          )
                        }
                      >
                        {pageNum}
                      </button>
                    );
                  }

                  if (
                    pageNum ===
                      currentPage - 2 ||
                    pageNum ===
                      currentPage + 2
                  ) {
                    return (
                      <span
                        key={pageNum}
                        style={{
                          padding:
                            "0 4px",
                          color:
                            "#64748b",
                        }}
                      >
                        ...
                      </span>
                    );
                  }

                  return null;
                }
              )}

              {/* NEXT */}
              <button
                type="button"
                onClick={() =>
                  handlePageChange(
                    currentPage + 1
                  )
                }
                disabled={
                  currentPage ===
                  totalPages
                }
                aria-label="Next"
              >
                <FiChevronRight />
              </button>

              {/* ROWS */}
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(
                    Number(
                      e.target.value
                    )
                  );

                  setCurrentPage(1);
                }}
                className="sales-refunds-rows-select"
              >
                <option value="5">
                  5 / page
                </option>

                <option value="10">
                  10 / page
                </option>

                <option value="20">
                  20 / page
                </option>

                <option value="50">
                  50 / page
                </option>
              </select>

            </div>
          </div>
        </div>

        {/* =================================================
            DETAILS PANEL
        ================================================== */}

        {selectedRefund && (
          <div className="sales-refunds-details-panel">

            <div className="sales-refunds-details-header">

              <h3>
                Refund Details
              </h3>

              <button
                type="button"
                className="sales-refunds-close-panel"
                onClick={() =>
                  setSelectedRefund(null)
                }
                title="Close panel"
              >
                <FiX />
              </button>

            </div>

            <div className="sales-refunds-details-body">

              {/* STATUS */}
              <div className="sales-refunds-details-row top-status">

                <div>
                  <span className="sales-refunds-details-label">
                    Refund ID
                  </span>

                  <div className="sales-refunds-details-val highlight">
                    {
                      selectedRefund.refundId
                    }
                  </div>
                </div>

                <span
                  className={`sales-refunds-status-badge ${
                    selectedRefund.status?.toLowerCase() ||
                    "pending"
                  }`}
                >
                  {
                    selectedRefund.status
                  }
                </span>

              </div>

              {/* ORDER INFORMATION */}
              <div className="sales-refunds-details-section-title">
                Order Information
              </div>

              <div className="sales-refunds-details-row">
                <span className="sales-refunds-details-label">
                  Order ID
                </span>

                <span className="sales-refunds-details-val">
                  {
                    selectedRefund.orderId
                  }
                </span>
              </div>

              <div className="sales-refunds-details-row">
                <span className="sales-refunds-details-label">
                  Refund Date
                </span>

                <span className="sales-refunds-details-val">
                  {formatDate(
                    selectedRefund.refundDate
                  )}
                </span>
              </div>

              <div className="sales-refunds-details-row">
                <span className="sales-refunds-details-label">
                  Refund Amount
                </span>

                <span className="sales-refunds-details-val red-text">
                  {formatCurrency(
                    selectedRefund.amount
                  )}
                </span>
              </div>

              {/* CUSTOMER INFORMATION */}
              <div className="sales-refunds-details-section-title">
                Customer Information
              </div>

              <div className="sales-refunds-customer-box">

                <img
                  src={
                    selectedRefund.avatar ||
                    DEFAULT_AVATAR
                  }
                  alt="Customer"
                  className="sales-refunds-avatar lg"
                />

                <div>

                  <div className="sales-refunds-cust-name lg">
                    {
                      selectedRefund.customerName
                    }
                  </div>

                  <div className="sales-refunds-cust-email">
                    {
                      selectedRefund.customerEmail
                    }
                  </div>

                  <div className="sales-refunds-cust-phone">
                    +91 98765 43210
                  </div>

                </div>
              </div>

              {/* REFUND INFORMATION */}
              <div className="sales-refunds-details-section-title">
                Refund Information
              </div>

              <div className="sales-refunds-details-row">

                <span className="sales-refunds-details-label">
                  Refund Amount
                </span>

                <span className="sales-refunds-details-val">
                  {formatCurrency(
                    selectedRefund.amount
                  )}
                </span>

              </div>

              <div className="sales-refunds-details-row">

                <span className="sales-refunds-details-label">
                  Refund Date
                </span>

                <span className="sales-refunds-details-val">
                  {formatDate(
                    selectedRefund.refundDate
                  )}
                </span>

              </div>

              <div className="sales-refunds-details-row">

                <span className="sales-refunds-details-label">
                  Refund Method
                </span>

                <span className="sales-refunds-details-val">
                  {
                    selectedRefund.paymentMethod
                  }
                </span>

              </div>

              <div className="sales-refunds-details-row">

                <span className="sales-refunds-details-label">
                  Payment Method
                </span>

                <span className="sales-refunds-details-val card-info">
                  💳 **** **** ****{" "}
                  {
                    selectedRefund.cardLast4 ||
                    "9999"
                  }
                </span>

              </div>

              <div className="sales-refunds-details-row">

                <span className="sales-refunds-details-label">
                  Reason
                </span>

                <span className="sales-refunds-details-val">
                  {
                    selectedRefund.reason
                  }
                </span>

              </div>

              <div className="sales-refunds-details-row">

                <span className="sales-refunds-details-label">
                  Note
                </span>

                <span className="sales-refunds-details-val note-text">
                  {
                    selectedRefund.note ||
                    "-"
                  }
                </span>

              </div>

              {/* ITEMS */}
              <div className="sales-refunds-details-section-title">
                Items Refunded (
                {
                  selectedRefund.itemQty ||
                  0
                }
                )
              </div>

              <div className="sales-refunds-item-card">

                <img
                  src={DEFAULT_ITEM_IMAGE}
                  alt="Item"
                  className="sales-refunds-item-thumb"
                />

                <div className="sales-refunds-item-info">

                  <span className="sales-refunds-item-name">
                    {
                      selectedRefund.itemName
                    }
                  </span>

                  <span className="sales-refunds-item-qty">
                    Qty:{" "}
                    {
                      selectedRefund.itemQty ||
                      1
                    }
                  </span>

                </div>

                <span className="sales-refunds-item-price">
                  {formatCurrency(
                    selectedRefund.amount
                  )}
                </span>

              </div>

            </div>

            <div className="sales-refunds-details-footer">

              <button
                type="button"
                className="sales-refunds-full-details-btn"
                onClick={() =>
                  alert(
                    `Opening complete details for ${
                      selectedRefund.refundId
                    }`
                  )
                }
              >
                <FiEye />
                View Full Details
              </button>

            </div>

          </div>
        )}
      </div>

      {/* =====================================================
          ADD REFUND MODAL
      ====================================================== */}

      {showAddModal && (
        <div className="sales-refunds-modal-overlay">

          <div className="sales-refunds-modal-content">

            <div className="sales-refunds-modal-header">

              <h2>
                Create New Refund Request
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowAddModal(false)
                }
                className="sales-refunds-close-modal"
              >
                <FiX />
              </button>

            </div>

            <form
              onSubmit={
                handleAddRefundSubmit
              }
              className="sales-refunds-modal-form"
            >

              {/* ORDER ID */}
              <div className="sales-refunds-modal-field">

                <label>
                  Order ID
                </label>

                <input
                  type="text"
                  placeholder="#ORD-1251"
                  value={
                    newRefundForm.orderId
                  }
                  onChange={(e) =>
                    setNewRefundForm({
                      ...newRefundForm,
                      orderId:
                        e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* CUSTOMER NAME */}
              <div className="sales-refunds-modal-field">

                <label>
                  Customer Name
                </label>

                <input
                  type="text"
                  placeholder="Enter customer name"
                  value={
                    newRefundForm.customerName
                  }
                  onChange={(e) =>
                    setNewRefundForm({
                      ...newRefundForm,
                      customerName:
                        e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* EMAIL */}
              <div className="sales-refunds-modal-field">

                <label>
                  Customer Email
                </label>

                <input
                  type="email"
                  placeholder="customer@email.com"
                  value={
                    newRefundForm.customerEmail
                  }
                  onChange={(e) =>
                    setNewRefundForm({
                      ...newRefundForm,
                      customerEmail:
                        e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* AMOUNT */}
              <div className="sales-refunds-modal-field">

                <label>
                  Refund Amount
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="150.00"
                  value={
                    newRefundForm.amount
                  }
                  onChange={(e) =>
                    setNewRefundForm({
                      ...newRefundForm,
                      amount:
                        e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* ITEM NAME */}
              <div className="sales-refunds-modal-field">

                <label>
                  Item Name
                </label>

                <input
                  type="text"
                  placeholder="Product name"
                  value={
                    newRefundForm.itemName
                  }
                  onChange={(e) =>
                    setNewRefundForm({
                      ...newRefundForm,
                      itemName:
                        e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* QUANTITY */}
              <div className="sales-refunds-modal-field">

                <label>
                  Quantity
                </label>

                <input
                  type="number"
                  min="1"
                  value={
                    newRefundForm.itemQty
                  }
                  onChange={(e) =>
                    setNewRefundForm({
                      ...newRefundForm,
                      itemQty:
                        e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* REASON */}
              <div className="sales-refunds-modal-field">

                <label>
                  Reason
                </label>

                <select
                  value={
                    newRefundForm.reason
                  }
                  onChange={(e) =>
                    setNewRefundForm({
                      ...newRefundForm,
                      reason:
                        e.target.value,
                    })
                  }
                >
                  <option value="Changed mind">
                    Changed mind
                  </option>

                  <option value="Product not as described">
                    Product not as described
                  </option>

                  <option value="Damaged product">
                    Damaged product
                  </option>

                  <option value="Wrong item received">
                    Wrong item received
                  </option>

                  <option value="Size issue">
                    Size issue
                  </option>

                  <option value="Not satisfied">
                    Not satisfied
                  </option>

                  <option value="Better price available">
                    Better price available
                  </option>

                  <option value="Ordered by mistake">
                    Ordered by mistake
                  </option>
                </select>

              </div>

              {/* STATUS */}
              <div className="sales-refunds-modal-field">

                <label>
                  Status
                </label>

                <select
                  value={
                    newRefundForm.status
                  }
                  onChange={(e) =>
                    setNewRefundForm({
                      ...newRefundForm,
                      status:
                        e.target.value,
                    })
                  }
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Approved">
                    Approved
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>
                </select>

              </div>

              {/* PAYMENT METHOD */}
              <div className="sales-refunds-modal-field">

                <label>
                  Payment Method
                </label>

                <select
                  value={
                    newRefundForm.paymentMethod
                  }
                  onChange={(e) =>
                    setNewRefundForm({
                      ...newRefundForm,
                      paymentMethod:
                        e.target.value,
                    })
                  }
                >
                  <option value="Original Payment Method">
                    Original Payment Method
                  </option>

                  <option value="Credit Card">
                    Credit Card
                  </option>

                  <option value="PayPal">
                    PayPal
                  </option>
                </select>

              </div>

              {/* NOTE */}
              <div className="sales-refunds-modal-field">

                <label>
                  Note / Description
                </label>

                <textarea
                  rows="3"
                  placeholder="Enter refund description..."
                  value={
                    newRefundForm.note
                  }
                  onChange={(e) =>
                    setNewRefundForm({
                      ...newRefundForm,
                      note:
                        e.target.value,
                    })
                  }
                />

              </div>

              {/* ACTIONS */}
              <div className="sales-refunds-modal-actions">

                <button
                  type="button"
                  className="sales-refunds-btn secondary"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="sales-refunds-btn primary"
                  disabled={submitting}
                >
                  {submitting
                    ? "Saving..."
                    : "Save Refund"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SalesRefunds;

