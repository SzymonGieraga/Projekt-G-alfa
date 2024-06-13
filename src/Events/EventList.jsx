import Event from "./Event";
import styles from './Events.module.css'

const EventList = ({events}) => {
    return ( <div className={styles.eventsList}>{events.toReversed().map((event => (
        <Event event={event}/>
    )))}
    </div> );
}
 
export default EventList;