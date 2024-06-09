import styles from './Home.module.css'
import { useState } from 'react/cjs/react.production.min';
import PostList from './PostList.jsx';

const Home = () => {
  // const [posts, setPosts] = useState([
  //   {title:"Post 1", text:"Lorem ipsum dolor sit amen"},
  //   {title:"Post 2", text:"Lorem ipsum dolor sit amen"},
  //   {title:"Post 3", text:"Lorem ipsum dolor sit amen"}
  // ]);
  const posts = [
    {title:"Post 1", text:"Lorem ipsum dolor sit amen"},
    {title:"Post 2", text:"Lorem ipsum dolor sit amen"},
    {title:"Post 3", text:"Lorem ipsum dolor sit amen"}

  ];

  return ( 
    <>
  {/* <!-- Kontener nagłówka --> */}
  <div className="header-container">
    <div className="header">
      <h1>Ogloszenia</h1>
    </div>
  </div>
  <PostList posts={posts}/>

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