import { NotebookIcon, SearchXIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NotesNotFound = ({ isSearching = false, query = "" }) => {
  return (
    <div className="glass-panel animate-fade-up mx-auto flex max-w-xl flex-col items-center justify-center rounded-[2rem] px-8 py-16 text-center">
      <div className="mb-7 grid size-20 place-items-center rounded-3xl bg-emerald-300/15 text-emerald-200 ring-1 ring-emerald-200/20">
        {isSearching ? <SearchXIcon className="size-10" /> : <NotebookIcon className="size-10" />}
      </div>
      <h3 className="text-3xl font-black tracking-tight text-white">
        {isSearching ? "No matching notes" : "No notes yet"}
      </h3>
      <p className="mt-4 max-w-md text-slate-300">
        {isSearching
          ? `Nothing matched "${query}". Try a different keyword or clear the search.`
          : "Ready to organize your thoughts? Create your first note and start building your private idea board."}
      </p>
      {!isSearching && (
        <Link
          to="/create"
          className="mt-8 rounded-full bg-emerald-300 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-200 active:scale-95"
        >
          Create Your First Note
        </Link>
      )}
    </div>
  );
};
export default NotesNotFound;
