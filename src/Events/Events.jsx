import styles from './Events.module.css'
import { useState } from 'react';
import EventList from './EventList.jsx';
import useFetch from '../Hooks/useFetch.js';

const Events = ({setTitle}) => {
  setTitle("Wydarzenia");
  const [reload, setReload] = useState(false);
  const {data:events, isLoading, error} = useFetch("http://localhost:8000/events", reload);

  return ( 
    <div>
  {/* <!-- Kontener zawartości --> */}
  <div className="content-container">
    <div className="content">
      {/* <!-- Dodatkowe posty będą tutaj dodawane --> */}
      {events && (<EventList events={events}/>)}
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>{error.name}</p>}
    </div>
  </div>

  </div>
   );
}
 
export default Events;