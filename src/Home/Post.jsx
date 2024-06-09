const Post = () => {
    return ( 
        <div className="post" id="post-%id%">
            <h2>%title%</h2>
            <div className="meta">
            <p>%content%</p>
            <p>Widoczność: %group%</p>
            </div>
            <div className="comments"></div>
            <div className="actions" style="display: flex; justify-content: space-between; margin-top: 10px;">
            <div style="display: flex; align-items: center;">
                <a href="#" className="comment-button" style="margin-right: 10px;">Komentarz</a>
                <input type="checkbox" id="wezme-udzial-%id%" name="wezme-udzial-%id%" style="margin-left: 60px;"/>
                <label for="wezme-udzial-%id%" style="margin-right: 5px;">Wezme udzial</label>
                <button className="more-actions-button" style="border: none; margin-left: 60px;background-color: transparent; cursor: default;">Wiecej Akcji</button>
                <div className="more-actions" style="margin-left: 10px;"> {/*<!-- Dodanie marginesu po lewej stronie -->*/}
                <select id="group-%id%" name="group" required style="margin-right: 2px;">
                    <option value="all">Wiecej akcji</option>
                    <option value="Zglos post">Zglos post</option>
                    <option value="Ukryj post">Ukryj post</option>
                </select>
                </div>
            </div>
            </div>
            <form className="add-comment-form" style="display: none;">
            <label for="comment">Tresc:</label>
            <textarea id="comment-%id%" name="comment" required></textarea>
            <button type="submit">Dodaj komentarz</button>
            </form>
        </div>
     );
}
 
export default Post;