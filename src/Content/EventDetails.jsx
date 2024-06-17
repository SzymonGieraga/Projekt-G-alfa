import styles from './Content.module.css'
import { format } from "date-fns";

const EventDetails = ({event}) => {
    return ( 
        <div className={styles.eventDetails}>
            <p>Data: {format(new Date(event.date), "dd.MM.yyyy  (eeee)")} </p>
            <p>Czas: {event.starts_at} - {event.ends_at}</p>
            <p>Lokalizacja: {event.location}</p>
        </div>
     );
}
 
export default EventDetails;