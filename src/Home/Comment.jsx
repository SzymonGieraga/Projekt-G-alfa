import styles from './Home.module.css'
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Content from '../Content/Content';

const Comment = ({comment}) => {
    const DEFAULT_TEXT_SIZE = 100;

    return ( 
        <div className={styles.comment}>
            <div className={styles.commentHead}>
                <h3 className={styles.commentAuthor}>{comment.author}</h3>
                <p className={styles.commentDate}>
                    <i>{format(new Date(comment.created_at), "dd.MM.yyyy, HH:mm")}</i>
                </p>
            </div>
            <p className={styles.commentText}>
                    <Content text={comment.text} defaultSizeToDisplay={DEFAULT_TEXT_SIZE}/>
            </p>

        </div>
     );
}
 
export default Comment;