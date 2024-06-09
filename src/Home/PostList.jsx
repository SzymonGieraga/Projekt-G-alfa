import Post from "./Post";
import styles from './Home.module.css'

const PostList = ({posts}) => {
    return ( <div className="post-list">{posts.map((post => (
        <Post post={post}/>
    )))}
    </div> );
}
 
export default PostList;