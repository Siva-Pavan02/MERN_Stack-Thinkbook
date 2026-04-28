const NotesSkeleton = ({ view = "grid" }) => {
  const items = Array.from({ length: view === "grid" ? 6 : 4 });

  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          : "mx-auto flex max-w-4xl flex-col gap-4"
      }
    >
      {items.map((_, index) => (
        <div
          key={index}
          className="glass-panel animate-pulse rounded-[2rem] p-6"
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <div className="mb-5 h-5 w-2/3 rounded-full bg-white/15" />
          <div className="space-y-3">
            <div className="h-3 rounded-full bg-white/10" />
            <div className="h-3 w-5/6 rounded-full bg-white/10" />
            <div className="h-3 w-3/5 rounded-full bg-white/10" />
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="h-3 w-28 rounded-full bg-white/10" />
            <div className="h-9 w-20 rounded-full bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesSkeleton;
