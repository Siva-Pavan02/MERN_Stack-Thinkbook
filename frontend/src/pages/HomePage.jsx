import { useDeferredValue, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import LoginWithGoogle from "../components/LoginWithGoogle";
import { isLoggedIn } from "../lib/auth";
import NotesSkeleton from "../components/NotesSkeleton";
import { Grid2X2Icon, LayoutListIcon, SearchIcon } from "lucide-react";

const HomePage = () => {
  const [authenticated, setAuthenticated] = useState(isLoggedIn());
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid");
  const deferredQuery = useDeferredValue(query);

  const filteredNotes = notes.filter((note) => {
    const searchText = `${note.title} ${note.content}`.toLowerCase();
    return searchText.includes(deferredQuery.toLowerCase().trim());
  });

  useEffect(() => {
    const fetchNotes = async () => {
      if (!authenticated) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [authenticated]);

  if (!authenticated) {
    return <LoginWithGoogle />;
  }

  return (
    <div className="min-h-screen">
      <Navbar onLogout={() => setAuthenticated(false)} />

      {isRateLimited && <RateLimitedUI />}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <section className="animate-fade-up mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.28em] text-emerald-100">
              Your workspace
            </p>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Notes that stay yours.
            </h2>
            <p className="mt-4 max-w-2xl text-slate-300">
              Search, scan, and shape your private notes without leaving the board.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="glass-panel flex min-w-0 items-center gap-3 rounded-2xl px-4 py-3 sm:w-80">
              <SearchIcon className="size-5 shrink-0 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes..."
                className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-slate-500"
              />
            </label>
            <div className="glass-panel flex rounded-2xl p-1">
              <button
                onClick={() => setView("grid")}
                className={`grid size-10 place-items-center rounded-xl transition ${view === "grid" ? "bg-emerald-300 text-slate-950" : "text-slate-300 hover:bg-white/10"
                  }`}
                aria-label="Grid view"
              >
                <Grid2X2Icon className="size-5" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`grid size-10 place-items-center rounded-xl transition ${view === "list" ? "bg-emerald-300 text-slate-950" : "text-slate-300 hover:bg-white/10"
                  }`}
                aria-label="List view"
              >
                <LayoutListIcon className="size-5" />
              </button>
            </div>
          </div>
        </section>

        {loading && <NotesSkeleton view={view} />}

        {!loading && filteredNotes.length === 0 && !isRateLimited && (
          <NotesNotFound isSearching={notes.length > 0 && Boolean(query.trim())} query={query} />
        )}

        {!loading && filteredNotes.length > 0 && !isRateLimited && (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
                : "mx-auto flex max-w-4xl flex-col gap-4"
            }
          >
            {filteredNotes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} view={view} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
export default HomePage;
