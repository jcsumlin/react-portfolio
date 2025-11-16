type Props = {
  name: string;
  children: React.ReactNode;
};

export default function SkillCard({ name, children }: Props) {
  return (
    <div className="group relative flex items-center gap-4 rounded-xl p-4 dark:bg-zinc-900/80 border dark:border-zinc-700/60 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_4px_16px_-4px_rgba(0,0,0,0.6)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_28px_-6px_rgba(0,0,0,0.7)] transition-all duration-300 overflow-hidden">
      <div className="relative w-14 h-14 flex items-center justify-center rounded-lg dark:bg-zinc-700/70 ring-1 ring-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
        {children}
      </div>
      <div className="relative flex-1">
        <div className="flex items-center gap-2">
          <span>{name}</span>
        </div>
      </div>
    </div>
  );
}
