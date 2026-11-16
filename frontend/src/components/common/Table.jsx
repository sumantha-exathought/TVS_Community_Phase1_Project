import { useEffect, useMemo, useState } from "react";

function Table({ columns, rows, rowActions = [], onAction, pageSize = 5, emptyMessage = "No records found." }) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const visibleRows = useMemo(() => rows.slice((page - 1) * pageSize, page * pageSize), [rows, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [rows]);

  function changePage(nextPage) {
    setPage(Math.min(pageCount, Math.max(1, nextPage)));
  }

  return (
    <div className="min-w-0 w-full">
      <div className="w-full min-w-0 overflow-x-auto">
        <table className="w-full min-w-[900px] divide-y divide-slate-100 text-left">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 first:pl-5 sm:first:pl-6"
                >
                  {column.label}
                </th>
              ))}
              {rowActions.length > 0 && (
                <th scope="col" className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 last:pr-5 sm:last:pr-6">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visibleRows.length ? visibleRows.map((row) => (
              <tr key={row.id} className="transition hover:bg-slate-50/80">
                {columns.map((column) => (
                  <td key={column.key} className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 first:pl-5 sm:first:pl-6">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                {rowActions.length > 0 && (
                  <td className="whitespace-nowrap px-4 py-4 text-right last:pr-5 sm:last:pr-6">
                    <div className="flex justify-end gap-3">
                      {rowActions.map((action) => (
                        <button
                          key={action}
                          type="button"
                          onClick={() => onAction?.(action, row)}
                          className={`text-xs font-medium transition ${
                            action === "Delete"
                              ? "text-red-600 hover:text-red-700"
                              : "text-brand-600 hover:text-brand-700"
                          }`}
                          aria-label={`${action} ${row.name || row.title || row.eventName || "record"}`}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length + (rowActions.length ? 1 : 0)} className="px-6 py-12 text-center text-sm text-slate-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:px-6">
        <p className="text-sm text-slate-500">
          {rows.length ? `Showing ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, rows.length)} of ${rows.length}` : "No results"}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span className="min-w-16 text-center text-sm text-slate-500">
            {page} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => changePage(page + 1)}
            disabled={page === pageCount}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
