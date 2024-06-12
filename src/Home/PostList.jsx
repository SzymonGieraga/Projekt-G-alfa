import Post from "./Post";
import styles from './Home.module.css'

const PostList = ({posts}) => {
    return ( <div className={styles.postList}>{posts.toReversed().map((post => (
        <Post post={post}/>
    )))}
    </div> );
}
 
export default PostList;