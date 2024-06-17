import Post from "./Post";
import styles from './Home.module.css'

const PostList = ({posts, session}) => {
    return ( <div className={styles.postList}>{posts.toReversed().map((post => (
        <Post post={post} session={session}/>
    )))}
    </div> );
}
 
export default PostList;