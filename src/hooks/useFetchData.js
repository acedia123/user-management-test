import { useEffect, useState } from "react";

const useFetchData = (promise, config) => {
  const { disabled = true } = config ?? {};
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const callApi = async () => {
    await promise
      .then(({ data }) => {
        setData(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const refetch = async () => {
    await callApi();
  };

  useEffect(() => {
    if (disabled) {
      callApi();
    }
  }, []);

  return !disabled
    ? { data: null, isLoading: false, isError: false }
    : {
        data,
        isLoading,
        isError,
        refetch,
      };
};

export default useFetchData;
