import { useCallback, useEffect, useRef, useState, type DependencyList } from "react";

interface AsyncResource<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function useAsyncResource<T>(loader: () => Promise<T>, deps: DependencyList): AsyncResource<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const requestIdRef = useRef(0);

  const reload = useCallback(() => {
    setNonce((value) => value + 1);
  }, []);

  useEffect(() => {
    let active = true;
    const requestId = ++requestIdRef.current;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const next = await loader();
        if (active && requestId === requestIdRef.current) {
          setData(next);
        }
      } catch (err) {
        if (active && requestId === requestIdRef.current) {
          setData(null);
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (active && requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [...deps, nonce]);

  return { data, loading, error, reload };
}
