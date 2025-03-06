import { useState, useEffect, useCallback } from "react";

interface UseFetchOptions {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?:  null | string;
  skip?: boolean;
}

export function useFetch({
  endpoint,
  method,
  body = null,
  skip = false,
}: UseFetchOptions) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(!skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/${endpoint ?? ""}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: body && method !== "GET" ? body : null,
        }
      );

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, method, body]);
  useEffect(() => {
    if (!skip) {
      fetchData();
    }
  }, [fetchData, skip]);

  return { data, isLoading, error, fetchData };
}
