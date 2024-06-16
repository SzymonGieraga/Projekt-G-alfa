import './style.css';

function TimeTable({session, setTitle}) {
  setTitle("Plan zajęć")
  return (
  
<div className='TimeTable'>

    <div className="header-container">
      <div className="header">
              <h1>Plany Zajec</h1>
                <div className="group-selector-container">
                  <label for="group-select-button">Plan grupy:</label>
                  <select className = "group-select-button" id = "group-select" onchange="changeImage()">
                    <option value="4I1">4I1</option>
                    <option value="4I2">4I2</option>
                    <option value="4I3">4I3</option>
                    <option value="4I4">4I4</option>
                    <option value="4I5">4I5</option>
                    <option value="4I6">4I6</option>
                    <option value="4I7">4I7</option>
                    <option value="4I8">4I8</option>
                  </select>
                </div>
            </div>
    </div>

  
  <div className = "timetable">
      <div className = "a">
        <p className = "t1">8:15 - 9:45</p>
      </div>
      <div className = "b">
        <p className = "t1">10:15 - 11:45</p>
      </div>
      <div className = "c">
        <p className = "t1">12:15 - 14:45</p>
      </div>
      <div className = "d">
        <p className = "t1">15:15 - 16:45</p>
      </div>
      <div className = "e">
        <p className = "t1">17:15 - 18:45</p>
      </div>
      <div className = "f">
        <p className = "t1">19:15 - 20:45</p>
      </div>
  </div>

  <div className = "dayoftheweek">
      <div className = "empty"></div>
        <div className = "poniedzialek">
          <p className = "t2">PONIEDZIALK</p>
        </div>
        <div className = "wtorek">
          <p className = "t2">WTOREK</p>
        </div>
        <div className = "sroda">
          <p className = "t2">SRODA</p>
        </div>
        <div className = "czwartek">
          <p className = "t2">CZWARTEK</p>
        </div>
        <div className = "piatek">
          <p className = "t2">PIATEK</p>
        </div>
  </div>

  <div className="table-container">

    <div className = "a1">

    </div>
    <div className = "a2">

    </div>
    <div className = "a3">

    </div>
    <div className = "a4">

    </div>
    <div className = "a5">

    </div>
    <div className = "a6">

    </div>

    <div className = "b1">

    </div>
    <div className = "b2">

    </div>
    <div className = "b3">

    </div>
    <div className = "b4">

    </div>
    <div className = "b5">

    </div>
    <div className = "b6">

    </div>


    <div className = "c1">

    </div>
    <div className = "c2">

    </div>
    <div className = "c3">

    </div>
    <div className = "c4">

    </div>
    <div className = "c5">

    </div>
    <div className = "c6">

    </div>


    <div className = "d1">

    </div>
    <div className = "d2">

    </div>
    <div className = "d3">

    </div>
    <div className = "d4">

    </div>
    <div className = "d5">

    </div>
    <div className = "d6">

    </div>


    <div className = "e1">

    </div>
    <div className = "e2">

    </div>
    <div className = "e3">

    </div>
    <div className = "e4">

    </div>
    <div className = "e5">

    </div>
    <div className = "e6">
      
    </div>
    
  </div>

  <script src = "scripts.js"></script>

</div>


  );
}

export default TimeTable;
