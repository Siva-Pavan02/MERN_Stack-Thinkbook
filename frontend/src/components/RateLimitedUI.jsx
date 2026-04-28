import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="glass-panel rounded-[2rem]">
        <div className="flex flex-col items-center p-6 md:flex-row">
          <div className="mb-4 grid size-16 flex-shrink-0 place-items-center rounded-3xl bg-amber-300/15 text-amber-200 md:mb-0 md:mr-6">
            <ZapIcon className="size-9" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="mb-2 text-xl font-black text-white">Rate Limit Reached</h3>
            <p className="mb-1 text-slate-200">
              You've made too many requests in a short period. Please wait a moment.
            </p>
            <p className="text-sm text-slate-400">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
