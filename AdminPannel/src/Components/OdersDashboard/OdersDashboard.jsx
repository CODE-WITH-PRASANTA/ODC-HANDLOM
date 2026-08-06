import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OdersDashboard.css";

import {
  Search,
  Filter,
  ChevronDown,
  Download,
  Printer,
  Plus,
  MoreVertical,
  X,
  ArrowRight,
  Check,
  Calendar,
  ArrowUpDown,
  RotateCcw,
  Pencil,
  Save,
} from "lucide-react";

const STATUS_STEPS = ["Pending", "Processing", "Shipped", "Delivered"];
const STATUS_META = {
  Pending: { fg: "#a3641e", bg: "#fbeedd" },
  Processing: { fg: "#a9780a", bg: "#fff3d6" },
  Shipped: { fg: "#2563c7", bg: "#e5eefc" },
  Delivered: { fg: "#1f9254", bg: "#e3f5ea" },
  Cancelled: { fg: "#c53939", bg: "#fce7e7" },
  Returned: { fg: "#7c4fd1", bg: "#efe7fb" },
};

const ITEM_KIND = {
  Saree: { bg: "#f6d9d9", fg: "#b23b3b", tag: "S" },
  Dupatta: { bg: "#f5e6c4", fg: "#a67c1e", tag: "D" },
  Stole: { bg: "#dceafb", fg: "#2563c7", tag: "St" },
  Kurta: { bg: "#e3f5ea", fg: "#1f9254", tag: "K" },
  Blouse: { bg: "#efe7fb", fg: "#7c4fd1", tag: "B" },
};

const AVATAR_COLORS = ["#f6d9d9", "#f5e6c4", "#dceafb", "#e3f5ea", "#efe7fb", "#fbeedd"];

const ITEM_PHOTO_TAG = {
  Saree: "saree,silk,fabric",
  Dupatta: "dupatta,scarf,fabric",
  Stole: "stole,shawl,fabric",
  Kurta: "kurta,tunic,fashion",
  Blouse: "blouse,fashion,fabric",
};

const hashStr = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h += s.charCodeAt(i);
  return h;
};

const avatarColor = (name) => AVATAR_COLORS[hashStr(name) % AVATAR_COLORS.length];
const avatarUrl = (name) => `https://i.pravatar.cc/150?img=${(hashStr(name) % 70) + 1}`;
const itemPhotoUrl = (kind, lockKey, size = 100) =>
  `https://loremflickr.com/${size}/${size}/${ITEM_PHOTO_TAG[kind] || ITEM_PHOTO_TAG.Saree}?lock=${(hashStr(String(lockKey)) % 200) + 1}`;
