import { Link } from "react-router-dom";
import planZajecImage from './images/Plan zajec.png'
import tablicaImage from './images/Tablica.png'
import termiarzImage from './images/Terminarz.png'
import ustawieniaImage from './images/Ustawienia.png'
import wydarzeniaImage from './images/Wydarzenia.png'
import potitechnikaHerbImage from './images/politechnikałódzkaherb.jpg'

const SideBar = () => {
    return ( 
        <div id="mySidenav" className="sidenav">
            <img id='image-herb' src={potitechnikaHerbImage} alt="Herb Politechniki Łódzkiej"/>
            <Link to='/terminarz'><img src={termiarzImage} alt="Termiarz"/></Link>
            <Link to='/plan-zajec'><img src={planZajecImage} alt="Plan Zajęć"/></Link>
            <Link to='/'><img src={tablicaImage} alt="Tablica Ogłoszeń"/></Link>
            <Link to='/wydarzenia'><img src={wydarzeniaImage} alt="Wydarzenia"/></Link>
            <Link to='/ustawienia'><img src={ustawieniaImage} alt="Ustawienia"/></Link>
        </div>
     );
}
 
export default SideBar;