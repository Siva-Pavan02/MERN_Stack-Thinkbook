import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { isLoggedIn } from "../lib/auth";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const loggedIn = isLoggedIn();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      if (!loggedIn) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, loggedIn]);

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="glass-panel rounded-[2rem] px-8 py-6 text-center">
          <LoaderIcon className="mx-auto size-10 animate-spin text-emerald-200" />
          <p className="mt-4 font-semibold text-slate-300">Opening your note...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:-translate-x-0.5 hover:bg-white/10 active:scale-95"
          >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-400/10 px-4 py-2.5 text-sm font-bold text-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-400/20 active:scale-95"
            >
              <Trash2Icon className="h-5 w-5" />
              <span className="hidden sm:inline">Delete Note</span>
            </button>
          </div>

        <div className="glass-panel animate-scale-in rounded-[2rem] p-6 sm:p-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-100/80">
              Edit mode
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Refine your note
            </h1>
          </div>

          <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">Title</label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-lg font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-200/40 focus:bg-white/10"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">Content</label>
                <textarea
                  placeholder="Write your note here..."
                  className="min-h-72 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-base leading-7 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-200/40 focus:bg-white/10"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={saving}
                  onClick={handleSave}
                >
                  <SaveIcon className="size-5" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoteDetailPage;
