import React, { createContext, useContext, useState, useCallback } from 'react';

interface SidebarStateContextValue {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

const SidebarStateContext = createContext<SidebarStateContextValue | null>(null);

export function SidebarStateProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const value: SidebarStateContextValue = {
    expanded,
    setExpanded: useCallback((next: boolean) => setExpanded(next), []),
  };
  return (
    <SidebarStateContext.Provider value={value}>{children}</SidebarStateContext.Provider>
  );
}

export function useSidebarState(): SidebarStateContextValue {
  const ctx = useContext(SidebarStateContext);
  if (ctx == null) {
    throw new Error('useSidebarState must be used within SidebarStateProvider');
  }
  return ctx;
}
