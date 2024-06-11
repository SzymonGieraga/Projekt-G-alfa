import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import SideBar from "./Layout/SideBar";
import Settings from "./Settings/Settings";
import Home from "./Home/Home";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import PageNotFound from "./PageNotFound";
import Schedule from "./Schedule/Schedule";  // Import the new Schedule component

const App = () => {
    const [title, setTitle] = useState('');

    return ( 
        <Router>
            <Header title={title} />
            <SideBar/>
            <div className="App">
                <Switch>
                    <Route exact path='/'><Home setTitle={setTitle} /></Route>
                    <Route exact path='/home'><Home setTitle={setTitle} /></Route>
                    <Route exact path='/index.html'><Home setTitle={setTitle} /></Route>
                    <Route path='/ustawienia'><Settings setTitle={setTitle} /></Route>
                    <Route path='/schedule'><Schedule setTitle={setTitle} /></Route>  // Add the new route
                    <Route path='/*'><PageNotFound setTitle={setTitle}/></Route>
                </Switch>
            </div>
            <Footer/>
        </Router>
     );
}
 
export default App;
