import Comment from './Comment';
import styles from './Home.module.css'
import AddCommentForm from './AddCommentForm';
import useFetch from '../Hooks/useFetch';
import { useState, useEffect } from 'react';

const CommentList = ({post_id, session}) => {

    const [comments, setComments] = useState([]);
    const [reload, setReload] = useState(false);
    const {data:commentList, isLoading, fetchError} = useFetch('comments_view', reload, session)

    useEffect(() =>{
        if (!commentList) return;
        console.log(commentList)
        setComments(commentList.filter((comment) => comment.post_id === post_id));
        
    },[commentList])
    return ( 
        <div className={styles.commentList}>
            <AddCommentForm session={session} post_id={post_id} setReload={setReload} reload={reload}/>
            {commentList && comments.map(comment => (
                <Comment comment={comment}/>
            ))}
            {isLoading && <p>Ładowanie...</p>}
        </div>
     );
}
 
export default CommentList;