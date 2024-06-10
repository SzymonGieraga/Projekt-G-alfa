import Comment from './Comment';
import styles from './Home.module.css'
import AddCommentForm from './AddCommentForm';

const CommentList = ({comments}) => {
    return ( 
        <div className={styles.commentList}>
            <AddCommentForm/>
            {comments.map(comment => (
                <Comment comment={comment}/>
            ))}
        </div>
     );
}
 
export default CommentList;