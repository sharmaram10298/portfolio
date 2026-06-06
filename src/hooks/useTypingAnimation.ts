import { useReducer, useEffect } from 'react';

type AnimState = 'TYPING' | 'PAUSING' | 'DELETING' | 'SWITCHING';

interface State {
  displayText: string;
  stringIndex: number;
  charIndex: number;
  animState: AnimState;
}

type Action =
  | { type: 'TYPE_CHAR' }
  | { type: 'START_PAUSE' }
  | { type: 'DELETE_CHAR' }
  | { type: 'SWITCH_STRING'; stringsLength: number };

interface UseTypingAnimationOptions {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterType?: number;
}

export function useTypingAnimation({
  strings,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseAfterType = 1500,
}: UseTypingAnimationOptions): string {
  const [state, dispatch] = useReducer(
    (s: State, a: Action): State => {
      switch (a.type) {
        case 'TYPE_CHAR':
          return { ...s, charIndex: s.charIndex + 1, animState: 'TYPING' };
        case 'START_PAUSE':
          return { ...s, animState: 'PAUSING' };
        case 'DELETE_CHAR':
          return { ...s, charIndex: s.charIndex - 1, animState: 'DELETING' };
        case 'SWITCH_STRING':
          return {
            ...s,
            stringIndex: (s.stringIndex + 1) % a.stringsLength,
            charIndex: 0,
            animState: 'TYPING',
          };
        default:
          return s;
      }
    },
    {
      displayText: '',
      stringIndex: 0,
      charIndex: 0,
      animState: 'TYPING' as AnimState,
    }
  );

  const currentString = strings[state.stringIndex] ?? '';
  const displayText = currentString.slice(0, state.charIndex);

  useEffect(() => {
    if (strings.length === 0) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (state.animState === 'TYPING') {
      if (state.charIndex < currentString.length) {
        timeout = setTimeout(() => dispatch({ type: 'TYPE_CHAR' }), typingSpeed);
      } else {
        timeout = setTimeout(() => dispatch({ type: 'START_PAUSE' }), typingSpeed);
      }
    } else if (state.animState === 'PAUSING') {
      timeout = setTimeout(() => dispatch({ type: 'DELETE_CHAR' }), pauseAfterType);
    } else if (state.animState === 'DELETING') {
      if (state.charIndex > 0) {
        timeout = setTimeout(() => dispatch({ type: 'DELETE_CHAR' }), deletingSpeed);
      } else {
        timeout = setTimeout(
          () => dispatch({ type: 'SWITCH_STRING', stringsLength: strings.length }),
          deletingSpeed
        );
      }
    }

    return () => clearTimeout(timeout);
  }, [state, strings, currentString, typingSpeed, deletingSpeed, pauseAfterType]);

  return displayText;
}
