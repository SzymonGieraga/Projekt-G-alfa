import styles from './Events.module.css'
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import EventDetails from '../Content/EventDetails';
import Content from '../Content/Content';
import supabase from '../config/supabaseClient';


const Event = ({event, session}) => {
    const DEFAULT_TEXT_SIZE = 500;
    const [takePart, setTakePart] = useState(false);

    useEffect(()=>{
        if (!session) return;
        supabase.from('event_participations')
        .select()
        .eq('event_id', event.id)
        .then(({data})=>{
            if (data && data.length>0) setTakePart(true);
        })

    }, [session])


    const eventTakePart = async (e) => {
            if (!session) return;
            setTakePart(e.target.checked)
            if(e.target.checked){
                await supabase
                .from('event_participations')
                .insert([
                    { user_id: session.user.id, event_id: event.id }
                ]).then(({error})=>{
                    if (error){
                        console.log(error);
                    }
                })
            }
            else{
                await supabase
                .from('event_participations')
                .delete()
                .eq('user_id', session.user.id)
                .eq('event_id', event.id)
                .then(({error}) => {
                    if (error) console.log(error);
                })
            }
    }

    return ( 
        <article>
            <div className={styles.event}>
                {/* Head------------------------------------------------------------------- */}
                <div className={styles.eventHead}>
                    <h2 className={styles.eventTitle}>{event.name}</h2>
                    <p className={styles.eventDate}><i>{format(new Date(event.created_at), "dd.MM.yyyy, HH:mm")}</i></p>
                </div>

                {/* Body------------------------------------------------------------------- */}
                <div className={styles.eventBody}>
                    <Content text={event.description} defaultSizeToDisplay={DEFAULT_TEXT_SIZE}/>
                </div>

                {/* Event details---------------------------------------------------------- */}
                <EventDetails event={event}/>

                {/* Actions---------------------------------------------------------------- */}
                <div className={styles.actions}>
                    <label className={styles.eventTakePart}>
                            <input type="checkbox" checked={takePart} onChange={(e)=>eventTakePart(e)}/> 
                            Wezmę udział
                    </label>

                    <select required className={styles.selectAction}>
                        <option value="all">Wiecej akcji</option>
                        <option value="Zglos post">Zglos post</option>
                        <option value="Ukryj post">Ukryj post</option>
                    </select>
                </div>
            </div>
        </article>
     );
}
 
export default Event;