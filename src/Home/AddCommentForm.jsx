import style from './Home.module.css'
import React from 'react';
import useTextArea from '../Hooks/useTextArea';
import supabase from '../config/supabaseClient';
import {toast} from 'react-toastify'

const AddCommentForm = ({post_id, session, reload, setReload}) => {
    const {value, textareaRef, onChange, setValue} = useTextArea(32);

    const addComment = async (e) => {
        e.preventDefault();
        if (!session) return;
        await supabase
        .from('comments')
        .insert([
            {author_id:session.user.id, post_id:post_id, text:value}
        ])
        .then(({error}) => {
            if (error){
                console.log(error)
                toast.error("Nie udało się dodać komentarza!")
            }
            else{
                setReload(!reload);
                setValue("");
                toast.success("Udało się dodać komentarz")
                
            }
        })
    }
    return ( 
        <form className={style.addCommentForm}>
            <textarea value={value} onChange={onChange} ref={textareaRef} className={style.addCommentTextarea} placeholder="Napisz komentarz..."  name="comment" required contenteditable></textarea>
            <button onClick={(e) => addComment(e)} className={style.addCommentButton} type="submit">Dodaj komentarz</button>
        </form>
     );
}
 
export default AddCommentForm;