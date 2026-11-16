import { useEffect, useState } from "react";
import TablesPage from "./pages/TablesPage.jsx";
import Navbar from "./components/common/Navbar.jsx";

function App() {
  const [role, setRole] = useState("Super Admin");
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = window.localStorage.getItem("ride-admin-theme");
    return savedTheme ? savedTheme === "dark" : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("ride-admin-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-50 text-slate-900 transition-colors dark:bg-gray-900 dark:text-gray-100">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-slate-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6 dark:border-gray-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white">
            RM
          </div>
          <div>
            <p className="font-semibold tracking-tight">Ride Management</p>
            <p className="text-xs text-slate-500 dark:text-gray-400">Admin workspace</p>
          </div>
        </div>
        <div className="px-4 pt-7">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-gray-500">
            Workspace
          </p>
          <nav aria-label="Main navigation" className="mt-3 space-y-1">
            <span className="flex w-full items-center rounded-lg bg-brand-50 px-3 py-2.5 text-sm font-medium text-brand-700 dark:bg-gray-800 dark:text-blue-300">
              Tables
            </span>
          </nav>
        </div>
        <div className="mt-auto border-t border-slate-200 p-5 dark:border-gray-800">
          <p className="text-xs leading-5 text-slate-500 dark:text-gray-400">
            A single workspace for managing rides, communities, and riders.
          </p>
        </div>
      </aside>

      <div className="min-w-0 w-full lg:pl-64">
        <Navbar
          role={role}
          onRoleChange={setRole}
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode((value) => !value)}
        />

        <main className="mx-auto w-full min-w-0 max-w-screen-2xl p-4 sm:p-6 lg:p-8">
          <TablesPage role={role} />
        </main>
      </div>
    </div>
  );
}

export default App;