const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
const inr = (n) => "₹ " + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const RAW = [
  { id: "ODC12458", name: "Ananya Sharma", phone: "98765 43210", pay: "UPI", items: [{ n: "Handloom Silk Saree", v: "Red & Black", k: "Saree", p: 1990 }, { n: "Cotton Dupatta", v: "Ivory", k: "Dupatta", p: 650 }, { n: "Handwoven Stole", v: "Blue", k: "Stole", p: 810 }], status: "Delivered", date: "2026-05-29", time: "11:30 AM" },
  { id: "ODC12457", name: "Ritika Verma", phone: "91234 55210", pay: "Razorpay", items: [{ n: "Banarasi Silk Saree", v: "Maroon", k: "Saree", p: 1250 }], status: "Processing", date: "2026-05-29", time: "10:15 AM" },
  { id: "ODC12456", name: "Priya Nair", phone: "90011 22334", pay: "Credit Card", items: [{ n: "Kanjivaram Saree", v: "Gold", k: "Saree", p: 2080 }, { n: "Zari Blouse", v: "Gold", k: "Blouse", p: 700 }], status: "Shipped", date: "2026-05-29", time: "09:25 AM" },
  { id: "ODC12455", name: "Sandeep Patnaik", phone: "89900 11223", pay: "COD", items: [{ n: "Cotton Saree", v: "Yellow", k: "Saree", p: 950 }], status: "Pending", date: "2026-05-28", time: "07:45 PM" },
  { id: "ODC12454", name: "Meera Iyer", phone: "97765 44321", pay: "UPI", items: [{ n: "Silk Saree", v: "Green", k: "Saree", p: 2200 }, { n: "Cotton Kurta", v: "White", k: "Kurta", p: 900 }, { n: "Dupatta", v: "Pink", k: "Dupatta", p: 780 }, { n: "Stole", v: "Cream", k: "Stole", p: 800 }], status: "Delivered", date: "2026-05-28", time: "06:20 PM" },
  { id: "ODC12453", name: "Vikram Singh", phone: "99887 76655", pay: "UPI", items: [{ n: "Cotton Kurta", v: "Blue", k: "Kurta", p: 1200 }, { n: "Nehru Jacket", v: "Navy", k: "Blouse", p: 799 }], status: "Cancelled", date: "2026-05-28", time: "05:10 PM" },
  { id: "ODC12452", name: "Nisha Kumari", phone: "93322 11009", pay: "Bank Transfer", items: [{ n: "Handloom Saree", v: "Red", k: "Saree", p: 1499 }], status: "Returned", date: "2026-05-27", time: "03:30 PM" },
  { id: "ODC12451", name: "Harshita Gupta", phone: "98123 45670", pay: "Razorpay", items: [{ n: "Chanderi Saree", v: "Peach", k: "Saree", p: 1650 }, { n: "Dupatta", v: "Peach", k: "Dupatta", p: 700 }, { n: "Stole", v: "Peach", k: "Stole", p: 800 }], status: "Processing", date: "2026-05-27", time: "02:15 PM" },
  { id: "ODC12450", name: "Ashutosh Dash", phone: "90876 54321", pay: "COD", items: [{ n: "Cotton Kurta", v: "White", k: "Kurta", p: 820 }], status: "Shipped", date: "2026-05-27", time: "11:05 AM" },
  { id: "ODC12449", name: "Swati Mishra", phone: "91765 43980", pay: "Net Banking", items: [{ n: "Silk Saree", v: "Purple", k: "Saree", p: 2600 }, { n: "Blouse", v: "Purple", k: "Blouse", p: 750 }, { n: "Dupatta", v: "Silver", k: "Dupatta", p: 900 }, { n: "Stole", v: "Silver", k: "Stole", p: 900 }, { n: "Petticoat", v: "Silver", k: "Blouse", p: 1100 }], status: "Delivered", date: "2026-05-26", time: "09:20 PM" },
  { id: "ODC12448", name: "Rohit Mohanty", phone: "90045 61234", pay: "UPI", items: [{ n: "Cotton Saree", v: "Teal", k: "Saree", p: 1100 }], status: "Pending", date: "2026-05-26", time: "04:40 PM" },
  { id: "ODC12447", name: "Kavya Reddy", phone: "93456 78901", pay: "Razorpay", items: [{ n: "Georgette Saree", v: "Pink", k: "Saree", p: 1750 }, { n: "Blouse", v: "Pink", k: "Blouse", p: 650 }], status: "Shipped", date: "2026-05-25", time: "01:10 PM" },
  { id: "ODC12446", name: "Debasish Rout", phone: "94567 89012", pay: "COD", items: [{ n: "Handloom Kurta", v: "Beige", k: "Kurta", p: 990 }], status: "Processing", date: "2026-05-25", time: "10:50 AM" },
  { id: "ODC12445", name: "Pooja Das", phone: "95678 90123", pay: "UPI", items: [{ n: "Tussar Silk Saree", v: "Mustard", k: "Saree", p: 2350 }, { n: "Dupatta", v: "Mustard", k: "Dupatta", p: 690 }], status: "Delivered", date: "2026-05-24", time: "06:05 PM" },
  { id: "ODC12444", name: "Manoj Behera", phone: "96789 01234", pay: "UPI", items: [{ n: "Cotton Kurta", v: "Grey", k: "Kurta", p: 870 }], status: "Cancelled", date: "2026-05-24", time: "12:30 PM" },
  { id: "ODC12443", name: "Snigdha Panda", phone: "97890 12345", pay: "Credit Card", items: [{ n: "Ikat Saree", v: "Orange", k: "Saree", p: 1899 }, { n: "Stole", v: "Orange", k: "Stole", p: 750 }], status: "Returned", date: "2026-05-23", time: "08:15 PM" },
  { id: "ODC12442", name: "Abhishek Sahoo", phone: "98901 23456", pay: "COD", items: [{ n: "Silk Blouse", v: "Black", k: "Blouse", p: 700 }], status: "Delivered", date: "2026-05-23", time: "02:45 PM" },
  { id: "ODC12441", name: "Ipsita Nayak", phone: "99012 34567", pay: "UPI", items: [{ n: "Bomkai Saree", v: "Red", k: "Saree", p: 2450 }, { n: "Dupatta", v: "Red", k: "Dupatta", p: 720 }, { n: "Blouse", v: "Red", k: "Blouse", p: 680 }], status: "Shipped", date: "2026-05-22", time: "05:35 PM" },
];

