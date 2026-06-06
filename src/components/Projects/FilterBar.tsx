interface FilterBarProps {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export function FilterBar({ tags, activeTag, onTagChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] ${
            activeTag === tag
              ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/30'
              : 'bg-white/5 text-text-secondary hover:bg-white/10 border border-white/10'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
