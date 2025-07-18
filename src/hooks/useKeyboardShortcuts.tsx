import { useEffect, useCallback } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
  category?: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const shortcut = shortcuts.find(s => 
      s.key.toLowerCase() === event.key.toLowerCase() &&
      !!s.ctrlKey === event.ctrlKey &&
      !!s.shiftKey === event.shiftKey &&
      !!s.altKey === event.altKey &&
      !!s.metaKey === event.metaKey
    );

    if (shortcut) {
      event.preventDefault();
      event.stopPropagation();
      shortcut.action();
    }
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return shortcuts;
};

export const useGlobalShortcuts = () => {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'k',
      ctrlKey: true,
      action: () => {
        const searchInput = document.querySelector('[data-search-trigger]') as HTMLElement;
        searchInput?.click();
      },
      description: 'Open quick search',
      category: 'Navigation'
    },
    {
      key: '/',
      action: () => {
        const searchInput = document.querySelector('[data-search-trigger]') as HTMLElement;
        searchInput?.click();
      },
      description: 'Focus search',
      category: 'Navigation'
    },
    {
      key: '?',
      shiftKey: true,
      action: () => {
        const helpTrigger = document.querySelector('[data-help-trigger]') as HTMLElement;
        helpTrigger?.click();
      },
      description: 'Show keyboard shortcuts',
      category: 'Help'
    }
  ];

  useKeyboardShortcuts(shortcuts);
  return shortcuts;
};