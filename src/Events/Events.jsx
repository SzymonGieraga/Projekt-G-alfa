import styles from './Events.module.css'
import { useState, useEffect } from 'react';
import EventList from './EventList.jsx';
import useFetch from '../Hooks/useFetch.js';
import supabase from '../supabaseClient.js';

const Events = ({setTitle}) => {
  setTitle("Wydarzenia");
  const [reload, setReload] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  // const {data:events, isLoading, error} = useFetch("http://localhost:8000/events", reload);
  const [events, setEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    console.log("a")
    const fetchEvents = async () =>{
      setIsLoading(true);
      const {data, error} = await supabase
      .from("events")
      .select()
      
      if (error){
          setFetchError("Nie udało się pobrać wydarzeń")
          console.log(error);
          setEvents(null);
          setIsLoading(false);
      }

      if (data){
        console.log(data)
        setEvents(data);
        setFetchError(null);
          setIsLoading(false);
      }
    }
    fetchEvents();
  },[])

  return ( 
    <div>
  {/* <!-- Kontener zawartości --> */}
  <div className="content-container">
    <div className="content">
      {/* <!-- Dodatkowe posty będą tutaj dodawane --> */}
      {events && (<EventList events={events}/>)}
      {isLoading && <p>Ładowanie...</p>}
      {fetchError && <p>{fetchError}</p>}
    </div>
  </div>

  </div>
   );
}
 
export default Events;