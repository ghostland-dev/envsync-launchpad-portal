import { useState, useCallback, useRef } from 'react';

interface UndoRedoState<T> {
  past: T[];
  present: T;
  future: T[];
}

export function useUndoRedo<T>(initialState: T) {
  const [state, setState] = useState<UndoRedoState<T>>({
    past: [],
    present: initialState,
    future: []
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undo = useCallback(() => {
    setState(currentState => {
      if (currentState.past.length === 0) return currentState;

      const previous = currentState.past[currentState.past.length - 1];
      const newPast = currentState.past.slice(0, currentState.past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [currentState.present, ...currentState.future]
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState(currentState => {
      if (currentState.future.length === 0) return currentState;

      const next = currentState.future[0];
      const newFuture = currentState.future.slice(1);

      return {
        past: [...currentState.past, currentState.present],
        present: next,
        future: newFuture
      };
    });
  }, []);

  const set = useCallback((newPresent: T | ((current: T) => T)) => {
    setState(currentState => {
      const actualPresent = typeof newPresent === 'function' 
        ? (newPresent as (current: T) => T)(currentState.present)
        : newPresent;

      if (actualPresent === currentState.present) return currentState;

      return {
        past: [...currentState.past, currentState.present],
        present: actualPresent,
        future: []
      };
    });
  }, []);

  const reset = useCallback((resetState: T) => {
    setState({
      past: [],
      present: resetState,
      future: []
    });
  }, []);

  return {
    state: state.present,
    set,
    undo,
    redo,
    canUndo,
    canRedo,
    reset
  };
}

export function useUndoRedoWithKeyboard<T>(initialState: T) {
  const undoRedo = useUndoRedo(initialState);

  // Add keyboard shortcuts
  useState(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'z' && !e.shiftKey && undoRedo.canUndo) {
          e.preventDefault();
          undoRedo.undo();
        } else if ((e.key === 'y' || (e.key === 'z' && e.shiftKey)) && undoRedo.canRedo) {
          e.preventDefault();
          undoRedo.redo();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return undoRedo;
}