import styles from './Home.module.css'
import { useState, useEffect } from 'react';

const Comment = ({comment}) => {
    const defaultTextSize = 100;
    const textSizeOverDefault = (comment.text.length>defaultTextSize);
    const [showAll, setShowAll] = useState(!textSizeOverDefault);
    const [contentToDisplay, setContentToDisplay] = useState('');
    useEffect(()=>{
        setContentToDisplay(showAll ? comment.text : comment.text.substring(0,defaultTextSize));

    },[showAll])


    return ( 
        <div className={styles.comment}>
            <h3 className={styles.commentAuthor}>{comment.author}</h3>
            <p className={styles.commentText}>{contentToDisplay}
            {!showAll && (
                <a className={styles.textSizeControll} href='#' onClick={() => setShowAll(true)}>...</a>
            )}
            {showAll && textSizeOverDefault && (
                <a className={styles.textSizeControll} href='#' onClick={() => setShowAll(false)}> Ukryj </a>
            )}
            </p>

        </div>
     );
}
 
export default Comment;