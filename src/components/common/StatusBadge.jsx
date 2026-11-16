function StatusBadge({ status }) {
  const tone = {
    Active: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    Published: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    Confirmed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    Paid: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    Completed: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
    Draft: "bg-slate-100 text-slate-700 dark:bg-gray-700 dark:text-gray-300",
    Inactive: "bg-slate-100 text-slate-600 dark:bg-gray-700 dark:text-gray-300",
    Pending: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    Full: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    Cancelled: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
    Refunded: "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300",
  }[status] || "bg-slate-100 text-slate-700 dark:bg-gray-700 dark:text-gray-300";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
