import Event from "./Event";
import styles from './Events.module.css'

const EventList = ({events, session}) => {
    return ( <div className={styles.eventsList}>{events.map((event => (
        <Event session={session} event={event}/>
    )))}
    </div> );
}
 
export default EventList;