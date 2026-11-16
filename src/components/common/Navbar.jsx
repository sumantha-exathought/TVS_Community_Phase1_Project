import DarkModeToggle from "./DarkModeToggle.jsx";

const roles = ["Super Admin", "Admin", "User"];

function Navbar({ role, onRoleChange, darkMode, onThemeToggle }) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
      <div className="mx-auto flex min-h-20 max-w-screen-2xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white lg:hidden">
            RM
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-gray-400">Workspace / Tables</p>
            <h1 className="text-lg font-semibold tracking-tight">Tables</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="active-role">Preview role</label>
          <select
            id="active-role"
            value={role}
            onChange={(event) => onRoleChange(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-gray-700"
          >
            {roles.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <DarkModeToggle darkMode={darkMode} onToggle={onThemeToggle} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;