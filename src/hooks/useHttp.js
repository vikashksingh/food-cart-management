import { useState, useEffect, useCallback } from "react";
async function sendHttpRequest(url, config) {
  const res = await fetch(url, config);
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send data."
    );
  }
  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  function clearData() {
    setData(initialData);
  }
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong.");
      }
      setIsLoading(false);
    },
    [url, config]
  );
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}
// export function useHttps(method, defaultValue) {
//   const [fetchedData, setFetchedData] = useState(defaultValue);
//   if (method == "get") {
//     useEffect(() => {
//       async function getData() {
//         const res = await fetch("http://localhost:3000/meals");
//         if (!res.ok) {
//           // ..
//         }
//         const data = await res.json();
//         setFetchedData(() => data);
//       }
//       getData();
//     }, []);
//   } else {
//     async function postData(body) {
//       const res = await fetch("", {
//         method: "PUT",
//         body: JSON.parse(body),
//         "Content-Type": "application/json"
//       });
//       const data = await res.json();
//     }
//   }
//   return {
//     fetchedData
//   };
// }
