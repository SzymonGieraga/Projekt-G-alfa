import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBar from "./SideBar";
import Settings from "./Settings";
import Home from "./Home/Home";

const App = () => {
    return ( 
        <Router>
            <div className="App">
                <SideBar/>
                <Switch>
                    <Route exact path='/'><Home/></Route>
                    <Route path='/ustawienia'><Settings/></Route>
                

                </Switch>
            </div>
        </Router>
     );
}
 
export default App;