function buildOrders() {
  return RAW.map((o) => {
    const subtotal = o.items.reduce((s, it) => s + it.p, 0);
    return {
      id: "ODC" + o.id.slice(3),
      customer: { name: o.name, email: o.name.toLowerCase().replace(/ /g, ".") + "@gmail.com", phone: "+91 " + o.phone },
      items: o.items.map((it, i) => ({ id: i, name: it.n, variant: it.v, kind: it.k, qty: 1, price: it.p })),
      payment: { method: o.pay, status: o.status === "Cancelled" ? "Refunded" : o.status === "Returned" ? "Refund Pending" : "Paid" },
      status: o.status,
      date: o.date,
      time: o.time,
      shipping: "India Post (Free)",
      shippingCost: 0,
      discount: 0,
      subtotal,
    };
  });
}

const StatusPill = ({ status }) => {
  const m = STATUS_META[status] || STATUS_META.Pending;
  return <span className="od-pill" style={{ color: m.fg, background: m.bg }}>{status}</span>;
};

function Avatar({ name, size = 36 }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="od-avatar" style={{ background: avatarColor(name), width: size, height: size, fontSize: size * 0.38, position: "relative", overflow: "hidden" }}>
      {!failed ? (
        <img src={avatarUrl(name)} alt={name} onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
      ) : (
        initials(name)
      )}
    </div>
  );
}

function ItemPhoto({ kind, name, lockKey, size, radius = 8 }) {
  const [failed, setFailed] = useState(false);
  const meta = ITEM_KIND[kind] || ITEM_KIND.Saree;
  return (
    <div className="od-item-photo" style={{ width: size, height: size, borderRadius: radius, background: meta.bg, color: meta.fg, flexShrink: 0 }} title={name}>
      {!failed ? (
        <img src={itemPhotoUrl(kind, lockKey, size * 2)} alt={name} onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: radius }} />
      ) : (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: size * 0.3 }}>{meta.tag}</div>
      )}
    </div>
  );
}

function useClickAway(ref, onAway) {
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onAway(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onAway]);
}

function Dropdown({ trigger, children, align = "left", width = 200 }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setOpen(false));
  return (
    <div className="od-dd" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger(open)}</div>
      {open && (
        <div className={`od-dd-menu ${align === "right" ? "od-dd-right" : ""}`} style={{ width }} onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  );
}

const OrdersDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(buildOrders);
  const [selectedId, setSelectedId] = useState(null);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [payFilter, setPayFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [checked, setChecked] = useState({});
  const [editing, setEditing] = useState(false);
  const [editDraft, setEditDraft] = useState(null);
  const [toast, setToast] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  function notify(msg) {
    setToast(msg);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(null), 2600);
  }

  const counts = useMemo(() => {
    const c = { All: orders.length, Pending: 0, Processing: 0, Shipped: 0, Delivered: 0, Cancelled: 0, Returned: 0 };
    orders.forEach((o) => (c[o.status] = (c[o.status] || 0) + 1));
    return c;
  }, [orders]);

  const filtered = useMemo(() => {
    let list = orders.filter((o) => {
      if (tab !== "All" && o.status !== tab) return false;
      if (payFilter !== "All" && o.payment.status !== payFilter) return false;
      if (dateFrom && o.date < dateFrom) return false;
      if (dateTo && o.date > dateTo) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const hay = (o.id + " " + o.customer.name + " " + o.customer.phone + " " + o.customer.email).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sortBy === "Latest") return (b.date + b.time).localeCompare(a.date + a.time);
      if (sortBy === "Oldest") return (a.date + a.time).localeCompare(b.date + b.time);
      if (sortBy === "High") return b.subtotal - a.subtotal;
      if (sortBy === "Low") return a.subtotal - b.subtotal;
      return 0;
    });
    return list;
  }, [orders, tab, payFilter, search, sortBy, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const pageSafe = Math.min(page, totalPages);
  const pageItems = filtered.slice((pageSafe - 1) * rowsPerPage, pageSafe * rowsPerPage);

  useEffect(() => { setPage(1); }, [tab, search, payFilter, sortBy, rowsPerPage, dateFrom, dateTo]);

  const selectedOrder = orders.find((o) => o.id === selectedId) || null;

  function openOrder(id) { setSelectedId(id); setEditing(false); }
  function closePanel() { setSelectedId(null); setEditing(false); }
  function updateOrder(id, patch) { setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o))); }

  function setExplicitStatus(o, status) {
    let payStatus = o.payment.status;
    if (status === "Delivered") payStatus = "Paid";
    if (status === "Cancelled") payStatus = "Refunded";
    if (status === "Returned") payStatus = "Refund Pending";

    updateOrder(o.id, { status, payment: { ...o.payment, status: payStatus } });
    notify(`Order ${o.id} set to ${status}.`);
  }

  function advanceStatus(o) {
    const idx = STATUS_STEPS.indexOf(o.status);
    if (idx === -1 || idx === STATUS_STEPS.length - 1) {
      notify(`Order ${o.id} is already ${o.status.toLowerCase()}.`);
      return;
    }
    const next = STATUS_STEPS[idx + 1];
    setExplicitStatus(o, next);
  }

  function refundOrder(o) {
    setExplicitStatus(o, "Returned");
  }

  function cancelOrder(o) {
    setExplicitStatus(o, "Cancelled");
  }

  // Navigate to /sales/create-order route when button clicked
  function createOrder() {
    navigate("/sales/create-order");
  }

  function exportCSV() {
    const header = ["Order ID", "Customer", "Email", "Phone", "Amount", "Status", "Payment", "Date", "Time"];
    const rows = filtered.map((o) => [o.id, o.customer.name, o.customer.email, o.customer.phone, o.subtotal, o.status, o.payment.method, o.date, o.time]);
    const csv = [header, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-export-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    notify(`Exported ${filtered.length} orders to CSV.`);
  }

  function downloadInvoice(o) {
    const lines = [
      `Invoice — Order #${o.id}`,
      `Customer: ${o.customer.name} (${o.customer.email}, ${o.customer.phone})`,
      `Date: ${o.date} ${o.time}`,
      `Status: ${o.status}`,
      `Payment: ${o.payment.method} — ${o.payment.status}`,
      "",
      "Items:",
      ...o.items.map((it) => `  - ${it.name} (${it.variant}) x${it.qty} — ${inr(it.price)}`),
      "",
      `Subtotal: ${inr(o.subtotal)}`,
      `Shipping: ${inr(o.shippingCost)}`,
      `Discount: -${inr(o.discount)}`,
      `Total: ${inr(o.subtotal + o.shippingCost - o.discount)}`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${o.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    notify(`Invoice for ${o.id} downloaded.`);
  }

  function startEdit(o) {
    setEditDraft({ name: o.customer.name, email: o.customer.email, phone: o.customer.phone });
    setEditing(true);
  }

  function saveEdit(o) {
    updateOrder(o.id, { customer: { ...o.customer, ...editDraft } });
    setEditing(false);
    notify(`Order ${o.id} updated.`);
  }

  const toggleCheck = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }));
  function toggleCheckAll() {
    const allChecked = pageItems.every((o) => checked[o.id]);
    const next = { ...checked };
    pageItems.forEach((o) => (next[o.id] = !allChecked));
    setChecked(next);
  }

  const tabs = [
    { key: "All", label: "All Orders" },
    { key: "Pending", label: "Pending" },
    { key: "Processing", label: "Processing" },
    { key: "Shipped", label: "Shipped" },
    { key: "Delivered", label: "Delivered" },
    { key: "Cancelled", label: "Cancelled" },
    { key: "Returned", label: "Returned" },
  ];
  const panelOpen = !!selectedOrder;

  return (
    <div className="od-root">
      <div className="od-header-row">
        <div>
          <h1 className="od-title">Orders</h1>
          <div className="od-subtitle">Manage and track all customer orders in one place.</div>
        </div>
        <div className="od-header-actions">
          <button className="od-btn" onClick={exportCSV}><Download size={16} /> Export</button>
          <button className="od-btn" onClick={() => { window.print(); notify("Sending order list to printer…"); }}><Printer size={16} /> Print</button>
          <button
            className="od-btn od-btn-primary"
            onClick={createOrder}
          >
            <Plus size={16} />
            Create Order
          </button>
        </div>
      </div>

      <div className="od-layout">
        <div className="od-main">
          <div className="od-tabs">
            {tabs.map((t) => (
              <div key={t.key} className={`od-tab ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>
                {t.label}
                <span className="od-tab-badge">{t.key === "All" ? counts.All : counts[t.key] || 0}</span>
              </div>
            ))}
          </div>

          <div className="od-toolbar">
            <div className="od-search">
              <Search size={16} color="#B4A896" />
              <input placeholder="Search by Order ID, Customer, Phone, Email…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <Dropdown width={230} trigger={() => (
              <div className="od-toolbar-btn">
                <Calendar size={15} />
                {dateFrom || dateTo ? `${dateFrom || "…"} → ${dateTo || "…"}` : "All Dates"}
                <ChevronDown size={14} />
              </div>
            )}>
              <div className="od-date-panel" onClick={(e) => e.stopPropagation()}>
                <label style={{ fontSize: 12, color: "#8A7F72" }}>From</label>
                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                <label style={{ fontSize: 12, color: "#8A7F72" }}>To</label>
                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                <button className="od-date-apply" onClick={() => notify("Date range applied.")}>Apply</button>
                {(dateFrom || dateTo) && (
                  <button className="od-date-apply" style={{ background: "#F1E7D8", color: "#2B2420" }} onClick={() => { setDateFrom(""); setDateTo(""); }}>Clear</button>
                )}
              </div>
            </Dropdown>

            <Dropdown width={190} trigger={() => (
              <div className="od-toolbar-btn"><Filter size={15} /> Filter{payFilter !== "All" ? `: ${payFilter}` : ""} <ChevronDown size={14} /></div>
            )}>
              <div className="od-dd-label">Payment status</div>
              {["All", "Paid", "Refund Pending", "Refunded"].map((p) => (
                <div key={p} className={`od-dd-item ${payFilter === p ? "active-item" : ""}`} onClick={() => setPayFilter(p)}>
                  {payFilter === p && <Check size={13} />} {p}
                </div>
              ))}
            </Dropdown>

            <Dropdown width={190} align="right" trigger={() => (
              <div className="od-toolbar-btn"><ArrowUpDown size={15} /> Sort: {sortBy} <ChevronDown size={14} /></div>
            )}>
              {[["Latest", "Latest"], ["Oldest", "Oldest"], ["High", "Amount: High to Low"], ["Low", "Amount: Low to High"]].map(([k, label]) => (
                <div key={k} className={`od-dd-item ${sortBy === k ? "active-item" : ""}`} onClick={() => setSortBy(k)}>
                  {sortBy === k && <Check size={13} />} {label}
                </div>
              ))}
            </Dropdown>
          </div>

          <div className="od-table-card">
            <div className="od-table-scroll">
              <table className="od-table">
                <thead>
                  <tr>
                    <th style={{ width: 36 }}>
                      <input type="checkbox" className="od-checkbox" checked={pageItems.length > 0 && pageItems.every((o) => checked[o.id])} onChange={toggleCheckAll} />
                    </th>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    {!panelOpen && <th>Payment</th>}
                    <th>Date</th>
                    <th style={{ textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((o) => {
                    const extra = o.items.length - 2;
                    return (
                      <tr key={o.id} className={selectedId === o.id ? "selected" : ""} onClick={() => openOrder(o.id)}>
                        <td onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="od-checkbox" checked={!!checked[o.id]} onChange={() => toggleCheck(o.id)} />
                        </td>
                        <td><span className="od-order-id">#{o.id}</span></td>
                        <td>
                          <div className="od-cust-cell">
                            <Avatar name={o.customer.name} />
                            <div>
                              <div className="od-cust-name">{o.customer.name}</div>
                              <div className="od-cust-email">{o.customer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="od-items-cell">
                            {o.items.slice(0, 2).map((it, i) => (
                              <div key={i} className="od-item-thumb">
                                <ItemPhoto kind={it.kind} name={it.name} lockKey={o.id + it.id} size={30} radius={8} />
                              </div>
                            ))}
                            {extra > 0 && <div className="od-item-more">+{extra}</div>}
                          </div>
                        </td>
                        <td>
                          <div className="od-amount">{inr(o.subtotal)}</div>
                          <div className="od-item-count">({o.items.length} Item{o.items.length > 1 ? "s" : ""})</div>
                        </td>
                        <td><StatusPill status={o.status} /></td>
                        {!panelOpen && (
                          <td className="od-pay-cell">
                            <div className={`od-pay-status ${o.payment.status === "Paid" ? "od-pay-paid" : o.payment.status.includes("Refund") ? "od-pay-pending" : "od-pay-cod"}`}>
                              {o.payment.status === "Paid" ? <Check size={13} /> : null} {o.payment.status}
                            </div>
                            <div style={{ color: "#9A8E7E" }}>{o.payment.method}</div>
                          </td>
                        )}
                        <td className="od-date-cell">
                          {new Date(o.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                          <div style={{ color: "#9A8E7E" }}>{o.time}</div>
                        </td>
                        <td className="od-action-cell" onClick={(e) => e.stopPropagation()}>
                          <Dropdown align="right" width={170} trigger={() => (
                            <button className="od-btn od-btn-ghost od-btn-small" style={{ padding: 6 }}><MoreVertical size={17} /></button>
                          )}>
                            <div className="od-dd-item" onClick={() => setExplicitStatus(o, "Pending")}>Set Pending</div>
                            <div className="od-dd-item" onClick={() => setExplicitStatus(o, "Processing")}>Set Processing</div>
                            <div className="od-dd-item" onClick={() => setExplicitStatus(o, "Shipped")}>Set Shipped</div>
                            <div className="od-dd-item" onClick={() => setExplicitStatus(o, "Delivered")}>Set Delivered</div>
                            <div className="od-dd-item" onClick={() => refundOrder(o)}>Set Returned</div>
                            <div className="od-dd-item danger" onClick={() => cancelOrder(o)}>Set Cancelled</div>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                  {pageItems.length === 0 && (
                    <tr><td colSpan={9}><div className="od-empty">No orders match your filters.</div></td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="od-footer">
              <div className="od-footer-text">
                Showing {filtered.length === 0 ? 0 : (pageSafe - 1) * rowsPerPage + 1} to {Math.min(pageSafe * rowsPerPage, filtered.length)} of {filtered.length} orders
              </div>
              <div className="od-pagination">
                <button className="od-page-btn" disabled={pageSafe === 1} onClick={() => setPage(pageSafe - 1)}>‹</button>
                {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => (
                  <button key={i} className={`od-page-btn ${pageSafe === i + 1 ? "active" : ""}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
                ))}
                {totalPages > 5 && <span style={{ color: "#9A8E7E" }}>…</span>}
                <button className="od-page-btn" disabled={pageSafe === totalPages} onClick={() => setPage(pageSafe + 1)}>›</button>
              </div>
              <div className="od-rpp">
                Rows per page:
                <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className={`od-panel-wrap ${panelOpen ? "open" : ""}`}>
          {selectedOrder && (
            <div className="od-panel">
              <div className="od-panel-head">
                <div className="od-panel-title">Order Details</div>
                <button className="od-close-btn" onClick={closePanel}><X size={16} /></button>
              </div>
              <div className="od-panel-order">
                <span className="od-panel-order-id">#{selectedOrder.id}</span>
                <StatusPill status={selectedOrder.status} />
              </div>

              <div className="od-panel-body">
                <div className="od-invoice-row">
                  <button className="od-invoice-btn" onClick={() => { window.print(); notify("Preparing invoice for printing…"); }}><Printer size={15} /> Print Invoice</button>
                  <button className="od-invoice-btn" onClick={() => downloadInvoice(selectedOrder)}><Download size={15} /> Download</button>
                </div>

                <div className="od-info-card">
                  <div className="od-info-top">
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <Avatar name={selectedOrder.customer.name} size={38} />
                      {!editing ? (
                        <div className="od-info-name">{selectedOrder.customer.name}</div>
                      ) : (
                        <input className="od-edit-input" style={{ margin: 0 }} value={editDraft.name} onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })} />
                      )}
                    </div>
                    {!editing && (
                      <div className="od-link" onClick={() => notify(`Opening profile for ${selectedOrder.customer.name}…`)}>
                        View Profile <ArrowRight size={12} />
                      </div>
                    )}
                  </div>
                  {!editing ? (
                    <>
                      <div className="od-info-line">{selectedOrder.customer.email}</div>
                      <div className="od-info-line">{selectedOrder.customer.phone}</div>
                    </>
                  ) : (
                    <>
                      <input className="od-edit-input" value={editDraft.email} onChange={(e) => setEditDraft({ ...editDraft, email: e.target.value })} />
                      <input className="od-edit-input" value={editDraft.phone} onChange={(e) => setEditDraft({ ...editDraft, phone: e.target.value })} />
                      <div className="od-edit-actions">
                        <button className="od-edit-save" onClick={() => saveEdit(selectedOrder)}><Save size={13} /> Save</button>
                        <button className="od-edit-cancel" onClick={() => setEditing(false)}>Cancel</button>
                      </div>
                    </>
                  )}
                </div>

                <div className="od-section-title">Order Information</div>
                <div className="od-order-info-grid">
                  <div>
                    <div className="od-oi-label">Order Date</div>
                    <div className="od-oi-value">{new Date(selectedOrder.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} ({selectedOrder.time})</div>
                  </div>
                  <div>
                    <div className="od-oi-label">Payment Method</div>
                    <div className="od-oi-value pay">{selectedOrder.payment.method} ({selectedOrder.payment.status})</div>
                  </div>
                  <div>
                    <div className="od-oi-label">Total Amount</div>
                    <div className="od-oi-value">{inr(selectedOrder.subtotal)}</div>
                  </div>
                  <div>
                    <div className="od-oi-label">Shipping Method</div>
                    <div className="od-oi-value">{selectedOrder.shipping}</div>
                  </div>
                </div>

                <div className="od-section-title">Order Status</div>
                <div className="od-pipeline">
                  {STATUS_STEPS.map((s, i) => {
                    const curIdx = STATUS_STEPS.indexOf(selectedOrder.status);
                    const isCancelledOrReturned = !STATUS_STEPS.includes(selectedOrder.status);
                    const done = !isCancelledOrReturned && i <= curIdx;
                    const current = !isCancelledOrReturned && i === curIdx;
                    return (
                      <div className="od-pipe-step" key={s}>
                        <div className={`od-pipe-line ${done ? "done" : ""}`} />
                        <div className={`od-pipe-dot ${done ? "done" : ""} ${current ? "current" : ""}`}>
                          {done && !current ? <Check size={13} /> : i + 1}
                        </div>
                        <div className={`od-pipe-label ${current ? "active-label" : ""}`}>{s}</div>
                      </div>
                    );
                  })}
                </div>
                {!STATUS_STEPS.includes(selectedOrder.status) && (
                  <div style={{ marginTop: -4, marginBottom: 6 }}><StatusPill status={selectedOrder.status} /></div>
                )}

                <div className="od-section-title">Order Items ({selectedOrder.items.length})</div>
                <div>
                  {selectedOrder.items.map((it) => (
                    <div className="od-item-row" key={it.id}>
                      <ItemPhoto kind={it.kind} name={it.name} lockKey={selectedOrder.id + it.id} size={42} radius={10} />
                      <div>
                        <div className="od-item-name">{it.name}</div>
                        <div className="od-item-variant">{it.variant}</div>
                      </div>
                      <div className="od-item-qty">Qty {it.qty}</div>
                      <div className="od-item-price">{inr(it.price)}</div>
                    </div>
                  ))}
                </div>

                <div className="od-totals">
                  <div className="od-total-line"><span>Subtotal</span><span>{inr(selectedOrder.subtotal)}</span></div>
                  <div className="od-total-line"><span>Shipping</span><span>{inr(selectedOrder.shippingCost)}</span></div>
                  <div className="od-total-line"><span>Discount</span><span>- {inr(selectedOrder.discount)}</span></div>
                  <div className="od-total-line grand"><span>Total Amount</span><span className="val">{inr(selectedOrder.subtotal + selectedOrder.shippingCost - selectedOrder.discount)}</span></div>
                </div>

                <div className="od-panel-actions">
                  <button className="od-pa-btn od-pa-status" onClick={() => advanceStatus(selectedOrder)}><ArrowRight size={14} /> Update Status</button>
                  <button className="od-pa-btn od-pa-refund" onClick={() => refundOrder(selectedOrder)}><RotateCcw size={14} /> Refund</button>
                  <button className="od-pa-btn od-pa-edit" onClick={() => startEdit(selectedOrder)}><Pencil size={14} /> Edit Order</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {toast && <div className="od-toast">{toast}</div>}
    </div>
  );
};

export default OrdersDashboard;