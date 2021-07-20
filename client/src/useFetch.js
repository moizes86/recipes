import { useState, useCallback } from "react";
import Spinner from "./components/Spinner";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (cb, ...params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await cb(...params);
      if (result.data.status && result.data.status !== 200) throw Error(result.data.err);
      const data = result.data;
      setData(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
    }
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    data,
    Spinner,
    sendRequest,
  };
};

export default useFetch;
