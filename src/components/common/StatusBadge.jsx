function StatusBadge({ status }) {
  const tone = {
    Active: "bg-emerald-50 text-emerald-700",
    Published: "bg-emerald-50 text-emerald-700",
    Confirmed: "bg-emerald-50 text-emerald-700",
    Paid: "bg-emerald-50 text-emerald-700",
    Completed: "bg-blue-50 text-blue-700",
    Draft: "bg-slate-100 text-slate-700",
    Inactive: "bg-slate-100 text-slate-600",
    Pending: "bg-amber-50 text-amber-700",
    Full: "bg-amber-50 text-amber-700",
    Cancelled: "bg-red-50 text-red-700",
    Refunded: "bg-purple-50 text-purple-700",
  }[status] || "bg-slate-100 text-slate-700";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
