import styles from './Home.module.css'
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Comment = ({comment}) => {
    const DEFAULT_TEXT_SIZE = 100;
    const textSizeOverDefault = (comment.text.length>DEFAULT_TEXT_SIZE);
    const [showAll, setShowAll] = useState(!textSizeOverDefault);
    const [contentToDisplay, setContentToDisplay] = useState('');
    useEffect(()=>{
        setContentToDisplay(showAll ? comment.text : comment.text.substring(0,DEFAULT_TEXT_SIZE));

    },[showAll])
    const setEntireTextVisibility = (e, val) => {
        setShowAll(val);
        e.preventDefault();
    }


    return ( 
        <div className={styles.comment}>
            <div className={styles.commentHead}>
                <h3 className={styles.commentAuthor}>{comment.author}</h3>
                <p className={styles.commentDate}>
                    <i>{format(new Date(comment.created_at), "dd.MM.yyyy, HH:mm")}</i>
                </p>
            </div>
            <p className={styles.commentText}>{contentToDisplay}
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
            </p>

        </div>
     );
}
 
export default Comment;