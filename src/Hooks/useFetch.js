import { useState, useEffect } from "react";

const useFetch = (url, reload) => {
    const  [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const abortCont = new AbortController();
          fetch(url, {signal: abortCont.signal})
          .then(res => {
              console.log(res)
              if (!res.ok){
                  throw Error('Could not fetch data');
              }
              return res.json();
          })
          .then(data=>{
              console.log(data);
              setData(data);
              setError(null);
              setIsLoading(false);
          })
          .catch(err => {
              if (err.name === 'AbortError'){
                  console.log("fetch aborted")
              }
              else{
                  setError(err)
                  setIsLoading(false);
                  console.log(err);
              }
          })
      return () => abortCont.abort();
    }, [url, reload])
    return {data, isLoading, error}
  }
  
 
export default useFetch;