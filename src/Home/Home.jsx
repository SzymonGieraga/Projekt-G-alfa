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
    {title:"Post 1", text:"Lorem ipsum dolor sit amen", id:1},
    {title:"Post 2", text:"Lorem ipsum dolor sit amen", id:2},
    {title:"Post 3", text:"Lorem ipsum dolor sit amen", id:3}

  ];

  return ( 
    <div styles={styles}>
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
      <PostList posts={posts}/>
    </div>
  </div>

  {/* <!-- Przycisk do dodawania nowego postu --> */}
  <button className="add-post-button">
    <img src="button.png" alt="Add Post"/>
  </button>
  {/* <!-- Formularz do dodawania nowego postu --> */}

  </div>
   );
}
 
export default Home;