import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import SideBar from "./Layout/SideBar";
import Settings from "./Settings/Settings";
import Home from "./Home/Home";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import PageNotFound from "./PageNotFound";
import supabase from "./config/supabaseClient";
import Events from "./Events/Events";
import { useEffect } from "react";
// import Schedule from "./Schedule/Schedule";  // Import the new Schedule component

const App = () => {
    const [title, setTitle] = useState('');
    const [isSigningIn, setIsSIginigIn] = useState(true);
    const [signingInError, setSigningInError] = useState(null);
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.signInWithPassword({
            email: 'test2@example',
            password: 'q'
          }).then(()=>{
            supabase.auth.getSession().then(({ data: { session:s } }) => {
                setSession(s)
            })
          })
    }, [])


    return ( 
        <Router>
            <Header title={title} />
            <SideBar/>
            <div className="App">
                <Switch>
                    <Route exact path='/'><Home session={session} setTitle={setTitle} /></Route>
                    <Route exact path='/home'><Home session={session} setTitle={setTitle} /></Route>
                    <Route exact path='/index.html'><Home session={session} setTitle={setTitle} /></Route>
                    <Route path='/ustawienia'><Settings session={session} setTitle={setTitle} /></Route>
                    <Route path='/wydarzenia'><Events session={session} setTitle={setTitle} /></Route>
                    {/* <Route path='/schedule'><Schedule setTitle={setTitle} /></Route>  // Add the new route */}
                    <Route path='/*'><PageNotFound setTitle={setTitle}/></Route>
                </Switch>
            </div>
            <Footer/>
        </Router>
     );
}
 
export default App;
