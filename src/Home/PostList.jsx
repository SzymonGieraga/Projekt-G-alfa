import Post from "./Post";
import styles from './Home.module.css'

const PostList = ({posts, session, reload}) => {
    return ( <div className={styles.postList}>{posts.map((post => (
        <Post post={post} session={session} reload={reload}/>
    )))}
    </div> );
}
 
export default PostList;