import style from './Home.module.css'
import React from 'react';

const AddCommentForm = () => {
    const textareaRef = React.useRef(null);
    const [value, setValue] = React.useState("");
    const onChange = (event) => setValue(event.target.value);
    const MIN_TEXTAREA_HEIGHT = 32;

    React.useLayoutEffect(() => {
        // Reset height - important to shrink on delete
        textareaRef.current.style.height = "inherit";
        // Set height
        textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
        )}px`;
    }, [value]);


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