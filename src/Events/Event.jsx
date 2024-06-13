import styles from './Events.module.css'
import { useState, useEffect } from 'react';
import { format } from "date-fns";


const Event = ({event}) => {
    const DEFAULT_TEXT_SIZE = 500;
    const textSizeOverDefault = (event.text.length>DEFAULT_TEXT_SIZE);
    const [showAll, setShowAll] = useState(!textSizeOverDefault);
    const [contentToDisplay, setContentToDisplay] = useState('');
    useEffect(()=>{
        setContentToDisplay(showAll ? event.text : event.text.substring(0,DEFAULT_TEXT_SIZE));

    },[showAll, event.text])

    const setEntireTextVisibility = (e, val) => {
        setShowAll(val);
        e.preventDefault();
    }

    const eventTakePart = (e) => {

    }

    return ( 
        <arcticle>
            <div className={styles.event}>
                {/* Head------------------------------------------------------------------- */}
                <div className={styles.eventHead}>
                    <h2 className={styles.eventTitle}>{event.title}</h2>
                    <p className={styles.eventDate}><i>{format(new Date(event.created_at), "dd.MM.yyyy, HH:mm")}</i></p>
                </div>

                {/* Body------------------------------------------------------------------- */}
                <div className={styles.eventBody}>
                    {contentToDisplay}
                    {!showAll && (
                        <a className={styles.textSizeControll} 
                        href='#' 
                        onClick={(e) => setEntireTextVisibility(e, true)}>...</a>
                    )}
                    {showAll && textSizeOverDefault && (
                        <a className={styles.textSizeControll} 
                        href='#' 
                        onClick={(e) => setEntireTextVisibility(e, false)}> Ukryj </a>
                    )}
                </div>

                {/* Event details---------------------------------------------------------- */}
                <div className={styles.eventDetails}>
                    <p>Data: {format(new Date(event.date), "dd.MM.yyyy  (eeee)")} </p>
                    <p>Czas: {event.time_starts} - {event.time_ends}</p>
                    <p>Lokalizacja: {event.location}</p>
                </div>

                {/* Actions---------------------------------------------------------------- */}
                <div className={styles.actions}>
                    <label className={styles.eventTakePart}>
                            <input type="checkbox" onClick={(e)=>eventTakePart(e)}/> 
                            Wezmę udział
                        </label>

                    <select required className={styles.selectAction}>
                        <option value="all">Wiecej akcji</option>
                        <option value="Zglos post">Zglos post</option>
                        <option value="Ukryj post">Ukryj post</option>
                    </select>
                </div>
            </div>
        </arcticle>
     );
}
 
export default Event;