import { useEffect, useState } from "react";

export const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  autoRefetch = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchFunction();
      setData(response?.results ?? response);
    } catch (error) {
      // @ts-ignore
      setError(error instanceof Error ? error : new Error("an error occured"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autoRefetch) {
      fetchData();
    }
  }, []);

  return { data, error, loading, reset, refetch: fetchData };
};
