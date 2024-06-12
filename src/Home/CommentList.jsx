import Comment from './Comment';
import styles from './Home.module.css'
import AddCommentForm from './AddCommentForm';
import useFetch from '../Hooks/useFetch';
import { useState, useEffect } from 'react';

const CommentList = ({post_id}) => {

    const [comments, setComments] = useState([]);
    const {data:commentList, isLoading, error} = useFetch(`http://localhost:8000/comments/${post_id}`)

    useEffect(() =>{
        setComments(commentList.comments);
    },[commentList])
    return ( 
        <div className={styles.commentList}>
            <AddCommentForm/>
            {comments && comments.map(comment => (
                <Comment comment={comment}/>
            ))}
            {isLoading && <p>Loading...</p>}
        </div>
     );
}
 
export default CommentList;