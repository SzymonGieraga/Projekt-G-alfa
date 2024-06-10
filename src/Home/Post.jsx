import styles from './Home.module.css'
import CommentList from './CommentList';
import { useState } from 'react';

const Post = ({post}) => {
  const [showComments, setShowComments] = useState(false);

    return ( 
        <div className={styles.post}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <div className={styles.postBody}>
            <p>{post.text}</p>
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