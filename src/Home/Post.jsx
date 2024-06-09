import styles from './Home.module.css'

const Post = ({post}) => {
    return ( 
        <div className={styles.post}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <div className={styles.postBody}>
            <p>{post.text}</p>
            {/* <p>Widoczność: %group%</p> */}
            </div>
            <div className={styles.comments}></div>
            <div className={styles.actions}>
            <div className={styles.actionsContaner}>
                <a href="#" className={styles.commentButton}>Komentarz</a>
                <input type="checkbox" className={styles.wezmeUdzialCheckbox}/>
                <label for="wezme-udzial-%id%"  className={styles.wezmeUdzialLabel}>Wezme udzial</label>
                <button className={styles.moreActionsButton}>Wiecej Akcji</button>
                <div className={styles.moreActions}> {/*<!- Dodanie marginesu po lewej stronie -->*/}
                 <select name="group" required className={styles.selectAction}>
                    <option value="all">Wiecej akcji</option>
                    <option value="Zglos post">Zglos post</option>
                    <option value="Ukryj post">Ukryj post</option>
                </select>
                </div>
             </div>
            </div>
        </div>
     );
}
 
export default Post;