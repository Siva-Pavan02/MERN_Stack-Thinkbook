import { loginWithGoogle } from "../lib/auth";
import { LockKeyholeIcon, SparklesIcon } from "lucide-react";

const LoginWithGoogle = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="glass-panel animate-scale-in w-full max-w-md overflow-hidden rounded-[2rem]">
        <div className="relative p-8 text-center sm:p-10">
          <div className="absolute -right-16 -top-16 size-44 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="mx-auto mb-6 grid size-16 place-items-center rounded-3xl bg-emerald-300 text-slate-950 shadow-xl shadow-emerald-500/20">
            <SparklesIcon className="size-7" />
          </div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-emerald-100">
            <LockKeyholeIcon className="size-3.5" />
            Secure workspace
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white">ThinkBoard</h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Your private, calm corner for capturing ideas, plans, and the tiny lightning bolts
            before they vanish.
          </p>
          <button
            onClick={loginWithGoogle}
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3.5 font-bold text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-emerald-50 active:scale-95"
          >
            <span className="grid size-6 place-items-center rounded-full bg-white text-lg">G</span>
            Login with Google
          </button>
          <p className="mt-5 text-xs text-slate-500">Only your notes are shown after login.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginWithGoogle;
