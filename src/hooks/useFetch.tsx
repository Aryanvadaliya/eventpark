import { useEffect, useState } from "react";

export const useFetch = ({
  endpoint,
  method= "GET",
  body = {},
}: {
  endpoint: string;
  method?: string;
  body?: any;
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const url = `${import.meta.env.VITE_APP_API_URL}/${endpoint ?? ''}`;
  
  useEffect(() => {
    try {
      (async function getData() {
        setIsLoading(true);
        const response = await fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await response.json();
        setData(json);
      })();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { data, isLoading };
};
