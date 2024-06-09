const Post = ({post}) => {
    return ( 
        <div className="post">
            <h2>{post.title}</h2>
            <div className="meta">
            <p>{post.text}</p>
            {/* <p>Widoczność: %group%</p> */}
            </div>
            <div className="comments"></div>
            <div className="actions">
            <div className="actions-contaner">
                <a href="#" className="comment-button">Komentarz</a>
                <input type="checkbox" className="wezme-udzial-checkbox"/>
                <label for="wezme-udzial-%id%"  className="wezme-udzial-label">Wezme udzial</label>
                <button className="more-actions-button">Wiecej Akcji</button>
                <div className="more-actions"> {/*<!-- Dodanie marginesu po lewej stronie -->*/}
                 <select name="group" required className="select-action">
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