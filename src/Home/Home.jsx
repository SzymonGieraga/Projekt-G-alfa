const Home = () => {
  return ( 
    <>
  {/* <!-- Kontener nagłówka --> */}
  <div className="header-container">
    <div className="header">
      <h1>Ogloszenia</h1>
    </div>
  </div>

  {/* <!-- Kontener zawartości --> */}
  <div className="content-container">
    <div className="content">
      {/* <!-- Dodatkowe posty będą tutaj dodawane --> */}
    </div>
  </div>

  {/* <!-- Przycisk do dodawania nowego postu --> */}
  <button className="add-post-button">
    <img src="button.png" alt="Add Post"/>
  </button>
  {/* <!-- Formularz do dodawania nowego postu --> */}

  </>
   );
}
 
export default Home;