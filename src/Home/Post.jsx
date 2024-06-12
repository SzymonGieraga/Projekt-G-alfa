import styles from './Home.module.css'
import CommentList from './CommentList';
import { useState, useEffect } from 'react';
import { format } from "date-fns";


const Post = ({post}) => {
    const [showComments, setShowComments] = useState(false);
    const DEFAULT_TEXT_SIZE = 500;

    const textSizeOverDefault = (post.text.length>DEFAULT_TEXT_SIZE);
    const [showAll, setShowAll] = useState(!textSizeOverDefault);
    const [contentToDisplay, setContentToDisplay] = useState('');
    useEffect(()=>{
        setContentToDisplay(showAll ? post.text : post.text.substring(0,DEFAULT_TEXT_SIZE));

    },[showAll, post.text])

    const showCommentsButtonClickHandler = (e) => {
        setShowComments(!showComments);
        e.preventDefault();
    }

    const setEntireTextVisibility = (e, val) => {
        setShowAll(val);
        e.preventDefault();
    }

    const postTakePart = (e) => {

    }

    return ( 
        <div className={styles.post}>
            {/* Head------------------------------------------------------------------- */}
            <div className={styles.postHead}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <div className={styles.postMetaData}>
                    <p className={styles.postAuthorName}><strong>{post.author}</strong></p>
                    <p className={styles.postDate}><i>{format(new Date(post.created_at), "dd.MM.yyyy, HH:mm")}</i></p>
                </div>
            </div>

            {/* Body------------------------------------------------------------------- */}
            <div className={styles.postBody}>
                {contentToDisplay}
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
            </div>

            {/* Event details---------------------------------------------------------- */}
            {post.is_event && <div className={styles.postEventDetails}>
                    <p>Data: {format(new Date(post.event.date), "dd.MM.yyyy  (eeee)")} </p>
                    <p>Czas: {post.event.time_starts} - {post.event.time_ends}</p>
                    <p>Lokalizacja: {post.event.location}</p>
                </div>}

            {/* Actions---------------------------------------------------------------- */}
            <div className={styles.actions}>
                <a href="#" onClick={(e) => showCommentsButtonClickHandler(e)} 
                    className={styles.commentButton}>
                    Komentarze...
                </a>

                {post.is_event && <label className={styles.postTakePart}>
                        <input type="checkbox" onClick={(e)=>postTakePart(e)}/> 
                        Wezmę udział
                    </label>}

                 <select required className={styles.selectAction}>
                    <option value="all">Wiecej akcji</option>
                    <option value="Zglos post">Zglos post</option>
                    <option value="Ukryj post">Ukryj post</option>
                </select>
            </div>


            {/* Comments--------------------------------------------------------------- */}
            {showComments && (<CommentList post_id={post.id}/>)}
        </div>
     );
}
 
export default Post;