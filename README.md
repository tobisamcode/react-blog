## lessons learnt

- React Custom Hooks with Axios Async useEffect

```javascript import axios from "axios";
import { useEffect, useState } from "react";

function useAxiosFetch(dataUrl) {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source(); // cancellation token for axios

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token
        });

        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setTimeout(() => setIsLoading(false), 2000);
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      console.log("clean up function");
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  });

  return { data, fetchError, isLoading };
}

export default useAxiosFetch;
```

#### watch json server

1. Firstly, run this command to globally install json-server
   `sudo npm install -g json-server`
2. Move to your local folder(like my-app) and run this command
   `npm install json-server`
3. Open a new Terminal in the same folder
   `json-server --watch db.json --port 3004 `
