import {useState} from 'react'
import styles from './Home.module.css'
import useTextArea from '../Hooks/useTextArea';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import supabase from '../config/supabaseClient';
import {toast} from 'react-toastify'

const AddPostForm = ({onCancel, onSubmit, session, addPostHiding}) => {
    const {value:text, textareaRef, onChange:postTextOnChange} = useTextArea(32);
    const [title, setTitle] = useState('');
    const [isEvent, setIsEvent] = useState(false);
    const [groupVisibility, setGroupVisibility] = useState('Wszystkie grupy');
    const [eventDate, setEventDate] = useState(new Date());
    const [eventTimeStarts, setEventTimeStarts] = useState(new Date());
    const [eventTimeEnds, setEventTimeEnds] = useState(new Date());
    const [eventLocation, setEventLocation] = useState('');


    const submitForm = async (e) =>{
        e.preventDefault();
        var event;
        const post = {title:title, text:text, author_id:session.user.id, is_event:isEvent, date:eventDate, starts_at:format(eventTimeStarts, "HH:mm"), ends_at:format(eventTimeEnds, "HH:mm"), location:eventLocation};
        await supabase.from('posts')
        .insert(post)
        .then(()=>{
            toast.success("Dodano post")
        }).catch((err)=>{
            console.log(err)
            toast.error("Nie udało się dodać posta!")
        })
        onSubmit();
    }

    return ( 
    <form onSubmit={(e)=>submitForm(e)} className={styles.addPostForm+" "+(addPostHiding ? styles.addPostFormHide : "")}>
        {/*<h2 style="text-align: center;">Dodawanie Ogłoszenia</h2>*/} {/*<!-- Dodanie nagłówka przed polem tytułu -->*/}
        <label for="title">Tytul:</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" id="title" name="title" required/>
        <label for={styles.content}>Tresc:</label>
        <textarea ref={textareaRef} className={styles.addPostTextArea} onChange={(e) => postTextOnChange(e)} name="content" required></textarea>
        <label for="group">Widoczność:</label>
        <select value={groupVisibility} onChange={(e)=>setGroupVisibility(e.target.value)} id="group" name="group" required>
            <option value="Wszystkie grupy">Wszystkie grupy</option>
            <option value="Grupa 4I1">4I1</option>
            <option value="Grupa 4I2">4I2</option>
            <option value="Grupa 4I3">4I3</option>
            <option value="Grupa 4I4">4I4</option>
            <option value="Grupa 4I5">4I5</option>
            <option value="Grupa 4I6">4I6</option>
            <option value="Grupa 4I7">4I7</option>
            <option value="Grupa 4I8">4I8</option>
        </select>

        <div id={styles.postFormIsEvent}>
            <label id={styles.postFormIsEventLabel} for={styles.postFormIsEventCheckbox}>Jest aktywnością</label>
            <input type="checkbox" value={isEvent} onChange={(e)=>setIsEvent(e.target.checked)} id={styles.postFormIsEventCheckbox}/>
        </div>
        {isEvent && <div id={styles.postEvent}>
                <div>
                    <label for={styles.postEventDate}>Data</label>
                    <DatePicker
                                name={styles.postEventDate}
                                required
                                selected={eventDate}
                                onChange={(date) => setEventDate(date)}
                                dateFormat="MMMM d, yyyy"
                            />
                    <label>Czas</label>
                    <label for={styles.postEventTimeStarts}>Początek</label>
                    <DatePicker
                        name={styles.postEventTimeStarts}
                        placeholder="Początek"
                        required
                        label="Początek"
                        selected={eventTimeStarts}
                        onChange={(date) => setEventTimeStarts(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        timeFormat="HH:mm"
                        dateFormat="HH:mm"
                    />
                    <label for={styles.postEventTimeEnds}>Koniec</label>
                    <DatePicker
                        name={styles.postEventTimeEnds}
                        required
                        placeholder="Koniec"
                        selected={eventTimeEnds}
                        onChange={(date) => setEventTimeEnds(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        timeFormat="HH:mm"
                        dateFormat="HH:mm"
                    />
                    <label for={styles.postEventLocalisation}>Lokalizacja</label>
                    <input type="text" name={styles.postEventLocalisation} required
                    onChange={(e)=>setEventLocation(e.target.value)}/>
                </div>
            </div>}
        <button type="submit">Dodaj Post</button>
        <button type="button" onClick={onCancel} className={styles.cancelPostButton}>Anuluj</button> {/*<!-- Dodanie przycisku anulowania -->*/}
    </form>

     );
}
 
export default AddPostForm;