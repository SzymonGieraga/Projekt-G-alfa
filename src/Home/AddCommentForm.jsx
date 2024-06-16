import style from './Home.module.css'
import React from 'react';
import useTextArea from '../Hooks/useTextArea';

const AddCommentForm = ({post_id}) => {
    const {value, textareaRef, onChange} = useTextArea(32);

    const addComment = (e) => {
        e.preventDefault();
    }
    return ( 
        <form className={style.addCommentForm}>
            <textarea onChange={onChange} ref={textareaRef} className={style.addCommentTextarea} placeholder="Napisz komentarz..."  name="comment" required contenteditable></textarea>
            <button onClick={(e) => addComment(e)} className={style.addCommentButton} type="submit">Dodaj komentarz</button>
        </form>
     );
}
 
export default AddCommentForm;