import styles from './Events.module.css'
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import EventDetails from '../Content/EventDetails';
import Content from '../Content/Content';


const Event = ({event}) => {
    const DEFAULT_TEXT_SIZE = 500;
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
                    <Content text={event.text} defaultSizeToDisplay={DEFAULT_TEXT_SIZE}/>
                </div>

                {/* Event details---------------------------------------------------------- */}
                <EventDetails event={event}/>

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