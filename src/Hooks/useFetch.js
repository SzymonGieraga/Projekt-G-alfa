import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

const useFetch = (table, reload, session) => {
  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () =>{
        setIsLoading(true);
        console.log(supabase)
        await supabase
        .from(table)
        .select()
        .then(({data:d, error}) => {
            if (error){
                setFetchError("Nie udało się pobrać danych")
                console.log(error);
                setData(null);
                setIsLoading(false);
            }

            if (d){
            setData(d);
            setFetchError(null);
            setIsLoading(false);
            }
        })
    }

  useEffect(()=>{
    if (!session) return
    fetchData();
  },[table, reload, session])
    return {data, isLoading, fetchError}
  }
  
 
export default useFetch;