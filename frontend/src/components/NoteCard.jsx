import { CalendarDaysIcon, PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes, view = "grid" }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of the navigation behaviour

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted one
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className={`group glass-panel soft-ring animate-fade-up relative overflow-hidden rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/30 hover:bg-white/[0.1] hover:shadow-emerald-950/40 ${view === "list" ? "block" : "min-h-64"
        }`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-300 via-teal-200 to-lime-200 opacity-80" />
      <div className="absolute -right-14 -top-14 size-32 rounded-full bg-emerald-300/10 blur-2xl transition group-hover:bg-emerald-300/20" />

      <div className={view === "list" ? "flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between" : ""}>
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-xl font-black tracking-tight text-white transition group-hover:text-emerald-100">
            {note.title}
          </h3>
          <p className={`${view === "list" ? "line-clamp-2" : "line-clamp-5"} mt-4 text-sm leading-6 text-slate-300`}>
            {note.content}
          </p>
        </div>

        <div
          className={`flex items-center justify-between gap-4 ${view === "list" ? "shrink-0 sm:min-w-56 sm:justify-end" : "mt-8"
            }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-400">
            <CalendarDaysIcon className="size-3.5" />
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 opacity-100 transition sm:opacity-70 sm:group-hover:opacity-100">
            <span className="grid size-8 place-items-center rounded-full text-emerald-200">
              <PenSquareIcon className="size-4" />
            </span>
            <button
              className="grid size-8 place-items-center rounded-full text-rose-300 transition hover:bg-rose-400/15 hover:text-rose-100 active:scale-90"
              onClick={(e) => handleDelete(e, note._id)}
              aria-label={`Delete ${note.title}`}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;
