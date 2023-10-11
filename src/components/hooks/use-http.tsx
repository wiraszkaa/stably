import { useState, useCallback } from "react";

interface Response<T> {
  sendRequest: (data?: any) => void;
  data: T | null;
  error: string | null;
  state: string;
}

function useHTTP<T>(func: (data?: any) => Promise<T>): Response<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<string>("pending");

  const sendRequest = useCallback(async (data?: any) => {
    try {
      setState("loading");
      const retrievedData = await func(data);
      setData(retrievedData);
      setState("success");
    } catch (e: any) {
      setError(e.message || "Coś nie poszło!");
      setState("error");
    }
  }, []);

  return { sendRequest, data, error, state };
}

export default useHTTP;
