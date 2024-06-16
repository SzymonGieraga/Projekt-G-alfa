import styles from './Events.module.css'
import { useState, useEffect } from 'react';
import EventList from './EventList.jsx';
import useFetch from '../Hooks/useFetch.js';
import supabase from '../config/supabaseClient.js';

const Events = ({setTitle, session}) => {
  setTitle("Wydarzenia");
  const [reload, setReload] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  // const {data:events, isLoading, error} = useFetch("http://localhost:8000/events", reload);
  const [events, setEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 

  useEffect(()=>{
    const fetchEvents = async () =>{
      setIsLoading(true);
      console.log(supabase)
      await supabase
      .from("events")
      .select()
      .then(({data, error}) => {
          if (error){
              setFetchError("Nie udało się pobrać wydarzeń")
              console.log(error);
              setEvents(null);
              setIsLoading(false);
          }

          if (data){
            console.log("hello")
            console.log(session)
            console.log(data)
            setEvents(data);
            setFetchError(null);
            setIsLoading(false);
          }
      })
    }
    fetchEvents();
  },[])

  return ( 
    <div>
  {/* <!-- Kontener zawartości --> */}
  <div className="content-container">
    <div className="content">
      {/* <!-- Dodatkowe posty będą tutaj dodawane --> */}
      {events && (<EventList session={session} events={events}/>)}
      {isLoading && <p>Ładowanie...</p>}
      {fetchError && <p>{fetchError}</p>}
    </div>
  </div>

  </div>
   );
}
 
export default Events;