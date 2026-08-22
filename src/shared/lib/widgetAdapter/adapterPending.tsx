import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

/* Context modules export hooks alongside providers. */
/* eslint-disable react-refresh/only-export-components */

const AdapterPendingCountContext = createContext(0);

const AdapterPendingActionsContext = createContext<{
  begin: () => void;
  end: () => void;
}>({
  begin: () => undefined,
  end: () => undefined,
});

export function AdapterPendingProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(0);
  const begin = useCallback(() => {
    setPending((count) => count + 1);
  }, []);
  const end = useCallback(() => {
    setPending((count) => (count > 0 ? count - 1 : 0));
  }, []);
  const actions = useMemo(() => ({ begin, end }), [begin, end]);

  return (
    <AdapterPendingActionsContext.Provider value={actions}>
      <AdapterPendingCountContext.Provider value={pending}>
        {children}
      </AdapterPendingCountContext.Provider>
    </AdapterPendingActionsContext.Provider>
  );
}

export function useAdapterPending(): boolean {
  return useContext(AdapterPendingCountContext) > 0;
}

/** Mounted as a Suspense fallback so the shell keeps element skeleton until the adapter commits. */
export function AdapterPendingFallback({ children }: { children: ReactNode }) {
  const { begin, end } = useContext(AdapterPendingActionsContext);

  useLayoutEffect(() => {
    begin();
    return () => {
      end();
    };
  }, [begin, end]);

  return children;
}
