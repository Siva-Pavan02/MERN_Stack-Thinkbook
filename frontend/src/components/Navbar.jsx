import { Link } from "react-router-dom";
import { LogOutIcon, PlusIcon, SparklesIcon } from "lucide-react";
import { removeToken } from "../lib/auth";

const Navbar = ({ onLogout }) => {
  const handleLogout = () => {
    removeToken();
    onLogout?.();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07110d]/75 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition group-hover:rotate-3 group-hover:scale-105">
              <SparklesIcon className="size-5" />
            </span>
            <span>
              <span className="block text-2xl font-black tracking-tight text-white">ThinkBoard</span>
              <span className="hidden text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200/70 sm:block">
                Private Notes
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to={"/create"}
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-300 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-200 active:scale-95"
            >
              <PlusIcon className="size-5" />
              <span className="hidden sm:inline">New Note</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/10 active:scale-95"
            >
              <LogOutIcon className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
