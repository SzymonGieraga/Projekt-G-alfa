import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import SideBar from "./SideBar";
import Settings from "./Settings";
import Home from "./Home/Home";
import Header from "./Header";
import Footer from "./Footer";

const App = () => {
    const [title, setTitle] = useState('');

    return ( 
        <Router>
            <Header title={title} />
            <SideBar/>
            <div className="App">
                <Switch>
                    <Route exact path='/'><Home setTitle={setTitle} /></Route>
                    <Route path='/ustawienia'><Settings setTitle={setTitle} /></Route>
                    <Route path='/*'><p>Nie znaleziono strony :(</p></Route>
                

                </Switch>
            </div>
            <Footer/>
        </Router>
     );
}
 
export default App;