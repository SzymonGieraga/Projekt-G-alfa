import styles from './Content.module.css'
import { format } from "date-fns";

const EventDetails = ({event}) => {
    return ( 
        <div className={styles.eventDetails}>
            <p>Data: {format(new Date(event.date), "dd.MM.yyyy  (eeee)")} </p>
            <p>Czas: {event.time_starts} - {event.time_ends}</p>
            <p>Lokalizacja: {event.location}</p>
        </div>
     );
}
 
export default EventDetails;