import styles from './Home.module.css'
import CommentList from './CommentList';
import { useState, useEffect } from 'react';

const Post = ({post}) => {
    const [showComments, setShowComments] = useState(false);
    const DEFAULT_TEXT_SIZE = 500;

    const textSizeOverDefault = (post.text.length>DEFAULT_TEXT_SIZE);
    const [showAll, setShowAll] = useState(!textSizeOverDefault);
    const [contentToDisplay, setContentToDisplay] = useState('');
    useEffect(()=>{
        setContentToDisplay(showAll ? post.text : post.text.substring(0,DEFAULT_TEXT_SIZE));

    },[showAll])

    return ( 
        <div className={styles.post}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <div className={styles.postBody}>
            <p>
                {contentToDisplay}
                {!showAll && (
                    <a className={styles.textSizeControll} href='#' onClick={() => setShowAll(true)}>...</a>
                )}
                {showAll && textSizeOverDefault && (
                    <a className={styles.textSizeControll} href='#' onClick={() => setShowAll(false)}> Ukryj </a>
                )}
            
            </p>
            {/* <p>Widoczność: %group%</p> */}
            </div>
            <div className={styles.actions}>
                <a href="#" onClick={() => setShowComments(!showComments)} className={styles.commentButton}>Komentarze...</a>
                 <select name="group" required className={styles.selectAction}>
                    <option value="all">Wiecej akcji</option>
                    <option value="Zglos post">Zglos post</option>
                    <option value="Ukryj post">Ukryj post</option>
                </select>

            </div>
             {showComments && (<CommentList comments={post.comments}/>)}
        </div>
     );
}
 
export default Post;