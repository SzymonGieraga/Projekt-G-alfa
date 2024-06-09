const AddCommentForm = () => {
    return ( 
        <form className="add-comment-form">
            <label for="comment">Tresc:</label>
            <textarea id="comment" name="comment" required></textarea>
            <button type="submit">Dodaj komentarz</button>
        </form>
     );
}
 
export default AddCommentForm;