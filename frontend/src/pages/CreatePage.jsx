import { ArrowLeftIcon, FilePenLineIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { isLoggedIn } from "../lib/auth";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (!isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to={"/"}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:-translate-x-0.5 hover:bg-white/10 active:scale-95"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
          <aside className="glass-panel animate-fade-up rounded-[2rem] p-7">
            <div className="mb-6 grid size-14 place-items-center rounded-3xl bg-emerald-300 text-slate-950 shadow-lg shadow-emerald-500/20">
              <SparklesIcon className="size-6" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-100/80">
              Capture mode
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Create a note</h1>
            <p className="mt-4 leading-7 text-slate-300">
              Keep it quick or go deep. Your note will be stored privately in your workspace.
            </p>
          </aside>

          <div className="glass-panel animate-scale-in rounded-[2rem] p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">Title</label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-lg font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-200/40 focus:bg-white/10"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">Content</label>
                <textarea
                  placeholder="Write your note here..."
                  className="min-h-64 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-base leading-7 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-200/40 focus:bg-white/10"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                <Link
                  to="/"
                  className="rounded-full px-5 py-3 text-center text-sm font-bold text-slate-300 transition hover:bg-white/10"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={loading}
                >
                  <FilePenLineIcon className="size-5" />
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
