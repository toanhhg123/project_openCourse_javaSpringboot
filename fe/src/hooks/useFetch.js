import { useMemo, useState } from "react";

const initState = {
  data: null,
  loading: false,
  error: "",
};
export default function useFetch() {
  const [state, setState] = useState(initState);

  const fetchData = useMemo(
    () => async (callBack) => {
      try {
        setState({ ...initState, loading: true });
        const dataRes = await callBack();
        setState({ ...initState, data: dataRes });
        return Promise.resolve(dataRes);
      } catch (error) {
        setState({ ...initState, error: error.message });
        return Promise.reject(error.message);
      }
    },
    []
  );

  const setData = (data) => {
    setState({ ...initState, data: data });
  };

  return [
    { loading: state.loading, error: state.error, data: state.data, setState },
    fetchData,
    setData,
  ];
}
