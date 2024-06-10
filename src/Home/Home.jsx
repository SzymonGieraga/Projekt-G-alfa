import styles from './Home.module.css'
import { useState } from 'react';
import PostList from './PostList.jsx';
import butonImage from '../images/add-button.png'

const Home = ({setTitle}) => {
  setTitle("Ogłoszenia");
  const [posts, setPosts] = useState([
    {title:"Post 1", comments:[
      {author:"L.", text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed lectus. Nam aliquam sem et tortor. Sollicitudin tempor id eu nisl. Velit euismod in pellentesque massa placerat duis ultricies."},
      {author:"M.", text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed lectus. Nam aliquam sem et tortor. Sollicitudin tempor id eu nisl. Velit euismod in pellentesque massa placerat duis ultricies. Vel quam elementum pulvinar etiam non quam lacus suspendisse. Suspendisse faucibus interdum posuere lorem ipsum dolor sit. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Justo laoreet sit amet cursus sit. Viverra mauris in aliquam sem fringilla ut. Posuere urna nec tincidunt praesent semper feugiat. Nibh ipsum consequat nisl vel. Elit scelerisque mauris pellentesque pulvinar. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Mauris augue neque gravida in fermentum. Id consectetur purus ut faucibus pulvinar elementum integer. A pellentesque sit amet porttitor eget dolor. Viverra nam libero justo laoreet sit amet. Faucibus purus in massa tempor nec. Sed euismod nisi porta lorem. Proin sed libero enim sed. Viverra adipiscing at in tellus. Eget magna fermentum iaculis eu. Ipsum suspendisse ultrices gravida dictum fusce. Facilisi morbi tempus iaculis urna id volutpat lacus. Malesuada pellentesque elit eget gravida cum sociis. Tempus egestas sed sed risus. Eget nullam non nisi est sit amet. Nec ullamcorper sit amet risus nullam eget felis eget. Volutpat blandit aliquam etiam erat velit scelerisque in. Imperdiet proin fermentum leo vel orci. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Volutpat est velit egestas dui id ornare. In ornare quam viverra orci sagittis eu volutpat."},
      {author:"M.", text:"Testowy komentarz32"},
      {author:"M.", text:"Testowy komentarz32"},
      {author:"M.", text:"Testowy komentarz32"},
      {author:"M.", text:"Testowy komentarz32"},
      {author:"M.", text:"Testowy komentarz32"},
      {author:"M.", text:"Testowy komentarz32"},
      {author:"M.", text:"Testowy komentarz32"},
      {author:"M.", text:"Testowy komentarz32"},
      {author:"M.", text:"Testowy komentarz32"},
      {author:"M.", text:"Testowy komentarz32"}
    ], text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {title:"Post 2", text:"Lorem ipsum dolor sit amen", comments:[{author:"L.", text:"Testowy komentarz2"}]},
    {title:"Post 3", text:"Lorem ipsum dolor sit amen", comments:[{author:"L.", text:"Testowy komentarz3"}]}
  ]);


  return ( 
    <div>
  {/* <!-- Kontener zawartości --> */}
  <div className="content-container">
    <div className="content">
      {/* <!-- Dodatkowe posty będą tutaj dodawane --> */}
      <PostList posts={posts}/>
    </div>
  </div>

  {/* <!-- Przycisk do dodawania nowego postu --> */}
  <button className="add-post-button">
    <img src={butonImage} alt="Add Post"/>
  </button>
  {/* <!-- Formularz do dodawania nowego postu --> */}

  </div>
   );
}
 
export default Home;