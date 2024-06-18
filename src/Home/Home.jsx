import styles from './Home.module.css'
import { useState } from 'react';
import PostList from './PostList.jsx';
import butonImage from '../images/add-button.png'
import useFetch from '../Hooks/useFetch.js';
import AddPostForm from './AddPostForm.jsx';

const Home = ({setTitle, session}) => {
  setTitle("Ogłoszenia");
  const [reload, setReload] = useState(false);
  const {data:posts, isLoading, fetchError} = useFetch("posts_view", reload, session);
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [addPostHiding, setAddPostHiding] = useState(false);

  const addPostSubmitHandler = ()=>{
    addPostHide();
    setReload(!reload);
  }
  function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
  const addPostHide = async () =>{
    setAddPostHiding(true);
    await delay(500);
    setShowAddPostForm(false);
    await delay(100);
    setAddPostHiding(false);
  }
  const addPostShow = async () =>{
    setAddPostHiding(false);
    setShowAddPostForm(true);
  }
  const addPostButtonClickHandler = () =>{
      if (addPostHiding) return;
      if (showAddPostForm) addPostHide();
      else addPostShow();
  }
  return ( 
    <div>
  {/* <!-- Kontener zawartości --> */}
  <div className="content-container">
    <div className="content">
      {/* <!-- Dodatkowe posty będą tutaj dodawane --> */}
      {posts && (<PostList posts={posts} session={session} reload={reload} />)}
      {isLoading && <p>Ładowanie...</p>}
      {fetchError && <p>{fetchError}</p>}
    </div>
  </div>
  {/* <!-- Przycisk do dodawania nowego postu --> */}
  <button onClick={addPostButtonClickHandler} className={styles.addPostButton}>
    +
  </button>
  {/* <!-- Formularz do dodawania nowego postu --> */}
  {showAddPostForm && <AddPostForm reload={reload} setReload={setReload} onSubmit={addPostSubmitHandler} onCancel={addPostHide} session={session} addPostHiding={addPostHiding}/>}
  </div>
   );
}
 
export default Home;