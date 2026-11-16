import { useMemo, useState } from "react";
import Card from "../components/common/Card.jsx";
import FormInput from "../components/common/FormInput.jsx";
import StatusBadge from "../components/common/StatusBadge.jsx";
import Table from "../components/common/Table.jsx";
import FormsPage from "./FormsPage.jsx";
import { adminRecords, eventRecords, registrationRecords } from "../data/mockData.js";

const noFilter = [{ value: "", label: "All" }];

function DetailDialog({ title, row, onClose }) {
  if (!row) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/40 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="record-dialog-title"
        className="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Record details</p>
            <h2 id="record-dialog-title" className="mt-1 text-lg font-semibold text-slate-900">{title}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100">
            Close
          </button>
        </div>
        <dl className="grid gap-x-6 gap-y-4 p-5 sm:grid-cols-2">
          {Object.entries(row).map(([key, value]) => (
            <div key={key} className="min-w-0">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {key.replace(/([A-Z])/g, " $1")}
              </dt>
              <dd className="mt-1 break-words text-sm text-slate-700">
                {Array.isArray(value)
                  ? value.map((guest) => guest.fullName).join(", ")
                  : String(value)}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

function SearchBox({ value, onChange, label = "Search", placeholder = "Search...", className = "w-full sm:max-w-xs" }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor="table-search" className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        id="table-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
}

function AdminManagementTable({ rows, setRows }) {
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows.filter((row) =>
      [row.name, row.email, row.role, row.city, row.community, row.status]
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [rows, search]);

  function handleAction(action, row) {
    if (action === "Delete") {
      if (window.confirm(`Delete administrator ${row.name}?`)) {
        setRows((current) => current.filter((item) => item.id !== row.id));
        setNotice(`${row.name} was removed from the sample list.`);
      }
      return;
    }
    setDialog({ title: `${action} administrator`, row });
  }

  const columns = [
    { key: "name", label: "Name", render: (row) => <span className="font-medium text-slate-900">{row.name}</span> },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "city", label: "City" },
    { key: "community", label: "Community" },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <>
      <Card title="Admin management" description="Review administrator access, assignments, and account status.">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <SearchBox value={search} onChange={setSearch} placeholder="Search admins..." />
          <p className="text-sm text-slate-500">{filteredRows.length} administrators</p>
        </div>
        <div className="-mx-5 sm:-mx-6">
          <Table columns={columns} rows={filteredRows} rowActions={["View", "Edit", "Delete"]} onAction={handleAction} />
        </div>
      </Card>
      {notice && <p role="status" className="mt-3 text-sm text-emerald-700">{notice}</p>}
      <DetailDialog title={dialog?.title} row={dialog?.row} onClose={() => setDialog(null)} />
    </>
  );
}

function EventManagementTable({ rows, setRows }) {
  const [search, setSearch] = useState("");
  const [community, setCommunity] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [dialog, setDialog] = useState(null);
  const [notice, setNotice] = useState("");

  const communities = useMemo(() => [...new Set(rows.map((row) => row.community))].sort(), [rows]);
  const cities = useMemo(() => [...new Set(rows.map((row) => row.city))].sort(), [rows]);
  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesSearch = [row.title, row.community, row.city, row.status]
        .some((value) => value.toLowerCase().includes(query));
      return matchesSearch
        && (!community || row.community === community)
        && (!city || row.city === city)
        && (!status || row.status === status);
    });
  }, [rows, search, community, city, status]);

  function handleAction(action, row) {
    if (action === "Delete") {
      if (window.confirm(`Delete ride "${row.title}"?`)) {
        setRows((current) => current.filter((item) => item.id !== row.id));
        setNotice(`"${row.title}" was removed from the sample list.`);
      }
      return;
    }
    setDialog({ title: `${action} ride`, row });
  }

  const columns = [
    { key: "title", label: "Ride Name", render: (row) => <span className="font-medium text-slate-900">{row.title}</span> },
    { key: "community", label: "Community" },
    { key: "city", label: "City" },
    { key: "eventDate", label: "Event Date", render: (row) => new Date(`${row.eventDate}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
    { key: "capacity", label: "Capacity" },
    { key: "registrations", label: "Registrations", render: (row) => `${row.registrations} / ${row.capacity}` },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <>
      <Card title="Events management" description="Search and filter rides, review registrations, and manage event status.">
        <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SearchBox value={search} onChange={setSearch} label="Search rides" placeholder="Search rides..." className="w-full" />
          <FormInput label="Community filter" name="communityFilter" type="select" value={community} onChange={(event) => setCommunity(event.target.value)} options={[...noFilter, ...communities.map((value) => ({ value, label: value }))]} />
          <FormInput label="City filter" name="cityFilter" type="select" value={city} onChange={(event) => setCity(event.target.value)} options={[...noFilter, ...cities.map((value) => ({ value, label: value }))]} />
          <FormInput label="Status filter" name="statusFilter" type="select" value={status} onChange={(event) => setStatus(event.target.value)} options={[...noFilter, "Published", "Draft", "Full"].map((item) => typeof item === "string" ? { value: item, label: item } : item)} />
        </div>
        <div className="-mx-5 sm:-mx-6">
          <Table columns={columns} rows={filteredRows} rowActions={["View", "Edit", "Delete"]} onAction={handleAction} />
        </div>
      </Card>
      {notice && <p role="status" className="mt-3 text-sm text-emerald-700">{notice}</p>}
      <DetailDialog title={dialog?.title} row={dialog?.row} onClose={() => setDialog(null)} />
    </>
  );
}

function RegistrationTable({ rows }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [dialog, setDialog] = useState(null);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows.filter((row) =>
      [row.id, row.eventName, row.date, row.amount, row.paymentStatus, row.status]
        .some((value) => value.toLowerCase().includes(query))
      && (!status || row.status === status),
    );
  }, [rows, search, status]);

  const columns = [
    { key: "id", label: "Registration ID", render: (row) => <span className="font-medium text-slate-900">{row.id}</span> },
    { key: "eventName", label: "Event Name" },
    { key: "date", label: "Date", render: (row) => new Date(`${row.date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
    { key: "amount", label: "Amount" },
    { key: "paymentStatus", label: "Payment Status", render: (row) => <StatusBadge status={row.paymentStatus} /> },
    { key: "status", label: "Registration Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <>
      <Card title="My registrations" description="Track your upcoming and previous ride registrations.">
        <div className="mb-5 grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(14rem,20rem)]">
          <SearchBox value={search} onChange={setSearch} label="Search registrations" placeholder="Search registrations..." className="w-full" />
          <FormInput
            label="Status filter"
            name="registrationStatus"
            type="select"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            options={[...noFilter, "Confirmed", "Pending", "Completed", "Cancelled"].map((item) => typeof item === "string" ? { value: item, label: item } : item)}
          />
        </div>
        <div className="-mx-5 sm:-mx-6">
          <Table
            columns={columns}
            rows={filteredRows}
            rowActions={["View Details"]}
            onAction={(action, row) => setDialog({ title: action, row })}
          />
        </div>
      </Card>
      <DetailDialog title={dialog?.title} row={dialog?.row} onClose={() => setDialog(null)} />
    </>
  );
}

function TablesPage({ role, initialAdding = false }) {
  const [isAdding, setIsAdding] = useState(initialAdding);
  const [admins, setAdmins] = useState(adminRecords);
  const [events, setEvents] = useState(eventRecords);
  const [registrations, setRegistrations] = useState(registrationRecords);

  function handleSaved(record) {
    if (role === "Super Admin") {
      setAdmins((current) => [
        { ...record, id: `ADM-${Date.now()}`, name: record.fullName },
        ...current,
      ]);
    } else if (role === "Admin") {
      setEvents((current) => [
        {
          ...record,
          id: `EVT-${Date.now()}`,
          title: record.title,
          eventDate: record.eventStart,
          capacity: Number(record.capacity),
          registrations: 0,
        },
        ...current,
      ]);
    } else {
      setRegistrations((current) => [
        {
          ...record,
          id: `REG-${Date.now()}`,
          people: record.additionalPeople + 1,
          amount: record.amount === 0
            ? "Free"
            : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(record.amount),
          paymentStatus: record.amount === 0 ? "Not required" : "Pending",
          status: "Pending",
        },
        ...current,
      ]);
      setEvents((current) => current.map((event) => (
        event.id === record.eventId
          ? { ...event, registrations: event.registrations + record.additionalPeople + 1 }
          : event
      )));
    }

    setIsAdding(false);
  }

  const config = {
    "Super Admin": {
      title: "Administrator directory",
      description: "Manage team access across cities and communities.",
      addLabel: "Add administrator",
      table: <AdminManagementTable rows={admins} setRows={setAdmins} />,
    },
    Admin: {
      title: "Ride and event directory",
      description: "Manage events and monitor registration capacity.",
      addLabel: "Add ride",
      table: <EventManagementTable rows={events} setRows={setEvents} />,
    },
    User: {
      title: "My Events",
      description: "Register for upcoming rides and track your registrations.",
      addLabel: "Register for a ride",
      table: (
        <RegistrationTable rows={registrations} />
      ),
    },
  }[role];

  if (isAdding) {
    return (
      <FormsPage
        role={role}
        events={events}
        onCancel={() => setIsAdding(false)}
        onSaved={handleSaved}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            {role}
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{config.title}</h2>
          <p className="mt-1 text-sm text-slate-500">{config.description}</p>
        </div>
        <button type="button" onClick={() => setIsAdding(true)} className="button-primary">
          {config.addLabel}
        </button>
      </div>
      {config.table}
    </div>
  );
}

export default TablesPage;
