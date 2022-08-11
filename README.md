## lessons learnt
* React Custom Hooks with Axios Async useEffect 

```javascript import { useState } from "react";
import axios from "axios";

export default useApi = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async () => {
    const source = axios.CancelToken.source();
    setLoading(true);
    
    try {
      const response = await axios.get(url, { cancelToken: source.token });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        // don't update state in case component is dismounting
      } else {
        setLoading(false);
        setError(error);
      }
    }

    return () => {
      source.cancel();
    };
  };

  return { data, error, loading, request };
};
```
