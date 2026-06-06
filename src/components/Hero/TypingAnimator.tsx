import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import type { TypingAnimatorProps } from '@/types/index';

export function TypingAnimator({
  strings,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseAfterType = 1500,
}: TypingAnimatorProps) {
  const displayText = useTypingAnimation({ strings, typingSpeed, deletingSpeed, pauseAfterType });

  return (
    <span className="inline-flex items-center">
      <span className="text-accent-primary font-semibold">{displayText}</span>
      <span
        className="ml-0.5 inline-block w-0.5 h-[1em] bg-accent-primary animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
}
