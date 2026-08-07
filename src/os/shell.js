// Shell context — lets the Terminal (and anything else) route "open"
// requests into the tmux session's content pane, or detach into a float.
import { createContext, useContext } from 'react';

export const ShellContext = createContext(null);

export function useShell() {
  return (
    useContext(ShellContext) || {
      active: { appId: 'about', props: {}, title: 'about' },
      split: 42,
      setSplit: () => {},
      open: () => {},
      detach: () => {},
    }
  );
}
