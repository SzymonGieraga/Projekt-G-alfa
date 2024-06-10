const NewPostForm = () => {
    return ( 
    <form className="add-post-form">
        {/*<h2 style="text-align: center;">Dodawanie Ogłoszenia</h2>*/} {/*<!-- Dodanie nagłówka przed polem tytułu -->*/}
        <label for="title">Tytul:</label>
        <input type="text" id="title" name="title" required/>
        <label for="content">Tresc:</label>
        <textarea id="content" name="content" required></textarea>
        <label for="group">Widoczność:</label>
        <select id="group" name="group" required>
        <option value="Wszystkie grupy">Wszystkie grupy</option>
        <option value="Grupa 4I1">4I1</option>
        <option value="Grupa 4I2">4I2</option>
        <option value="Grupa 4I3">4I3</option>
        <option value="Grupa 4I4">4I4</option>
        <option value="Grupa 4I5">4I5</option>
        <option value="Grupa 4I6">4I6</option>
        <option value="Grupa 4I7">4I7</option>
        <option value="Grupa 4I8">4I8</option>
        </select>
        <button type="submit">Dodaj Post</button>
        <button type="button" className="cancel-post-button">Anuluj</button> {/*<!-- Dodanie przycisku anulowania -->*/}
    </form>

     );
}
 
export default NewPostForm;