import { useState, useCallback } from "react";
import Spinner from "./components/Spinner";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (cb, ...params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await cb(...params);
      if (result.data && result.status !== 200) throw Error(result.data.message);

      setData(result.data);
      setStatus(result.status);
    } catch (e) {
      setError(e.message || "Something went wrong");
    }
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    data,
    status,
    Spinner,
    sendRequest,
  };
};

export default useFetch;
